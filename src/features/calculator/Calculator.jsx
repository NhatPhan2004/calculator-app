import { BTN_ACTIONS } from "../../constants/calculator";
import Button from "../../components/Button/Button";
import Display from "../../components/Display/Display";
import useCalculator from "../../hooks/useCalculator";
import "./Calculator.css";

const Calculator = () => {
  const { displayValue, handlePress } = useCalculator();

  return (
    <div className="calculator-wrapper">
      <div className="calculator-body">
        <Display value={displayValue} />
        <div className="keypad">
          {BTN_ACTIONS.map((btn, index) => (
            <Button
              key={index}
              label={btn.label}
              variant={btn.variant}
              onClick={() => handlePress(btn.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Calculator;
