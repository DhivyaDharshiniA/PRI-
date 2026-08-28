////////package com.example.demo.Service;
////////
////////import com.example.demo.dto.external.ExternalProfileRequest;
////////import com.example.demo.dto.external.ExternalProfileResponse;
////////import com.example.demo.dto.external.GithubResponse;
////////import com.example.demo.dto.external.LeetcodeResponse;
////////import com.example.demo.entity.StudentProfile;
////////import com.example.demo.repository.StudentProfileRepository;
////////import org.springframework.stereotype.Service;
////////import org.springframework.web.client.RestTemplate;
////////
////////import java.util.Optional;
////////
////////@Service
////////public class StudentExternalProfileService {
////////
////////    private final StudentProfileRepository profileRepository;
////////
////////    private final RestTemplate restTemplate;
////////
////////    public StudentExternalProfileService(
////////            StudentProfileRepository profileRepository
////////    ) {
////////        this.profileRepository = profileRepository;
////////        this.restTemplate = new RestTemplate();
////////    }
////////
////////    // =========================================================
////////    // GET SAVED PROFILE
////////    // =========================================================
////////
////////    public ExternalProfileResponse getProfile(Long userId) {
////////
////////        StudentProfile profile =
////////                profileRepository.findByUserId(userId)
////////                        .orElseThrow(() ->
////////                                new RuntimeException(
////////                                        "Student profile not found"
////////                                )
////////                        );
////////
////////        return buildResponse(profile);
////////    }
////////
////////    // =========================================================
////////    // SAVE USERNAMES
////////    // =========================================================
////////
////////    public ExternalProfileResponse saveProfile(
////////            Long userId,
////////            ExternalProfileRequest request
////////    ) {
////////
////////        StudentProfile profile =
////////                profileRepository.findByUserId(userId)
////////                        .orElseThrow(() ->
////////                                new RuntimeException(
////////                                        "Student profile not found"
////////                                )
////////                        );
////////
////////        profile.setGithubUsername(
////////                clean(request.getGithubUsername())
////////        );
////////
////////        profile.setLeetcodeUsername(
////////                clean(request.getLeetcodeUsername())
////////        );
////////
////////        profileRepository.save(profile);
////////
////////        return buildResponse(profile);
////////    }
////////
////////    // =========================================================
////////    // REFRESH EXTERNAL DATA
////////    // =========================================================
////////
////////    public ExternalProfileResponse refreshProfile(Long userId) {
////////
////////        StudentProfile profile =
////////                profileRepository.findByUserId(userId)
////////                        .orElseThrow(() ->
////////                                new RuntimeException(
////////                                        "Student profile not found"
////////                                )
////////                        );
////////
////////        return buildResponse(profile);
////////    }
////////
////////    // =========================================================
////////    // BUILD RESPONSE
////////    // =========================================================
////////
////////    private ExternalProfileResponse buildResponse(
////////            StudentProfile profile
////////    ) {
////////
////////        GithubResponse github = null;
////////        LeetcodeResponse leetcode = null;
////////
////////        if (profile.getGithubUsername() != null &&
////////                !profile.getGithubUsername().isBlank()) {
////////
////////            github = getGithubData(
////////                    profile.getGithubUsername()
////////            );
////////        }
////////
////////        if (profile.getLeetcodeUsername() != null &&
////////                !profile.getLeetcodeUsername().isBlank()) {
////////
////////            leetcode = getLeetcodeData(
////////                    profile.getLeetcodeUsername()
////////            );
////////        }
////////
////////        return new ExternalProfileResponse(
////////                profile.getGithubUsername(),
////////                profile.getLeetcodeUsername(),
////////                github,
////////                leetcode
////////        );
////////    }
////////
////////    // =========================================================
////////    // GITHUB API
////////    // =========================================================
////////
////////    private GithubResponse getGithubData(
////////            String username
////////    ) {
////////
////////        try {
////////
////////            String url =
////////                    "https://api.github.com/users/" + username;
////////
////////            GithubApiResponse response =
////////                    restTemplate.getForObject(
////////                            url,
////////                            GithubApiResponse.class
////////                    );
////////
////////            if (response == null) {
////////                return null;
////////            }
////////
////////            int score = calculateGithubScore(
////////                    response.getPublic_repos(),
////////                    response.getFollowers()
////////            );
////////
////////            return new GithubResponse(
////////                    response.getLogin(),
////////                    response.getName(),
////////                    response.getPublic_repos(),
////////                    response.getFollowers(),
////////                    response.getFollowing(),
////////                    score
////////            );
////////
////////        } catch (Exception e) {
////////
////////            System.out.println(
////////                    "GitHub API error: " + e.getMessage()
////////            );
////////
////////            return null;
////////        }
////////    }
////////
////////    // =========================================================
////////    // LEETCODE
////////    // =========================================================
////////
////////    private LeetcodeResponse getLeetcodeData(
////////            String username
////////    ) {
////////
////////        /*
////////         * We don't directly depend on LeetCode's private API.
////////         *
////////         * For now this returns zero until you connect
////////         * a public LeetCode statistics provider.
////////         *
////////         * This keeps the application stable.
////////         */
////////
////////        return new LeetcodeResponse(
////////                username,
////////                0,
////////                0,
////////                0,
////////                0,
////////                0
////////        );
////////    }
////////
////////    // =========================================================
////////    // GITHUB SCORE
////////    // =========================================================
////////
////////    private int calculateGithubScore(
////////            int repositories,
////////            int followers
////////    ) {
////////
////////        int repoScore =
////////                Math.min(repositories * 2, 60);
////////
////////        int followerScore =
////////                Math.min(followers, 40);
////////
////////        return Math.min(
////////                repoScore + followerScore,
////////                100
////////        );
////////    }
////////
////////    private String clean(String value) {
////////
////////        if (value == null) {
////////            return null;
////////        }
////////
////////        value = value.trim();
////////
////////        return value.isEmpty()
////////                ? null
////////                : value;
////////    }
////////
////////    // =========================================================
////////    // GITHUB API RESPONSE
////////    // =========================================================
////////
////////    private static class GithubApiResponse {
////////
////////        private String login;
////////        private String name;
////////        private int public_repos;
////////        private int followers;
////////        private int following;
////////
////////        public String getLogin() {
////////            return login;
////////        }
////////
////////        public void setLogin(String login) {
////////            this.login = login;
////////        }
////////
////////        public String getName() {
////////            return name;
////////        }
////////
////////        public void setName(String name) {
////////            this.name = name;
////////        }
////////
////////        public int getPublic_repos() {
////////            return public_repos;
////////        }
////////
////////        public void setPublic_repos(int public_repos) {
////////            this.public_repos = public_repos;
////////        }
////////
////////        public int getFollowers() {
////////            return followers;
////////        }
////////
////////        public void setFollowers(int followers) {
////////            this.followers = followers;
////////        }
////////
////////        public int getFollowing() {
////////            return following;
////////        }
////////
////////        public void setFollowing(int following) {
////////            this.following = following;
////////        }
////////    }
////////}
//////
//////package com.example.demo.Service;
//////
//////import com.example.demo.dto.external.ExternalProfileRequest;
//////import com.example.demo.dto.external.ExternalProfileResponse;
//////import com.example.demo.dto.external.GithubResponse;
//////import com.example.demo.dto.external.LeetcodeResponse;
//////import com.example.demo.entity.StudentProfile;
//////import com.example.demo.repository.StudentProfileRepository;
//////import org.springframework.stereotype.Service;
//////import org.springframework.web.client.RestTemplate;
//////
//////import java.util.Optional;
//////
//////@Service
//////public class StudentExternalProfileService {
//////
//////    private final StudentProfileRepository profileRepository;
//////    private final RestTemplate restTemplate;
//////
//////    public StudentExternalProfileService(
//////            StudentProfileRepository profileRepository
//////    ) {
//////        this.profileRepository = profileRepository;
//////        this.restTemplate = new RestTemplate();
//////    }
//////
//////    // =========================================================
//////    // GET SAVED PROFILE
//////    // =========================================================
//////
//////    public ExternalProfileResponse getProfile(Long userId) {
//////
//////        Optional<StudentProfile> optionalProfile =
//////                profileRepository.findByUserId(userId);
//////
//////        /*
//////         * The student may already exist but may not have
//////         * entered GitHub/LeetCode details yet.
//////         *
//////         * Do NOT throw 500 in that situation.
//////         */
//////        if (optionalProfile.isEmpty()) {
//////            return emptyResponse();
//////        }
//////
//////        return buildResponse(optionalProfile.get());
//////    }
//////
//////    // =========================================================
//////    // SAVE USERNAMES
//////    // =========================================================
//////
//////    public ExternalProfileResponse saveProfile(
//////            Long userId,
//////            ExternalProfileRequest request
//////    ) {
//////
//////        StudentProfile profile =
//////                profileRepository.findByUserId(userId)
//////                        .orElseThrow(() ->
//////                                new RuntimeException(
//////                                        "Student profile not found for userId: "
//////                                                + userId
//////                                )
//////                        );
//////
//////        profile.setGithubUsername(
//////                clean(request.getGithubUsername())
//////        );
//////
//////        profile.setLeetcodeUsername(
//////                clean(request.getLeetcodeUsername())
//////        );
//////
//////        StudentProfile saved =
//////                profileRepository.save(profile);
//////
//////        return buildResponse(saved);
//////    }
//////
//////    // =========================================================
//////    // REFRESH EXTERNAL DATA
//////    // =========================================================
//////
//////    public ExternalProfileResponse refreshProfile(Long userId) {
//////
//////        Optional<StudentProfile> optionalProfile =
//////                profileRepository.findByUserId(userId);
//////
//////        if (optionalProfile.isEmpty()) {
//////            return emptyResponse();
//////        }
//////
//////        return buildResponse(optionalProfile.get());
//////    }
//////
//////    // =========================================================
//////    // EMPTY RESPONSE
//////    // =========================================================
//////
//////    private ExternalProfileResponse emptyResponse() {
//////
//////        return new ExternalProfileResponse(
//////                "",
//////                "",
//////                null,
//////                null
//////        );
//////    }
//////
//////    // =========================================================
//////    // BUILD RESPONSE
//////    // =========================================================
//////
//////    private ExternalProfileResponse buildResponse(
//////            StudentProfile profile
//////    ) {
//////
//////        GithubResponse github = null;
//////        LeetcodeResponse leetcode = null;
//////
//////        // -----------------------------------------------------
//////        // GITHUB
//////        // -----------------------------------------------------
//////
//////        if (profile.getGithubUsername() != null &&
//////                !profile.getGithubUsername().isBlank()) {
//////
//////            github = getGithubData(
//////                    profile.getGithubUsername()
//////            );
//////        }
//////
//////        // -----------------------------------------------------
//////        // LEETCODE
//////        // -----------------------------------------------------
//////
//////        if (profile.getLeetcodeUsername() != null &&
//////                !profile.getLeetcodeUsername().isBlank()) {
//////
//////            leetcode = getLeetcodeData(
//////                    profile.getLeetcodeUsername()
//////            );
//////        }
//////
//////        return new ExternalProfileResponse(
//////                profile.getGithubUsername(),
//////                profile.getLeetcodeUsername(),
//////                github,
//////                leetcode
//////        );
//////    }
//////
//////    // =========================================================
//////    // GITHUB API
//////    // =========================================================
//////
//////    private GithubResponse getGithubData(
//////            String username
//////    ) {
//////
//////        try {
//////
//////            String url =
//////                    "https://api.github.com/users/" + username;
//////
//////            GithubApiResponse response =
//////                    restTemplate.getForObject(
//////                            url,
//////                            GithubApiResponse.class
//////                    );
//////
//////            if (response == null) {
//////                return null;
//////            }
//////
//////            int score = calculateGithubScore(
//////                    response.getPublic_repos(),
//////                    response.getFollowers()
//////            );
//////
//////            return new GithubResponse(
//////                    response.getLogin(),
//////                    response.getName(),
//////                    response.getPublic_repos(),
//////                    response.getFollowers(),
//////                    response.getFollowing(),
//////                    score
//////            );
//////
//////        } catch (Exception e) {
//////
//////            System.out.println(
//////                    "GitHub API error for " +
//////                            username +
//////                            ": " +
//////                            e.getMessage()
//////            );
//////
//////            return null;
//////        }
//////    }
//////
//////    // =========================================================
//////    // LEETCODE
//////    // =========================================================
//////
//////    private LeetcodeResponse getLeetcodeData(
//////            String username
//////    ) {
//////
//////        /*
//////         * Currently returning zero values.
//////         *
//////         * Later you can connect a public LeetCode
//////         * statistics provider.
//////         */
//////
//////        return new LeetcodeResponse(
//////                username,
//////                0,
//////                0,
//////                0,
//////                0,
//////                0
//////        );
//////    }
//////
//////    // =========================================================
//////    // GITHUB SCORE
//////    // =========================================================
//////
//////    private int calculateGithubScore(
//////            int repositories,
//////            int followers
//////    ) {
//////
//////        int repoScore =
//////                Math.min(repositories * 2, 60);
//////
//////        int followerScore =
//////                Math.min(followers, 40);
//////
//////        return Math.min(
//////                repoScore + followerScore,
//////                100
//////        );
//////    }
//////
//////    // =========================================================
//////    // CLEAN USERNAME
//////    // =========================================================
//////
//////    private String clean(String value) {
//////
//////        if (value == null) {
//////            return null;
//////        }
//////
//////        value = value.trim();
//////
//////        return value.isEmpty()
//////                ? null
//////                : value;
//////    }
//////
//////    // =========================================================
//////    // GITHUB API RESPONSE
//////    // =========================================================
//////
//////    private static class GithubApiResponse {
//////
//////        private String login;
//////        private String name;
//////        private int public_repos;
//////        private int followers;
//////        private int following;
//////
//////        public String getLogin() {
//////            return login;
//////        }
//////
//////        public void setLogin(String login) {
//////            this.login = login;
//////        }
//////
//////        public String getName() {
//////            return name;
//////        }
//////
//////        public void setName(String name) {
//////            this.name = name;
//////        }
//////
//////        public int getPublic_repos() {
//////            return public_repos;
//////        }
//////
//////        public void setPublic_repos(int public_repos) {
//////            this.public_repos = public_repos;
//////        }
//////
//////        public int getFollowers() {
//////            return followers;
//////        }
//////
//////        public void setFollowers(int followers) {
//////            this.followers = followers;
//////        }
//////
//////        public int getFollowing() {
//////            return following;
//////        }
//////
//////        public void setFollowing(int following) {
//////            this.following = following;
//////        }
//////    }
//////}
////
////package com.example.demo.Service;
////
////import com.example.demo.dto.external.ExternalProfileRequest;
////import com.example.demo.dto.external.ExternalProfileResponse;
////import com.example.demo.dto.external.GithubResponse;
////import com.example.demo.dto.external.LeetcodeResponse;
////import com.example.demo.entity.StudentProfile;
////import com.example.demo.repository.StudentProfileRepository;
////import org.springframework.stereotype.Service;
////import org.springframework.web.client.RestTemplate;
////
////@Service
////public class StudentExternalProfileService {
////
////    private final StudentProfileRepository profileRepository;
////
////    private final RestTemplate restTemplate;
////
////    public StudentExternalProfileService(
////            StudentProfileRepository profileRepository
////    ) {
////        this.profileRepository = profileRepository;
////        this.restTemplate = new RestTemplate();
////    }
////
////    // =========================================================
////    // GET PROFILE
////    // =========================================================
////
////    public ExternalProfileResponse getProfile(Long userId) {
////
////        StudentProfile profile =
////                profileRepository.findByUserId(userId)
////                        .orElseThrow(() ->
////                                new RuntimeException(
////                                        "Student profile not found for user ID: "
////                                                + userId
////                                )
////                        );
////
////        return buildResponse(profile);
////    }
////
////    // =========================================================
////    // SAVE PROFILE
////    // =========================================================
////
////    public ExternalProfileResponse saveProfile(
////            Long userId,
////            ExternalProfileRequest request
////    ) {
////
////        StudentProfile profile =
////                profileRepository.findByUserId(userId)
////                        .orElseThrow(() ->
////                                new RuntimeException(
////                                        "Student profile not found for user ID: "
////                                                + userId
////                                )
////                        );
////
////        profile.setGithubUsername(
////                clean(request.getGithubUsername())
////        );
////
////        profile.setLeetcodeUsername(
////                clean(request.getLeetcodeUsername())
////        );
////
////        profile = profileRepository.save(profile);
////
////        return buildResponse(profile);
////    }
////
////    // =========================================================
////    // REFRESH
////    // =========================================================
////
////    public ExternalProfileResponse refreshProfile(
////            Long userId
////    ) {
////
////        StudentProfile profile =
////                profileRepository.findByUserId(userId)
////                        .orElseThrow(() ->
////                                new RuntimeException(
////                                        "Student profile not found for user ID: "
////                                                + userId
////                                )
////                        );
////
////        return buildResponse(profile);
////    }
////
////    // =========================================================
////    // BUILD RESPONSE
////    // =========================================================
////
////    private ExternalProfileResponse buildResponse(
////            StudentProfile profile
////    ) {
////
////        GithubResponse github = null;
////        LeetcodeResponse leetcode = null;
////
////        if (profile.getGithubUsername() != null &&
////                !profile.getGithubUsername().isBlank()) {
////
////            github = getGithubData(
////                    profile.getGithubUsername()
////            );
////        }
////
////        if (profile.getLeetcodeUsername() != null &&
////                !profile.getLeetcodeUsername().isBlank()) {
////
////            leetcode = getLeetcodeData(
////                    profile.getLeetcodeUsername()
////            );
////        }
////
////        return new ExternalProfileResponse(
////                profile.getGithubUsername(),
////                profile.getLeetcodeUsername(),
////                github,
////                leetcode
////        );
////    }
////
////    // =========================================================
////    // GITHUB API
////    // =========================================================
////
////    private GithubResponse getGithubData(
////            String username
////    ) {
////
////        try {
////
////            String url =
////                    "https://api.github.com/users/"
////                            + username;
////
////            GithubApiResponse response =
////                    restTemplate.getForObject(
////                            url,
////                            GithubApiResponse.class
////                    );
////
////            if (response == null) {
////                return null;
////            }
////
////            int score =
////                    calculateGithubScore(
////                            response.getPublic_repos(),
////                            response.getFollowers()
////                    );
////
////            return new GithubResponse(
////                    response.getLogin(),
////                    response.getName(),
////                    response.getPublic_repos(),
////                    response.getFollowers(),
////                    response.getFollowing(),
////                    score
////            );
////
////        } catch (Exception e) {
////
////            System.out.println(
////                    "GitHub API error: "
////                            + e.getMessage()
////            );
////
////            return null;
////        }
////    }
////
////    // =========================================================
////    // LEETCODE
////    // =========================================================
////
////    private LeetcodeResponse getLeetcodeData(
////            String username
////    ) {
////
////        // Temporary until a LeetCode statistics provider
////        // is connected.
////
////        return new LeetcodeResponse(
////                username,
////                0,
////                0,
////                0,
////                0,
////                0
////        );
////    }
////
////    // =========================================================
////    // GITHUB SCORE
////    // =========================================================
////
////    private int calculateGithubScore(
////            int repositories,
////            int followers
////    ) {
////
////        int repoScore =
////                Math.min(
////                        repositories * 2,
////                        60
////                );
////
////        int followerScore =
////                Math.min(
////                        followers,
////                        40
////                );
////
////        return Math.min(
////                repoScore + followerScore,
////                100
////        );
////    }
////
////    // =========================================================
////    // CLEAN
////    // =========================================================
////
////    private String clean(String value) {
////
////        if (value == null) {
////            return null;
////        }
////
////        value = value.trim();
////
////        return value.isEmpty()
////                ? null
////                : value;
////    }
////
////    // =========================================================
////    // GITHUB RESPONSE
////    // =========================================================
////
////    private static class GithubApiResponse {
////
////        private String login;
////        private String name;
////        private int public_repos;
////        private int followers;
////        private int following;
////
////        public String getLogin() {
////            return login;
////        }
////
////        public void setLogin(String login) {
////            this.login = login;
////        }
////
////        public String getName() {
////            return name;
////        }
////
////        public void setName(String name) {
////            this.name = name;
////        }
////
////        public int getPublic_repos() {
////            return public_repos;
////        }
////
////        public void setPublic_repos(
////                int public_repos
////        ) {
////            this.public_repos = public_repos;
////        }
////
////        public int getFollowers() {
////            return followers;
////        }
////
////        public void setFollowers(
////                int followers
////        ) {
////            this.followers = followers;
////        }
////
////        public int getFollowing() {
////            return following;
////        }
////
////        public void setFollowing(
////                int following
////        ) {
////            this.following = following;
////        }
////    }
////}
//
//package com.example.demo.Service;
//
//import com.example.demo.entity.StudentProfile;
//import com.example.demo.entity.User;
//import com.example.demo.repository.StudentProfileRepository;
//import com.example.demo.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class StudentExternalProfileService {
//
//    private final StudentProfileRepository studentProfileRepository;
//    private final UserRepository userRepository;
//
//    public StudentProfile getProfile(Long userId) {
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() ->
//                        new RuntimeException(
//                                "User not found: " + userId
//                        )
//                );
//
//        return studentProfileRepository
//                .findByUserId(userId)
//                .orElseGet(() -> {
//
//                    StudentProfile profile =
//                            new StudentProfile();
//
//                    profile.setUser(user);
//
//                    profile.setFirstName("");
//                    profile.setLastName("");
//                    profile.setEmail(user.getEmail());
//                    profile.setPhone(user.getPhoneNumber());
//
//                    profile.setDepartment("");
//                    profile.setBranch("");
//                    profile.setYear(null);
//
//                    profile.setGithubUsername("");
//                    profile.setLeetcodeUsername("");
//
//                    return studentProfileRepository.save(profile);
//                });
//    }
//
//    public StudentProfile saveExternalProfiles(
//            Long userId,
//            String githubUsername,
//            String leetcodeUsername
//    ) {
//
//        StudentProfile profile =
//                getProfile(userId);
//
//        profile.setGithubUsername(
//                githubUsername
//        );
//
//        profile.setLeetcodeUsername(
//                leetcodeUsername
//        );
//
//        return studentProfileRepository.save(profile);
//    }
//}

