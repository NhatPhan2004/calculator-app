import { useState } from "react";

const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState("0");

  const handlePress = (label) => {
    if (typeof label !== "string") return;

    const operators = ["+", "-", "x", "÷"];

    switch (label) {
      case "AC":
        setDisplayValue("0");
        break;

      case "DEL":
        setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
        break;

      case "+/-":
        setDisplayValue((prev) => {
          if (prev === "0") return "0";
          if (operators.includes(prev.slice(-1))) return prev;
          return String(Number(prev) * -1);
        });
        break;

      case "%":
        setDisplayValue((prev) => {
          if (operators.includes(prev.slice(-1))) return prev;
          return String(Number(prev) / 100);
        });
        break;

      case "=":
        try {
          let lastChar = displayValue.slice(-1);
          let cleanExpression = displayValue;
          if (operators.includes(lastChar)) {
            cleanExpression = displayValue.slice(0, -1);
          }

          const expression = cleanExpression
            .replaceAll("x", "*")
            .replaceAll("÷", "/");

          const result = eval(expression);
          setDisplayValue(String(Number(result.toFixed(8))));
        } catch {
          setDisplayValue("Error");
        }
        break;

      default:
        setDisplayValue((prev) => {
          const lastChar = prev.slice(-1);
          if (operators.includes(label) && operators.includes(lastChar)) {
            return prev.slice(0, -1) + label;
          }

          if (label === "." && lastChar === ".") return prev;

          return prev === "0" && !operators.includes(label)
            ? label
            : prev + label;
        });
        break;
    }
  };

  return { displayValue, handlePress };
};

export default useCalculator;
