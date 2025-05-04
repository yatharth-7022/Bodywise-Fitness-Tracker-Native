import { useEffect, useRef, useState } from "react";

export const useTimer = () => {
  const [tab, setTab] = useState<"timer" | "stopwatch">("timer");

  const [timerInput, setTimerInput] = useState({ min: 0, sec: 0 });
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [stopwatch, setStopwatch] = useState(0);
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timer > 0 && !timerActive) {
      setTimerActive(true);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(timerInput.min * 60 + timerInput.sec);
  };

  const setTimerFromInput = () => {
    setTimer(timerInput.min * 60 + timerInput.sec);
  };

  const startStopwatch = () => {
    if (!stopwatchActive) {
      setStopwatchActive(true);
      stopwatchRef.current = setInterval(() => {
        setStopwatch((prev) => prev + 1);
      }, 1000);
    }
  };

  const pauseStopwatch = () => {
    setStopwatchActive(false);
    if (stopwatchRef.current) clearInterval(stopwatchRef.current);
  };

  const resetStopwatch = () => {
    setStopwatchActive(false);
    if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    setStopwatch(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps((prev) => [stopwatch, ...prev]);
  };

  // Cleanup intervals on unmount
  // eslint-disable-next-line
  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    },
    []
  );

  return {
    pauseTimer,
    addLap,
    resetStopwatch,
    pauseStopwatch,
    startStopwatch,
    setLaps,
    laps,
    setTimerFromInput,
    resetTimer,
    startTimer,
    setTimerInput,
    tab,
    setTab,
    timerInput,
    timerActive,
    stopwatchActive,
    stopwatch,
    timer,
  };
};
