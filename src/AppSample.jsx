import { useEffect, useState } from "react";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const TIME_INTERVAL = 10;
function App() {
  const [initialSessionTimer, setInitialSessionTimer] = useState(25);
  const [initialBreakTimer, setInitialBreakTimer] = useState(5);

  const [sessionTimer, setSessionTimer] = useState(initialSessionTimer * 60);
  const [breakTimer, setBreakTimer] = useState(initialBreakTimer * 60);

  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);

  const isStartedCountingDown =
    initialSessionTimer * 60 !== sessionTimer ||
    initialBreakTimer * 60 !== breakTimer;

  useEffect(() => {
    setSessionTimer(initialSessionTimer * 60);
  }, [initialSessionTimer]);
  useEffect(() => {
    setBreakTimer(initialBreakTimer * 60);
  }, [initialBreakTimer]);

  useEffect(() => {
    let id;

    if (isOnBreak) {
      id = isCountingDown
        ? setInterval(() => {
            setBreakTimer((prev) => {
              if (prev > 0) {
                return prev - 1;
              }

              setIsOnBreak(false);
              setSessionTimer(initialSessionTimer * 60);
              return 0;
            });
          }, TIME_INTERVAL)
        : undefined;
    } else {
      id = isCountingDown
        ? setInterval(() => {
            setSessionTimer((prev) => {
              if (prev > 0) {
                return prev - 1;
              }

              setIsOnBreak(true);
              setBreakTimer(initialBreakTimer * 60);
              return 0;
            });
          }, TIME_INTERVAL)
        : undefined;
    }

    return () => {
      clearInterval(id);
    };
  }, [initialBreakTimer, initialSessionTimer, isCountingDown, isOnBreak]);

  return (
    <>
      <h1 className="text-smoke text-center">Pomodoro Timer</h1>
      <div className="bg-redwood flex flex-col items-center">
        <div className="flex flex-col items-center w-[200px]">
          <h2>{isOnBreak ? "Break" : "Session"}</h2>
          <p>{formatTime(isOnBreak ? breakTimer : sessionTimer)}</p>
          <div className="flex justify-between w-full">
            <button
              className="btn"
              onClick={() => {
                setIsCountingDown(!isCountingDown);
              }}
            >
              {isCountingDown ? "pause" : "start"}
            </button>
            <button
              className="btn"
              onClick={() => {
                setSessionTimer(initialSessionTimer * 60);
                setBreakTimer(initialBreakTimer * 60);
                setIsCountingDown(false);
                setIsOnBreak(false);
              }}
            >
              reset
            </button>
          </div>
        </div>

        <div className="flex justify-between w-4/5">
          <div className="setting-box">
            <p>Session Timer</p>
            <p>{initialSessionTimer}</p>
            <div className="flex justify-between w-full">
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialSessionTimer(initialSessionTimer - 1);
                }}
                disabled={
                  initialSessionTimer <= 0 ||
                  isCountingDown ||
                  isStartedCountingDown
                }
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialSessionTimer(initialSessionTimer + 1);
                }}
                disabled={isCountingDown || isStartedCountingDown}
              >
                +
              </button>
            </div>
          </div>
          <div className="setting-box">
            <p>Break Timer</p>
            <p>{initialBreakTimer}</p>
            <div className="flex justify-between w-full">
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialBreakTimer(initialBreakTimer - 1);
                }}
                disabled={
                  initialBreakTimer <= 0 ||
                  isCountingDown ||
                  isStartedCountingDown
                }
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialBreakTimer(initialBreakTimer + 1);
                }}
                disabled={isCountingDown || isStartedCountingDown}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
