import { useState, useRef, useEffect } from "react";

interface TimerInputs {
  hours: string;
  minutes: string;
  seconds: string;
}

export const useTimer = () => {
  // Timer state
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [timerInput, setTimerInput] = useState<TimerInputs>({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [timerActive, setTimerActive] = useState(false);

  // Stopwatch state
  const [stopwatch, setStopwatch] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [stopwatchActive, setStopwatchActive] = useState(false);
  const [laps, setLaps] = useState<
    { minutes: number; seconds: number; milliseconds: number }[]
  >([]);

  // Tab state
  const [tab, setTab] = useState<"timer" | "stopwatch">("timer");

  // References for intervals
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer functions
  const startTimer = () => {
    if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) return;

    setTimerActive(true);
    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timerIntervalRef.current!);
          setTimerActive(false);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setTimerActive(false);
  };

  const resetTimer = () => {
    pauseTimer();
    setTimer({ hours: 0, minutes: 0, seconds: 0 });
    setTimerInput({ hours: "00", minutes: "00", seconds: "00" });
  };

  const setTimerFromInput = () => {
    const hours = parseInt(timerInput.hours) || 0;
    const minutes = parseInt(timerInput.minutes) || 0;
    const seconds = parseInt(timerInput.seconds) || 0;

    setTimer({ hours, minutes, seconds });
  };

  // Stopwatch functions
  const startStopwatch = () => {
    setStopwatchActive(true);
    stopwatchIntervalRef.current = setInterval(() => {
      setStopwatch((prev) => {
        let newMilliseconds = prev.milliseconds + 1;
        let newSeconds = prev.seconds;
        let newMinutes = prev.minutes;

        if (newMilliseconds >= 100) {
          newMilliseconds = 0;
          newSeconds += 1;
        }

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes += 1;
        }

        return {
          minutes: newMinutes,
          seconds: newSeconds,
          milliseconds: newMilliseconds,
        };
      });
    }, 10);
  };

  const pauseStopwatch = () => {
    if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
      stopwatchIntervalRef.current = null;
    }
    setStopwatchActive(false);
  };

  const resetStopwatch = () => {
    pauseStopwatch();
    setStopwatch({ minutes: 0, seconds: 0, milliseconds: 0 });
    setLaps([]);
  };

  const addLap = () => {
    setLaps((prev) => [...prev, stopwatch]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (stopwatchIntervalRef.current)
        clearInterval(stopwatchIntervalRef.current);
    };
  }, []);

  return {
    timer,
    timerInput,
    timerActive,
    stopwatch,
    stopwatchActive,
    laps,
    tab,
    setTab,
    startTimer,
    pauseTimer,
    resetTimer,
    setTimerInput,
    setTimerFromInput,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    addLap,
  };
};
