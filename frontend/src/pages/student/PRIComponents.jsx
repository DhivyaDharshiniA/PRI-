import React from "react";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Target,
  TrendingUp,
} from "lucide-react";

export function PRIScoreCard({
  score,
  level,
  placementReady,
}) {

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs font-bold tracking-widest text-blue-600">
              PLACEMENT READINESS INDEX
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900">
              Your PRI Score
            </h2>
          </div>

          <Target className="text-blue-600" size={24} />

        </div>

        <div className="mt-7 flex items-center gap-7">

          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-blue-50">

            <div className="absolute inset-3 rounded-full border-[10px] border-blue-600" />

            <div className="text-center">

              <div className="text-4xl font-black text-blue-700">
                {Math.round(score)}
              </div>

              <div className="text-xs font-semibold text-slate-400">
                / 100
              </div>

            </div>

          </div>

          <div>

            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              {formatLevel(level)}
            </span>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {placementReady
                ? "You have reached the placement-ready target."
                : `${Math.max(
                    0,
                    Math.round(80 - score)
                  )} points remaining to reach the target.`}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-600">
              <TrendingUp size={14} />
              Target: 80
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export function PRIDimensions({
  dimensions = [],
}) {

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

      <div>
        <h2 className="text-lg font-black text-slate-900">
          PRI Dimensions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your performance across placement skills.
        </p>
      </div>

      <div className="mt-6 space-y-5">

        {dimensions.map((dimension) => (

          <div key={dimension.key}>

            <div className="mb-2 flex items-center justify-between">

              <div>

                <span className="text-sm font-bold text-slate-800">
                  {dimension.name}
                </span>

                <span className="ml-2 text-[10px] font-semibold text-slate-400">
                  Weight {Math.round(dimension.weight * 100)}%
                </span>

              </div>

              <span className="text-sm font-black text-blue-700">
                {Math.round(dimension.score)}%
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      dimension.score
                    )
                  )}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export function PRIRoadmap({
  roadmap = [],
}) {

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

      <div className="mb-7">

        <h2 className="text-lg font-black text-slate-900">
          Your PRI Roadmap
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Follow these milestones to become placement ready.
        </p>

      </div>

      <div className="space-y-5">

        {roadmap.map((step, index) => {

          const completed =
            step.status === "COMPLETED";

          const current =
            step.status === "CURRENT";

          return (
            <div
              key={step.number}
              className="flex gap-4"
            >

              <div className="flex flex-col items-center">

                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    completed
                      ? "bg-emerald-100 text-emerald-600"
                      : current
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-slate-100 text-slate-400",
                  ].join(" ")}
                >

                  {completed ? (
                    <CheckCircle2 size={19} />
                  ) : current ? (
                    <Target size={18} />
                  ) : (
                    <Circle size={18} />
                  )}

                </div>

                {index < roadmap.length - 1 && (
                  <div className="mt-2 h-full min-h-8 w-px bg-slate-200" />
                )}

              </div>

              <div className="pb-5">

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="text-sm font-black text-slate-900">
                    {step.title}
                  </h3>

                  <span
                    className={[
                      "rounded-full px-2 py-1 text-[9px] font-bold",
                      completed
                        ? "bg-emerald-50 text-emerald-600"
                        : current
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-400",
                    ].join(" ")}
                  >
                    {step.status}
                  </span>

                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {step.description}
                </p>

                <div className="mt-3 flex items-center gap-4">

                  <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${Math.min(
                          100,
                          step.currentScore
                        )}%`,
                      }}
                    />

                  </div>

                  <span className="text-[10px] font-bold text-slate-500">
                    {Math.round(step.currentScore)}%
                    {" / "}
                    {Math.round(step.targetScore)}%
                  </span>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export function PRIRecommendations({
  recommendations = [],
  navigate,
}) {

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

      <div className="mb-6">

        <h2 className="text-lg font-black text-slate-900">
          Recommended Next Steps
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Focus on these areas to improve your PRI.
        </p>

      </div>

      <div className="space-y-3">

        {recommendations.map(
          (item, index) => (

            <div
              key={`${item.dimension}-${index}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  {Math.round(item.score)}%
                </div>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 max-w-xl text-xs text-slate-500">
                    {item.description}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(item.route)
                }
                className="flex shrink-0 items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                {item.action}
                <ArrowRight size={13} />
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}

function formatLevel(level) {

  if (!level) {
    return "Developing";
  }

  return level
    .toLowerCase()
    .split("_")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}