package com.example.demo.Service;

import com.example.demo.dto.external.ExternalProfileResponse;
import com.example.demo.entity.StudentProfile;
import com.example.demo.repository.StudentProfileRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentExternalProfileService {

    private final StudentProfileRepository studentProfileRepository;

    private final GithubService githubService;

    private final LeetcodeService leetcodeService;


    // ============================================================
    // GET PROFILE
    // ============================================================

    public StudentProfile getProfile(Long userId) {

        return studentProfileRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student profile not found for userId: "
                                        + userId
                        )
                );
    }


    // ============================================================
    // SAVE USERNAMES
    // ============================================================

    public StudentProfile saveExternalProfiles(
            Long userId,
            String githubUsername,
            String leetcodeUsername
    ) {

        StudentProfile profile =
                getProfile(userId);

        profile.setGithubUsername(
                clean(githubUsername)
        );

        profile.setLeetcodeUsername(
                clean(leetcodeUsername)
        );

        return studentProfileRepository.save(profile);
    }


    // ============================================================
    // BUILD RESPONSE
    // ============================================================

    public ExternalProfileResponse buildExternalProfileResponse(
            StudentProfile profile
    ) {

        String githubUsername =
                profile.getGithubUsername();

        String leetcodeUsername =
                profile.getLeetcodeUsername();


        /*
         * Do not call external APIs if username
         * does not exist.
         */

        var github = githubUsername != null
                && !githubUsername.isBlank()
                ? githubService.getProfile(githubUsername)
                : null;


        var leetcode = leetcodeUsername != null
                && !leetcodeUsername.isBlank()
                ? leetcodeService.getProfile(leetcodeUsername)
                : null;


        return new ExternalProfileResponse(
                githubUsername,
                leetcodeUsername,
                github,
                leetcode
        );
    }


    // ============================================================
    // REFRESH
    // ============================================================

    public ExternalProfileResponse refreshProfile(
            Long userId
    ) {

        StudentProfile profile =
                getProfile(userId);

        return buildExternalProfileResponse(profile);
    }


    // ============================================================
    // CLEAN
    // ============================================================

    private String clean(String value) {

        if (value == null) {
            return null;
        }

        value = value.trim();

        return value.isEmpty()
                ? null
                : value;
    }
}