import { useState, useEffect } from "react";
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
const COUNTDOWN_INTERVAL = 1000;
const usePomodoro = () => {
  const [initialSessionTimer, setInitialSessionTimer] = useState(25);
  const [initialBreakTimer, setInitialBreakTimer] = useState(5);
  const [sessionTimer, setSessionTimer] = useState(initialSessionTimer * 60);
  const [breakTimer, setBreakTimer] = useState(initialBreakTimer * 60);
  const [isCounting, setIsCounting] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  useEffect(() => {
    setSessionTimer(initialSessionTimer * 60);
  }, [initialSessionTimer]);
  useEffect(() => {
    setBreakTimer(initialBreakTimer * 60);
  }, [initialBreakTimer]);

  useEffect(() => {
    let id = undefined;
    if (isOnBreak) {
      id = isCounting
        ? setInterval(() => {
            setBreakTimer((prev) => {
              if (prev > 0) {
                return prev - 1;
              } else {
                setIsOnBreak(false);
                setSessionTimer(initialSessionTimer * 60);
                return 0;
              }
            });
          }, COUNTDOWN_INTERVAL)
        : undefined;
    } else {
      id = isCounting
        ? setInterval(() => {
            setSessionTimer((prev) => {
              if (prev > 0) {
                return prev - 1;
              } else {
                setIsOnBreak(true);
                setBreakTimer(initialBreakTimer * 60);
                return 0;
              }
            });
          }, COUNTDOWN_INTERVAL)
        : undefined;
    }
    return () => {
      clearInterval(id);
    };
  }, [initialBreakTimer, initialSessionTimer, isCounting, isOnBreak]);
  const resetTimer = () => {
    setIsCounting(false);
    setIsOnBreak(false);
    setSessionTimer(initialSessionTimer * 60);
    setBreakTimer(initialBreakTimer * 60);
  };

  const allowChangeSetting =
    breakTimer === initialBreakTimer * 60 &&
    sessionTimer === initialSessionTimer * 60;

  return {
    initialSessionTimer,
    initialBreakTimer,
    setInitialSessionTimer,
    setInitialBreakTimer,
    setIsCounting,
    isOnBreak,
    isCounting,
    allowChangeSetting,
    resetTimer,
    displayedTimer: formatTime(isOnBreak ? breakTimer : sessionTimer),
  };
};
export default usePomodoro;
