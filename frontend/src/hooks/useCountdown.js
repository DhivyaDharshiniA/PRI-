import { useEffect, useRef, useState } from "react";

/**
 * Counts down to a fixed deadline (ISO string from the server), so the
 * timer can't be manipulated by pausing the tab or changing the system clock
 * mid-test -- the server re-validates the deadline on every submit anyway.
 */
export function useCountdown(deadlineIso, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(() => diff(deadlineIso));
  const expiredRef = useRef(false);

  useEffect(() => {
    if (!deadlineIso) return;
    const interval = setInterval(() => {
      const remaining = diff(deadlineIso);
      setSecondsLeft(remaining);
      if (remaining <= 0 && !expiredRef.current) {
        expiredRef.current = true;
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [deadlineIso, onExpire]);

  const minutes = Math.max(0, Math.floor(secondsLeft / 60));
  const seconds = Math.max(0, secondsLeft % 60);
  return {
    secondsLeft: Math.max(0, secondsLeft),
    label: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    isLow: secondsLeft <= 60,
  };
}

function diff(deadlineIso) {
  if (!deadlineIso) return 0;
  return Math.round((new Date(deadlineIso).getTime() - Date.now()) / 1000);
}
