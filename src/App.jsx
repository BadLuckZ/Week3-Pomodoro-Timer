import { useEffect, useState } from "react";

const timeSessionStart = 1; // minute;
const timeBreakStart = 0; // minute

const formatTwoDigit = (time) => {
  return time < 10 ? "0" + time : time;
};

const formatRuntime = (timeSecond) => {
  const minute = Math.floor(timeSecond / 60);
  const second = timeSecond % 60;
  return formatTwoDigit(minute) + ":" + formatTwoDigit(second);
};

let id;

function App() {
  const [initialTimeSession, setInitialTimeSession] =
    useState(timeSessionStart);
  const [initialTimeBreak, setInitialTimeBreak] = useState(timeBreakStart);

  const [timeSession, setTimeSession] = useState(initialTimeSession * 60);
  const [hasBreak, setHasBreak] = useState(false);
  const [hasStart, setHasStart] = useState(false);

  const onClickStartPause = () => {
    if (!hasStart) {
      setHasStart(true);
      id = setInterval(() => {
        setTimeSession((time) => time - 1);
      }, 10);
    } else {
      setHasStart(false);
      clearInterval(id);
    }
    return () => {
      clearInterval(id);
    };
  };

  const onClickReset = () => {
    setHasStart(false);
    setHasBreak(false);
    clearInterval(id);
    setTimeSession(initialTimeSession * 60);
  };

  useEffect(() => {
    setTimeSession(initialTimeSession * 60);
  }, [initialTimeSession, initialTimeBreak]);

  useEffect(() => {
    if (timeSession === 0) {
      if (hasStart) {
        if (hasBreak) {
          setTimeSession(initialTimeSession * 60);
          setHasBreak(false);
        } else {
          setTimeSession(initialTimeBreak * 60);
          setHasBreak(true);
        }
      }
    }
  }, [timeSession, hasBreak, hasStart]);

  return (
    <>
      <h1 className="text-smoke text-center">Pomodoro Timer</h1>
      <div className="bg-redwood flex flex-col items-center px-[40px]">
        <div className="setting-box">
          <h2>{hasStart ? (hasBreak ? "Break" : "Start") : "Session"}</h2>
          <h3>{formatRuntime(timeSession)}</h3>
          <div className="flex justify-between w-full">
            <button className="btn" onClick={onClickStartPause}>
              {hasStart ? "Pause" : "Start"}
            </button>
            <button className="btn" onClick={onClickReset}>
              Reset
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="setting-box">
            <h2>Session Timer</h2>
            <h3>{formatTwoDigit(initialTimeSession)}</h3>
            <div className="flex justify-between w-full">
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialTimeSession((time) => time - 1);
                }}
                disabled={initialTimeSession === 0 || hasStart}
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialTimeSession((time) => time + 1);
                }}
                disabled={hasStart}
              >
                +
              </button>
            </div>
          </div>
          <div className="setting-box">
            <h2>Break Timer</h2>
            <h3>{formatTwoDigit(initialTimeBreak)}</h3>
            <div className="flex justify-between w-full">
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialTimeBreak((time) => time - 1);
                }}
                disabled={initialTimeBreak === 0 || hasStart}
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialTimeBreak((time) => time + 1);
                }}
                disabled={hasStart}
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
