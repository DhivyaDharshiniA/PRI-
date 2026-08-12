import { useCallback, useEffect, useRef } from "react";

/**
 * Locks the exam into fullscreen and reports a violation the instant the
 * student leaves fullscreen, switches tabs/apps, or the window loses focus.
 *
 * @param {object} opts
 * @param {boolean} opts.active - whether the guard should be armed (true while the test is running)
 * @param {(violationType: string) => void} opts.onViolation - called once, the first time any violation fires
 */
export function useExamSecurity({ active, onViolation }) {
  const firedRef = useRef(false);
  const enteringRef = useRef(false); // true while WE are requesting fullscreen, to ignore our own transition

  const enterFullscreen = useCallback(async () => {
    const el = document.documentElement;
    try {
      enteringRef.current = true;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
    } finally {
      setTimeout(() => (enteringRef.current = false), 300);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const fireOnce = useCallback(
    (type) => {
      if (firedRef.current) return;
      firedRef.current = true;
      onViolation(type);
    },
    [onViolation]
  );

  useEffect(() => {
    if (!active) return;

    // Grace period so the browser's own fullscreen-entry transition
    // (which can momentarily blur/hide the document) doesn't false-fire.
    let armed = false;
    const armTimer = setTimeout(() => (armed = true), 1200);

    const handleVisibilityChange = () => {
      if (armed && document.hidden) fireOnce("TAB_SWITCH");
    };

    const handleBlur = () => {
      if (armed) fireOnce("WINDOW_BLUR");
    };

    const handleFullscreenChange = () => {
      if (enteringRef.current) return; // ignore our own enter-fullscreen transition
      if (!document.fullscreenElement) fireOnce("FULLSCREEN_EXIT");
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const blockContextMenu = (e) => e.preventDefault();
    const blockCopyPaste = (e) => e.preventDefault();
    const blockKeys = (e) => {
      // Block common shortcuts used to switch away or dev-tools
      const blocked =
        e.key === "F11" ||
        e.key === "F12" ||
        (e.altKey && e.key === "Tab") ||
        (e.ctrlKey && ["c", "v", "u", "p"].includes(e.key.toLowerCase())) ||
        (e.metaKey && e.key === "Tab");
      if (blocked) e.preventDefault();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("copy", blockCopyPaste);
    document.addEventListener("cut", blockCopyPaste);
    document.addEventListener("keydown", blockKeys);

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("copy", blockCopyPaste);
      document.removeEventListener("cut", blockCopyPaste);
      document.removeEventListener("keydown", blockKeys);
    };
  }, [active, fireOnce]);

  return { enterFullscreen, exitFullscreen };
}
