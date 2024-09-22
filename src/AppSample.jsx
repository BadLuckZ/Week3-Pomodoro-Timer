import usePomodoro from "./hooks/usePomodoro";
import { Button, SettingSection } from "./components";

function App() {
  const {
    initialBreakTimer,
    initialSessionTimer,
    setInitialBreakTimer,
    setInitialSessionTimer,
    displayedTimer,
    isOnBreak,
    isCounting,
    resetTimer,
    setIsCounting,
    allowChangeSetting,
  } = usePomodoro();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-smoke">Pomodoro Timer</h1>

      <div className="bg-redwood flex flex-col justify-center items-center w-4/5">
        <div className=" w-1/3 flex flex-col justify-center items-center p-2">
          <h2>{isOnBreak ? "Break" : "Session"}</h2>
          <h2>{displayedTimer}</h2>
          <div className="flex justify-between w-full">
            <Button
              onClick={() => setIsCounting(!isCounting)}
              buttonText={isCounting ? "pause" : "start"}
            />
            <Button onClick={() => resetTimer()} buttonText={"reset"} />
          </div>
        </div>

        <div className="flex justify-between w-full ">
          <SettingSection
            title="Session timer"
            value={initialSessionTimer}
            decrementButtonProps={{
              onClick: () => setInitialSessionTimer((prev) => prev - 1),
              disableButton:
                !allowChangeSetting || isCounting || initialSessionTimer <= 0,
            }}
            incrementButtonProps={{
              onClick: () => setInitialSessionTimer((prev) => prev + 1),
              disableButton: !allowChangeSetting || isCounting,
            }}
          />

          <SettingSection
            title="Break timer"
            value={initialBreakTimer}
            decrementButtonProps={{
              onClick: () => setInitialBreakTimer((prev) => prev - 1),
              disableButton:
                !allowChangeSetting || isCounting || initialBreakTimer <= 0,
            }}
            incrementButtonProps={{
              onClick: () => setInitialBreakTimer((prev) => prev + 1),
              disableButton: !allowChangeSetting || isCounting,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
