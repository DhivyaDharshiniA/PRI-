import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
  MessageCircle,
  Mic,
  MicOff,
  Play,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  AlertCircle,
  Trophy,
  Target,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

const API_BASE_URL = "http://localhost:8080";

const SECONDS_PER_QUESTION = 120;
const QUESTION_COUNT = 3;

const CATEGORIES = [
  "Workplace Communication",
  "Conflict Resolution",
  "Persuasive Speaking",
  "Active Listening & Empathy",
  "Public Speaking Clarity",
];

/* =========================================================
   FALLBACK QUESTIONS
   ========================================================= */

const FALLBACK_QUESTIONS = {
  "Workplace Communication": [
    {
      id: "workplace-1",
      category: "Workplace Communication",
      text: "Imagine you are working on an important team project and your teammate has missed an important deadline. How would you communicate with them professionally and help the team move forward?",
    },
    {
      id: "workplace-2",
      category: "Workplace Communication",
      text: "Your manager gives you instructions that are unclear to you. How would you communicate with your manager to make sure you understand the task correctly?",
    },
    {
      id: "workplace-3",
      category: "Workplace Communication",
      text: "Describe how you would communicate a technical problem to a non-technical colleague or customer.",
    },
  ],

  "Conflict Resolution": [
    {
      id: "conflict-1",
      category: "Conflict Resolution",
      text: "Two members of your team strongly disagree about how a project should be implemented. How would you handle the situation?",
    },
    {
      id: "conflict-2",
      category: "Conflict Resolution",
      text: "A teammate becomes upset after receiving critical feedback from you. How would you communicate with them and resolve the situation?",
    },
    {
      id: "conflict-3",
      category: "Conflict Resolution",
      text: "Describe a situation where you had to work with someone whose opinion was very different from yours. How would you approach the disagreement?",
    },
  ],

  "Persuasive Speaking": [
    {
      id: "persuasive-1",
      category: "Persuasive Speaking",
      text: "Your team is using an outdated development tool. How would you persuade your team members and manager to adopt a better alternative?",
    },
    {
      id: "persuasive-2",
      category: "Persuasive Speaking",
      text: "Imagine you have an idea that could improve productivity in your organization. How would you present your idea and convince others to support it?",
    },
    {
      id: "persuasive-3",
      category: "Persuasive Speaking",
      text: "How would you convince a customer to choose your proposed solution when they are considering a cheaper alternative?",
    },
  ],

  "Active Listening & Empathy": [
    {
      id: "empathy-1",
      category: "Active Listening & Empathy",
      text: "A colleague tells you that they are struggling with their workload. How would you respond to them?",
    },
    {
      id: "empathy-2",
      category: "Active Listening & Empathy",
      text: "A customer is frustrated because they believe their issue has not been understood. How would you communicate with them?",
    },
    {
      id: "empathy-3",
      category: "Active Listening & Empathy",
      text: "How would you show a teammate that you genuinely understand their concerns during a difficult conversation?",
    },
  ],

  "Public Speaking Clarity": [
    {
      id: "public-1",
      category: "Public Speaking Clarity",
      text: "Imagine you have to introduce yourself and your technical background to a group of interviewers. How would you present yourself clearly?",
    },
    {
      id: "public-2",
      category: "Public Speaking Clarity",
      text: "You have five minutes to explain a technical project to a general audience. How would you structure your explanation?",
    },
    {
      id: "public-3",
      category: "Public Speaking Clarity",
      text: "Describe how you would keep an audience engaged while giving a presentation about a topic you know well.",
    },
  ],
};

/* =========================================================
   HELPERS
   ========================================================= */

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

function zoneColorFor(score) {
  if (score >= 80) {
    return {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      ring: "ring-emerald-200",
    };
  }

  if (score >= 60) {
    return {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      ring: "ring-blue-200",
    };
  }

  if (score >= 40) {
    return {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      ring: "ring-amber-200",
    };
  }

  return {
    text: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    ring: "ring-red-200",
  };
}

