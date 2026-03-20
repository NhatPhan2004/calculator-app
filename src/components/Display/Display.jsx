import "./Display.css";
const Display = ({ value }) => {
  return (
    <>
      <div className="display-container">
        <div className="screen">
          <span className="display-value">{value || "0"}</span>
        </div>
      </div>
    </>
  );
};

export default Display;
