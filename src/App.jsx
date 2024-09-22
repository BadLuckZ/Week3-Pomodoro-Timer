import { useEffect, useState } from "react";

const timeSessionStart = 25; // minute;
const timeBreakStart = 5; // minute

const formatTwoDigit = (time) => {
  return time < 10 ? "0" + time : time;
};

const formatRuntime = (timeSecond) => {
  const second = timeSecond % 60;
  const minute = (timeSecond - second) / 60;
  return formatTwoDigit(minute) + ":" + formatTwoDigit(second);
};

function App() {
  const [initialTimeSession, setInitialTimeSession] =
    useState(timeSessionStart);
  const [initialTimeBreak, setInitialTimeBreak] = useState(timeBreakStart);

  const [sessionTime, setSessionTime] = useState(initialTimeSession);
  const [breakTime, setBreakTime] = useState(initialTimeBreak);

  useEffect(() => {
    setSessionTime(initialTimeSession * 60);
  }, [initialTimeSession]);

  useEffect(() => {
    setBreakTime(initialTimeBreak * 60);
  }, [initialTimeBreak]);

  return (
    <>
      <h1 className="text-smoke text-center">Pomodoro Timer</h1>
      <div className="bg-redwood flex flex-col items-center px-[40px]">
        <div className="setting-box">
          <h2>Session</h2>
          <h3>{formatRuntime(sessionTime)}</h3>
          <div className="flex justify-between w-full">
            <button className="btn">Start</button>
            <button className="btn">Reset</button>
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
                disabled={initialTimeSession === 0}
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialTimeSession((time) => time + 1);
                }}
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
                disabled={initialTimeBreak === 0}
              >
                -
              </button>
              <button
                className="rounded-btn"
                onClick={() => {
                  setInitialTimeBreak((time) => time + 1);
                }}
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