function labelFor(score) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Developing";
  if (score >= 40) return "Needs Improvement";
  return "Needs Practice";
}

/* =========================================================
   BACKEND API
   ========================================================= */

async function generateQuestionsBackend(category, count = QUESTION_COUNT) {
  const response = await fetch(
    `${API_BASE_URL}/api/student/communication/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        count,
      }),
    }
  );

  if (!response.ok) {
    let message = "Unable to generate questions.";

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(message);
  }

  return response.json();
}

async function scoreAnswersBackend(studentId, category, answers) {
  const response = await fetch(
    `${API_BASE_URL}/api/student/communication/score`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: Number(studentId),
        category,
        answers,
      }),
    }
  );

  if (!response.ok) {
    let message = "Unable to score the communication assessment.";

    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      // Ignore JSON parsing error
    }

    throw new Error(message);
  }

  return response.json();
}

/* =========================================================
   SPEECH HOOK
   ========================================================= */

function useSpeech() {
  const recognitionRef = useRef(null);

  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];

        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }

      if (finalText) {
        setTranscript((previous) => {
          const trimmedPrevious = previous.trim();

          if (!trimmedPrevious) {
            return finalText.trim();
          }

          return `${trimmedPrevious} ${finalText.trim()}`;
        });
      }

      setInterimTranscript(interimText);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // Ignore stop error
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.start();
    } catch {
      // Browser may throw if recognition is already running.
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
    } catch {
      // Ignore stop error
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  return {
    supported,
    listening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  };
}

/* =========================================================
   RADIAL TIMER
   ========================================================= */

function RadialTimer({ secondsLeft, totalSeconds }) {
  const percentage = Math.max(
    0,
    Math.min(100, (secondsLeft / totalSeconds) * 100)
  );

  const radius = 48;
  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference - (percentage / 100) * circumference;

  const isLow = secondsLeft <= 30;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        className="-rotate-90"
      >
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-slate-100"
        />

        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          className={isLow ? "text-red-500" : "text-blue-600"}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      <div className="absolute text-center">
        <div
          className={`font-mono text-2xl font-bold ${
            isLow ? "text-red-600" : "text-slate-900"
          }`}
        >
          {formatTime(secondsLeft)}
        </div>

        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          remaining
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SCORE GAUGE
   ========================================================= */

function CommScoreGauge({ score }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  const radius = 76;
  const circumference = Math.PI * radius;

  const dashOffset =
    circumference - (safeScore / 100) * circumference;

  const colors = zoneColorFor(safeScore);

  return (
    <div className="relative mx-auto h-40 w-72">
      <svg
        width="288"
        height="160"
        viewBox="0 0 288 160"
        className="overflow-visible"
      >
        <path
          d="M 40 140 A 104 104 0 0 1 248 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
          className="text-slate-100"
        />

        <path
          d="M 40 140 A 104 104 0 0 1 248 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="18"
          strokeLinecap="round"
          className={colors.text}
          strokeDasharray="326"
          strokeDashoffset={326 - (safeScore / 100) * 326}
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 text-center">
        <div className={`text-5xl font-black ${colors.text}`}>
          {Math.round(safeScore)}
        </div>

        <div className="mt-1 text-sm font-semibold text-slate-500">
          {labelFor(safeScore)}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PROGRESS RAIL
   ========================================================= */

function ProgressRail({
  questions,
  currentIndex,
  completedAnswers,
}) {
  return (
    <div className="flex items-center gap-2">
      {questions.map((question, index) => {
        const completed = completedAnswers[index];

        const isCurrent = currentIndex === index;

        return (
          <React.Fragment key={question.id || index}>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition ${
                completed
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : isCurrent
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {completed ? (
                <CheckCircle2 size={17} />
              ) : (
                index + 1
              )}
            </div>

            {index < questions.length - 1 && (
              <div
                className={`h-0.5 w-10 ${
                  completed
                    ? "bg-emerald-400"
                    : "bg-slate-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* =========================================================
   SETUP PANEL
   ========================================================= */

function SetupPanel({
  category,
  setCategory,
  onStart,
  loading,
  error,
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-8 py-10">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-100">
            <MessageCircle size={28} />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Communication Assessment
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Test your spoken communication through realistic workplace
            scenarios. Your responses will be evaluated for clarity,
            structure, relevance, confidence, empathy, and persuasiveness.
          </p>
        </div>

        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Assessment Category
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <MessageCircle size={16} />
                  <span className="text-xs font-bold uppercase">
                    Questions
                  </span>
                </div>

                <div className="mt-2 text-2xl font-black text-slate-900">
                  {QUESTION_COUNT}
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock3 size={16} />
                  <span className="text-xs font-bold uppercase">
                    Per Question
                  </span>
                </div>

                <div className="mt-2 text-2xl font-black text-slate-900">
                  2 min
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-100 p-4">
              <Mic size={18} className="text-blue-600" />

              <div className="mt-2 text-sm font-bold text-slate-800">
                Speak Naturally
              </div>

              <div className="mt-1 text-xs leading-5 text-slate-500">
                Answer using your microphone.
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 p-4">
              <Sparkles size={18} className="text-indigo-600" />

              <div className="mt-2 text-sm font-bold text-slate-800">
                AI Evaluation
              </div>

              <div className="mt-1 text-xs leading-5 text-slate-500">
                Your responses are evaluated automatically.
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 p-4">
              <Target size={18} className="text-emerald-600" />

              <div className="mt-2 text-sm font-bold text-slate-800">
                Improve
              </div>

              <div className="mt-1 text-xs leading-5 text-slate-500">
                Get feedback after completing the test.
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />

              <div>
                <div className="font-bold">
                  Unable to start normally
                </div>

                <div className="mt-1">{error}</div>

                <div className="mt-2 text-xs text-red-600">
                  Fallback questions can still be used.
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onStart}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Preparing Assessment...
              </>
            ) : (
              <>
                <Play size={18} />
                Start Communication Assessment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   LOADING PANEL
   ========================================================= */

function LoadingPanel() {
  return (
    <div className="flex min-h-[520px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Loader2 size={30} className="animate-spin" />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-900">
          Preparing your questions
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Please wait while your assessment is being prepared.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   ACTIVE QUESTION PANEL
   ========================================================= */

function ActiveQuestionPanel({
  question,
  questionIndex,
  totalQuestions,
  secondsLeft,
  transcript,
  interimTranscript,
  listening,
  speechSupported,
  onStartListening,
  onStopListening,
  onNext,
  onRepeatQuestion,
  onBack,
}) {
  const combinedTranscript = `${transcript} ${interimTranscript}`.trim();

  const canContinue = combinedTranscript.length > 0;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Communication Assessment
          </div>

          <h1 className="text-2xl font-black text-slate-900">
            Question {questionIndex + 1} of {totalQuestions}
          </h1>
        </div>

        <ProgressRail
          questions={Array.from({ length: totalQuestions }).map(
            (_, index) => ({
              id: `question-${index}`,
            })
          )}
          currentIndex={questionIndex}
          completedAnswers={Array.from({
            length: totalQuestions,
          }).map((_, index) => index < questionIndex)}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                {question.category}
              </div>

              <button
                type="button"
                onClick={onRepeatQuestion}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Volume2 size={15} />
                Repeat Question
              </button>
            </div>
          </div>

          <div className="px-6 py-8 md:px-8">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Your Prompt
            </div>

            <h2 className="mt-3 text-2xl font-black leading-relaxed text-slate-900">
              {question.text}
            </h2>

            <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      listening
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {listening ? (
                      <Mic size={18} />
                    ) : (
                      <MicOff size={18} />
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-800">
                      {listening
                        ? "Listening..."
                        : "Your response"}
                    </div>

                    <div className="text-xs text-slate-500">
                      {speechSupported
                        ? "Speak clearly in English."
                        : "Speech recognition is not supported in this browser."}
                    </div>
                  </div>
                </div>

                {listening && (
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                    <span className="text-xs font-bold text-red-600">
                      Recording
                    </span>
                  </div>
                )}
              </div>

              <div className="min-h-[180px] rounded-xl border border-slate-200 bg-white p-4">
                {combinedTranscript ? (
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {combinedTranscript}
                  </p>
                ) : (
                  <div className="flex h-full min-h-[150px] items-center justify-center text-center">
                    <div>
                      <Mic
                        size={28}
                        className="mx-auto text-slate-300"
                      />

                      <p className="mt-3 text-sm font-semibold text-slate-400">
                        Your speech transcript will appear here.
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Click the microphone and start speaking.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {interimTranscript && (
                <div className="mt-2 text-xs italic text-slate-400">
                  Listening: {interimTranscript}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {!listening ? (
                <button
                  type="button"
                  onClick={onStartListening}
                  disabled={!speechSupported}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Mic size={18} />
                  Start Speaking
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onStopListening}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  <MicOff size={18} />
                  Stop Recording
                </button>
              )}

              <button
                type="button"
                onClick={onNext}
                disabled={!canContinue}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {questionIndex === totalQuestions - 1
                  ? "Finish Assessment"
                  : "Next Question"}

                <ArrowRight size={18} />
              </button>
            </div>

            {questionIndex > 0 && (
              <button
                type="button"
                onClick={onBack}
                className="mx-auto mt-4 flex items-center gap-2 text-xs font-bold text-slate-400 transition hover:text-slate-700"
              >
                <ArrowLeft size={14} />
                Back to previous question
              </button>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Time Remaining
              </div>

              <RadialTimer
                secondsLeft={secondsLeft}
                totalSeconds={SECONDS_PER_QUESTION}
              />
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500">
              <strong className="text-slate-700">
                Tip:
              </strong>{" "}
              Structure your response with a clear beginning,
              explanation, example, and conclusion.
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-center gap-2 text-blue-700">
              <Sparkles size={18} />

              <span className="text-sm font-bold">
                Communication Tips
              </span>
            </div>

            <ul className="mt-4 space-y-3 text-xs leading-5 text-blue-900/70">
              <li>• Speak at a comfortable pace.</li>
              <li>• Keep your response relevant.</li>
              <li>• Give practical examples.</li>
              <li>• Avoid unnecessary repetition.</li>
              <li>• Explain your thoughts clearly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SCORING PANEL
   ========================================================= */

function ScoringPanel() {
  return (
    <div className="flex min-h-[520px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Sparkles size={30} className="animate-pulse" />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-900">
          Evaluating your responses
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Your answers are being evaluated for communication
          clarity, relevance, structure, confidence, and
          effectiveness.
        </p>

        <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
          <Loader2 size={15} className="animate-spin" />
          Please wait...
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY PANEL
   ========================================================= */

function SummaryPanel({
  result,
  category,
  onRestart,
  onDashboard,
}) {
  const score = Number(result?.overallScore || 0);

  const colors = zoneColorFor(score);

  const questionScores =
    result?.perQuestion ||
    result?.questionScores ||
    result?.answers ||
    [];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-blue-50 px-8 py-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                <CheckCircle2 size={18} />
                Assessment Completed
              </div>

              <h1 className="mt-2 text-3xl font-black text-slate-900">
                Communication Results
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {category}
              </p>
            </div>

            <div
              className={`rounded-full border px-4 py-2 text-sm font-black ${colors.bg} ${colors.border} ${colors.text}`}
            >
              {labelFor(score)}
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-[320px_1fr]">
          <div>
            <CommScoreGauge score={score} />

            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Overall Communication Score
              </div>

              <div className="mt-2 text-sm font-semibold text-slate-600">
                {score}/100
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-amber-500" />

                <h2 className="text-lg font-black text-slate-900">
                  Overall Feedback
                </h2>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {result?.overallSummary ||
                  "Your communication assessment has been completed successfully."}
              </p>
            </div>

            {questionScores.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-black text-slate-900">
                  Question-wise Feedback
                </h2>

                <div className="mt-4 space-y-3">
                  {questionScores.map((item, index) => {
                    const itemScore = Number(
                      item.score || item.questionScore || 0
                    );

                    const itemColors = zoneColorFor(itemScore);

                    return (
                      <div
                        key={item.questionId || index}
                        className="rounded-2xl border border-slate-100 bg-white p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              Question {index + 1}
                            </div>

                            <div className="mt-1 text-sm font-bold text-slate-800">
                              {item.questionText ||
                                item.text ||
                                "Communication response"}
                            </div>
                          </div>

                          <div
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${itemColors.bg} ${itemColors.text}`}
                          >
                            {itemScore}/100
                          </div>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                          {item.feedback ||
                            item.comment ||
                            "Keep working on clarity and structured communication."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <RotateCcw size={17} />
            Take Again
          </button>

          <button
            type="button"
            onClick={onDashboard}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Go to Dashboard
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function CommunicationAssessment() {
  const navigate = useNavigate();

  const {
    supported: speechSupported,
    listening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeech();

  const [phase, setPhase] = useState("setup");

  const [category, setCategory] = useState(
    CATEGORIES[0]
  );

  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(
    SECONDS_PER_QUESTION
  );

  const [answers, setAnswers] = useState([]);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [questionStartedAt, setQuestionStartedAt] =
    useState(null);

  const timerRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  const studentId = localStorage.getItem("studentId");

  /* =======================================================
     STOP TIMER
     ======================================================= */

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /* =======================================================
     SPEAK QUESTION
     ======================================================= */

  const speakQuestion = useCallback((text) => {
    if (!window.speechSynthesis || !text) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = "en-US";
      utterance.rate = 0.92;
      utterance.pitch = 1;

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors.
    }
  }, []);

  /* =======================================================
     START TIMER
     ======================================================= */

  const startTimer = useCallback(() => {
    stopTimer();

    setSecondsLeft(SECONDS_PER_QUESTION);

    timerRef.current = setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          return 0;
        }

        return previous - 1;
      });
    }, 1000);
  }, [stopTimer]);

  /* =======================================================
     START QUESTION
     ======================================================= */

  const startQuestion = useCallback(
    (question) => {
      if (!question) return;

      resetTranscript();

      setQuestionStartedAt(Date.now());

      startTimer();

      setTimeout(() => {
        speakQuestion(question.text);
      }, 250);
    },
    [
      resetTranscript,
      startTimer,
      speakQuestion,
    ]
  );

  /* =======================================================
     GENERATE QUESTIONS
     ======================================================= */

  const handleStart = async () => {
    setError("");
    setLoading(true);

    let generatedQuestions = [];

    try {
      generatedQuestions = await generateQuestionsBackend(
        category,
        QUESTION_COUNT
      );

      if (!Array.isArray(generatedQuestions)) {
        throw new Error(
          "Invalid question response received from server."
        );
      }

      generatedQuestions = generatedQuestions
        .slice(0, QUESTION_COUNT)
        .map((question, index) => ({
          id:
            question.id ||
            `${category}-${Date.now()}-${index}`,
          category:
            question.category || category,
          text:
            question.text ||
            question.question ||
            question.questionText ||
            "",
        }))
        .filter((question) => question.text);
    } catch (backendError) {
      console.error(
        "Question generation failed:",
        backendError
      );

      const fallback =
        FALLBACK_QUESTIONS[category] ||
        FALLBACK_QUESTIONS[CATEGORIES[0]];

      generatedQuestions = fallback.slice(
        0,
        QUESTION_COUNT
      );

      setError(
        backendError?.message ||
          "Question generation failed. Fallback questions are being used."
      );
    }

    if (generatedQuestions.length < QUESTION_COUNT) {
      const fallback =
        FALLBACK_QUESTIONS[category] ||
        FALLBACK_QUESTIONS[CATEGORIES[0]];

      generatedQuestions = [
        ...generatedQuestions,
        ...fallback,
      ].slice(0, QUESTION_COUNT);
    }

    setQuestions(generatedQuestions);
    setAnswers([]);
    setCurrentIndex(0);
    setResult(null);

    setLoading(false);
    setPhase("active");
  };

  /* =======================================================
     START FIRST QUESTION AFTER QUESTIONS ARE LOADED
     ======================================================= */

  useEffect(() => {
    if (
      phase === "active" &&
      currentQuestion &&
      questionStartedAt === null
    ) {
      startQuestion(currentQuestion);
    }
  }, [
    phase,
    currentQuestion,
    questionStartedAt,
    startQuestion,
  ]);

  /* =======================================================
     HANDLE TIMER END
     ======================================================= */

  useEffect(() => {
    if (
      phase !== "active" ||
      !currentQuestion ||
      secondsLeft !== 0
    ) {
      return;
    }

    const timeout = setTimeout(() => {
      handleNext(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    phase,
    secondsLeft,
    currentQuestion,
  ]);

  /* =======================================================
     CLEANUP
     ======================================================= */

  useEffect(() => {
    return () => {
      stopTimer();

      try {
        window.speechSynthesis?.cancel();
      } catch {
        // Ignore cleanup errors.
      }
    };
  }, [stopTimer]);

  /* =======================================================
     COMBINE TRANSCRIPT
     ======================================================= */

  const combinedTranscript = useMemo(() => {
    return `${transcript} ${interimTranscript}`.trim();
  }, [transcript, interimTranscript]);

  /* =======================================================
     SAVE CURRENT ANSWER
     ======================================================= */

  const createCurrentAnswer = useCallback(
    (forceFinish = false) => {
      if (!currentQuestion) return null;

      const duration = questionStartedAt
        ? Math.round(
            (Date.now() - questionStartedAt) / 1000
          )
        : SECONDS_PER_QUESTION - secondsLeft;

      return {
        questionId: String(
          currentQuestion.id || currentIndex + 1
        ),
        category:
          currentQuestion.category || category,
        questionText:
          currentQuestion.text || "",
        answerText:
          combinedTranscript.trim() || "",
        durationSeconds: Math.max(
          0,
          Math.min(
            SECONDS_PER_QUESTION,
            forceFinish
              ? duration
              : duration
          )
        ),
      };
    },
    [
      currentQuestion,
      questionStartedAt,
      secondsLeft,
      combinedTranscript,
      currentIndex,
      category,
    ]
  );

  /* =======================================================
     FINISH SESSION
     ======================================================= */

  const finishSession = async (updatedAnswers) => {
    stopTimer();

    try {
      window.speechSynthesis?.cancel();
    } catch {
      // Ignore speech cancellation errors.
    }

    stopListening();

    setPhase("scoring");
    setError("");

    if (!studentId) {
      setError(
        "Student ID was not found. Please log in again."
      );

      setPhase("setup");
      return;
    }

    try {
      const scoringResult = await scoreAnswersBackend(
        studentId,
        category,
        updatedAnswers
      );

      setResult(scoringResult);
      setAnswers(updatedAnswers);
      setPhase("done");
    } catch (scoreError) {
      console.error(
        "Communication scoring failed:",
        scoreError
      );

      setError(
        scoreError?.message ||
          "Unable to evaluate your responses. Please try again."
      );

      setAnswers(updatedAnswers);
      setPhase("active");
    }
  };

  /* =======================================================
     NEXT QUESTION
     ======================================================= */

  const handleNext = async (forceFinish = false) => {
    if (!currentQuestion) return;

    stopListening();

    const currentAnswer = createCurrentAnswer(
      forceFinish
    );

    if (!currentAnswer) return;

    const updatedAnswers = [
      ...answers.filter(
        (answer) =>
          answer.questionId !== currentAnswer.questionId
      ),
      currentAnswer,
    ].sort((a, b) => {
      const aIndex = questions.findIndex(
        (question) =>
          String(question.id) === String(a.questionId)
      );

      const bIndex = questions.findIndex(
        (question) =>
          String(question.id) === String(b.questionId)
      );

      return aIndex - bIndex;
    });

    setAnswers(updatedAnswers);

    if (
      currentIndex >=
      questions.length - 1
    ) {
      await finishSession(updatedAnswers);
      return;
    }

    stopTimer();

    setCurrentIndex((previous) => previous + 1);

    setQuestionStartedAt(null);

    resetTranscript();

    setSecondsLeft(SECONDS_PER_QUESTION);
  };

  /* =======================================================
     PREVIOUS QUESTION
     ======================================================= */

  const handleBack = () => {
    if (currentIndex <= 0) return;

    stopListening();
    stopTimer();

    try {
      window.speechSynthesis?.cancel();
    } catch {
      // Ignore speech cancellation errors.
    }

    setCurrentIndex((previous) => previous - 1);

    setQuestionStartedAt(null);

    resetTranscript();

    setSecondsLeft(SECONDS_PER_QUESTION);
  };

  /* =======================================================
     RESTART
     ======================================================= */

  const handleRestart = () => {
    stopTimer();
    stopListening();

    try {
      window.speechSynthesis?.cancel();
    } catch {
      // Ignore speech cancellation errors.
    }

    setPhase("setup");
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setSecondsLeft(SECONDS_PER_QUESTION);
    setResult(null);
    setQuestionStartedAt(null);
    setError("");
    resetTranscript();
  };

  /* =======================================================
     REPEAT QUESTION
     ======================================================= */

  const handleRepeatQuestion = () => {
    if (!currentQuestion) return;

    speakQuestion(currentQuestion.text);
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar />

      <main className="ml-[260px] min-h-screen">
        <div className="border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MessageCircle size={20} />
              </div>

              <div>
                <div className="text-sm font-black text-slate-900">
                  Communication
                </div>

                <div className="text-xs text-slate-400">
                  Spoken communication assessment
                </div>
              </div>
            </div>

            {phase !== "setup" &&
              phase !== "done" && (
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  <RotateCcw size={15} />
                  Restart
                </button>
              )}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {phase === "setup" && (
            <SetupPanel
              category={category}
              setCategory={setCategory}
              onStart={handleStart}
              loading={loading}
              error={error}
            />
          )}

          {phase === "loading" && <LoadingPanel />}

          {phase === "active" &&
            currentQuestion && (
              <ActiveQuestionPanel
                question={currentQuestion}
                questionIndex={currentIndex}
                totalQuestions={questions.length}
                secondsLeft={secondsLeft}
                transcript={transcript}
                interimTranscript={interimTranscript}
                listening={listening}
                speechSupported={speechSupported}
                onStartListening={startListening}
                onStopListening={stopListening}
                onNext={() => handleNext(false)}
                onRepeatQuestion={
                  handleRepeatQuestion
                }
                onBack={handleBack}
              />
            )}

          {phase === "scoring" && <ScoringPanel />}

          {phase === "done" && result && (
            <SummaryPanel
              result={result}
              category={category}
              onRestart={handleRestart}
              onDashboard={() =>
                navigate("/student-dashboard")
              }
            />
          )}

          {error &&
            phase === "active" && (
              <div className="mx-auto mt-5 flex max-w-5xl items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <div className="font-bold">
                    Notice
                  </div>

                  <div className="mt-1">
                    {error}
                  </div>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}