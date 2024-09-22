function App() {
  return (
    <>
      <h1 className="text-smoke text-center">Pomodoro Timer</h1>
      <div className="bg-redwood flex flex-col items-center px-[40px]">
        <div className="setting-box">
          <h2>Session</h2>
          <h3>25:00</h3>
          <div className="flex justify-between w-full">
            <button className="btn">Start</button>
            <button className="btn">Reset</button>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="setting-box">
            <h2>Session Timer</h2>
            <h3>25</h3>
            <div className="flex justify-between w-full">
              <button className="rounded-btn">-</button>
              <button className="rounded-btn">+</button>
            </div>
          </div>
          <div className="setting-box">
            <h2>Break Timer</h2>
            <h3>5</h3>
            <div className="flex justify-between w-full">
              <button className="rounded-btn">-</button>
              <button className="rounded-btn">+</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
