const RoundedButton = ({ onClick, disableButton, buttonText }) => {
  return (
    <button className="rounded-btn" onClick={onClick} disabled={disableButton}>
      {buttonText}
    </button>
  );
};
export default RoundedButton;
