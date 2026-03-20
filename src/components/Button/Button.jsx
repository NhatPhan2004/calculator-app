import "./Button.css";

function Button({ label, variant, onClick }) {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {" "}
      {label}
    </button>
  );
}
export default Button;
