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
          let str = displayValue;

          str = str.replace(/[+\-x÷]+$/, "");

          const finalExpression = str
            .replace(/x/g, "*")
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/:/g, "/");

          if (!finalExpression || finalExpression === "0") return;

          const result = eval(finalExpression);

          if (!isFinite(result)) {
            setDisplayValue("Infinity");
          } else {
            setDisplayValue(String(parseFloat(result.toFixed(8))));
          }
        } catch (err) {
          console.error("Lỗi Eval:", err);
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
