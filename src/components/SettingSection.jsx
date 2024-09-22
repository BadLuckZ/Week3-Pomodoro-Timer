/* eslint-disable react/prop-types */
import { RoundedButton } from ".";
const SettingSection = ({
  title,
  value,
  incrementButtonProps,
  decrementButtonProps,
}) => {
  return (
    <div className="setting-box">
      <p>{title}</p>
      <p className="font-bold">{value}</p>
      <div className="flex w-full justify-between">
        <RoundedButton {...decrementButtonProps} buttonText={"-"} />
        <RoundedButton {...incrementButtonProps} buttonText={"+"} />
      </div>
    </div>
  );
};
export default SettingSection;
