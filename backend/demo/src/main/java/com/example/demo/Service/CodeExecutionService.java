package com.example.demo.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Compiles and runs student code via the free, public Piston API
 * (https://github.com/engineer-man/piston, no API key required). Every
 * question is language-agnostic: the student's program reads a test case
 * from stdin and must print the answer to stdout, so the exact same
 * mechanism works for Python, Java, C, C++ and JavaScript.
 */
@Slf4j
@Service
public class CodeExecutionService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${coding.execution.base-url:https://emkc.org/api/v2/piston}")
    private String baseUrl;

    @Value("${coding.execution.timeout-ms:15000}")
    private long timeoutMs;

    @Value("${coding.execution.compile-timeout-ms:10000}")
    private int compileTimeoutMs;

    @Value("${coding.execution.run-timeout-ms:3000}")
    private int runTimeoutMs;

    // language key (sent by the frontend) -> [piston language id, fallback version]
    // The fallback is only used if the configured Piston instance's /runtimes
    // list can't be fetched -- normally the actual installed version (which
    // varies between the public instance and any self-hosted one) is used instead.
    private static final Map<String, String[]> LANGUAGE_MAP = new HashMap<>();
    static {
        LANGUAGE_MAP.put("python", new String[]{"python", "3.10.0"});
        LANGUAGE_MAP.put("java", new String[]{"java", "15.0.2"});
        LANGUAGE_MAP.put("javascript", new String[]{"javascript", "18.15.0"});
        LANGUAGE_MAP.put("c", new String[]{"c", "10.2.0"});
        LANGUAGE_MAP.put("cpp", new String[]{"cpp", "10.2.0"});
    }

    // Extra names/aliases a Piston runtime entry might use for each of our language keys
    // (self-hosted instances sometimes register "node" instead of "javascript", etc).
    private static final Map<String, List<String>> LANGUAGE_ALIASES = Map.of(
            "python", List.of("python", "python3", "py"),
            "java", List.of("java"),
            "javascript", List.of("javascript", "node", "js", "nodejs"),
            "c", List.of("c"),
            "cpp", List.of("cpp", "c++", "g++")
    );

    private volatile Map<String, String> resolvedVersions = null;
    private volatile long resolvedVersionsFetchedAt = 0;
    private static final long RUNTIME_CACHE_TTL_MS = 60_000;

    // Piston needs a filename per language so it can name the source file correctly.
    private static final Map<String, String> FILE_NAME_MAP = Map.of(
            "python", "main.py",
            "java", "Main.java",
            "javascript", "main.js",
            "c", "main.c",
            "cpp", "main.cpp"
    );

    public CodeExecutionService(WebClient webClient) {
        this.webClient = webClient;
    }

    public static boolean isSupported(String language) {
        return language != null && LANGUAGE_MAP.containsKey(language.toLowerCase());
    }

    public static List<String> supportedLanguages() {
        return List.copyOf(LANGUAGE_MAP.keySet());
    }

    /** Fetches {baseUrl}/runtimes and picks the installed version for each of our
     * languages. Cached for RUNTIME_CACHE_TTL_MS so a normal test session doesn't
     * refetch this on every single Run/Submit click. */
    private Map<String, String> resolveInstalledVersions() {
        Map<String, String> cached = resolvedVersions;
        if (cached != null && System.currentTimeMillis() - resolvedVersionsFetchedAt < RUNTIME_CACHE_TTL_MS) {
            return cached;
        }
        try {
            String body = webClient.get()
                    .uri(baseUrl + "/runtimes")
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofMillis(timeoutMs))
                    .block();
            JsonNode arr = objectMapper.readTree(body);
            Map<String, String> resolved = new HashMap<>();
            for (Map.Entry<String, List<String>> entry : LANGUAGE_ALIASES.entrySet()) {
                String ourKey = entry.getKey();
                for (JsonNode runtime : arr) {
                    String rtLang = runtime.path("language").asText("");
                    boolean matches = entry.getValue().contains(rtLang.toLowerCase());
                    if (!matches) {
                        for (JsonNode alias : runtime.path("aliases")) {
                            if (entry.getValue().contains(alias.asText("").toLowerCase())) {
                                matches = true;
                                break;
                            }
                        }
                    }
                    if (matches) {
                        resolved.put(ourKey, runtime.path("version").asText(""));
                        // keep scanning -- later entries in the list tend to be newer installs
                    }
                }
            }
            resolvedVersions = resolved;
            resolvedVersionsFetchedAt = System.currentTimeMillis();
            if (resolved.isEmpty()) {
                log.warn("Connected to {} but no matching language runtimes were found there. " +
                        "Falling back to hardcoded versions, which will likely fail. If this is a " +
                        "self-hosted instance, install runtimes with the Piston CLI (cli/index.js ppman install <language>).", baseUrl);
            }
            return resolved;
        } catch (Exception e) {
            log.warn("Could not fetch {}/runtimes ({}); falling back to hardcoded language versions.",
                    baseUrl, rootCauseMessage(e));
            return Map.of();
        }
    }

    public ExecutionResult execute(String language, String code, String stdin) {
        String key = language == null ? "" : language.toLowerCase();
        String[] lang = LANGUAGE_MAP.get(key);
        if (lang == null) {
            return ExecutionResult.builder()

                    .success(false)
                    .stdout("")
                    .stderr("")
                    .errorMessage("Unsupported language: " + language)
                    .build();
        }

        Map<String, Object> file = Map.of(
                "name", FILE_NAME_MAP.getOrDefault(key, "main.txt"),
                "content", code == null ? "" : code
        );
        Map<String, Object> payload = new HashMap<>();
        payload.put("language", lang[0]);
        String resolvedVersion = resolveInstalledVersions().getOrDefault(key, lang[1]);
        payload.put("version", resolvedVersion);
        payload.put("files", List.of(file));
        payload.put("stdin", stdin == null ? "" : stdin);
        payload.put("compile_timeout", compileTimeoutMs);
        payload.put("run_timeout", runTimeoutMs);

        String body;
        try {
            body = webClient.post()
                    .uri(baseUrl + "/execute")
                    .bodyValue(payload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofMillis(timeoutMs))
                    .block();
        } catch (org.springframework.web.reactive.function.client.WebClientResponseException e) {
            // Piston returns a JSON body like {"message": "..."} on 4xx/5xx that names
            // the exact problem -- just surface it directly rather than guessing.
            String piston = e.getResponseBodyAsString();
            log.warn("Piston rejected the execute request for language={} version={}: {} {} -- {}",
                    lang[0], resolvedVersion, e.getStatusCode(), e.getStatusText(), piston);
            return ExecutionResult.builder()
                    .success(false)
                    .stdout("")
                    .stderr("")
                    .errorMessage("Code execution service rejected the request (" + e.getStatusCode() + "): "
                            + (piston == null || piston.isBlank() ? e.getStatusText() : piston))
                    .build();
        } catch (Exception e) {
            String detail = rootCauseMessage(e);
            log.warn("Piston execution failed: {}", detail, e);
            return ExecutionResult.builder()
                    .success(false)
                    .stdout("")
                    .stderr("")
                    .errorMessage("Could not reach the code execution service: " + detail
                            + ". Check that this backend server has outbound internet access to "
                            + baseUrl + " (no proxy/firewall blocking it), and check the backend "
                            + "console log for the full stack trace.")
                    .build();
        }

        if (body == null) {
            return ExecutionResult.builder()
                    .success(false)
                    .stdout("")
                    .stderr("")
                    .errorMessage("The code execution service returned an empty response. Please try again.")
                    .build();
        }

        try {

            JsonNode root = objectMapper.readTree(body);
            JsonNode compile = root.path("compile");
            JsonNode run = root.path("run");

            if (!compile.isMissingNode() && compile.path("code").asInt(0) != 0) {
                return ExecutionResult.builder()
                        .success(false)
                        .stdout("")
                        .stderr(compile.path("stderr").asText(""))
                        .errorMessage("Compilation failed")
                        .build();
            }

            String stdout = run.path("stdout").asText("");
            String stderr = run.path("stderr").asText("");
            int exitCode = run.path("code").asInt(0);

            return ExecutionResult.builder()
                    .success(exitCode == 0)
                    .stdout(stdout)
                    .stderr(stderr)
                    .errorMessage(exitCode == 0 ? null : (stderr.isBlank() ? "Runtime error" : null))
                    .build();
        } catch (Exception e) {
            log.error("Error parsing execution response", e);
            return ExecutionResult.builder()
                    .success(false)
                    .stdout("")
                    .stderr("")
                    .errorMessage("Internal error while running code: " + e.getMessage())
                    .build();
        }
    }

    /** Unwraps wrapped/reactive exceptions to find the actual underlying message
     * (e.g. "Connection refused", "nodename nor servname provided", a real
     * timeout, or an HTTP status from Piston like 429 Too Many Requests). */
    private static String rootCauseMessage(Throwable t) {
        Throwable cur = t;
        Throwable last = t;
        while (cur != null) {
            last = cur;
            cur = cur.getCause();
        }
        String msg = last.getMessage();
        if (msg == null || msg.isBlank()) {
            msg = last.getClass().getSimpleName();
        }
        return msg;
    }

    public static boolean outputsMatch(String expected, String actual) {
        if (expected == null) expected = "";
        if (actual == null) actual = "";
        return normalize(expected).equals(normalize(actual));
    }

    private static String normalize(String s) {
        return s.replace("\r\n", "\n").strip();
    }

    @lombok.Getter
    @lombok.Builder
    public static class ExecutionResult {
        private boolean success;
        private String stdout;
        private String stderr;
        private String errorMessage;
    }
}
