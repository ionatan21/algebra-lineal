import React from "react";
import "./dimension.css";

const Dimensions = (props) => {
  const { changex, changey, y, changez, disabled } = props;

  function limitInputLength(input) {
    input.addEventListener("input", function () {
      if (this.value.length > 1) {
        this.value = this.value.slice(0, 1);
      }

    });
  }

  const inputs = document.querySelectorAll(
    "#number1, #number2, #number3, #number4"
  );

  inputs.forEach((input) => {
    limitInputLength(input);
  });

  return (
    <div className="m-2 dimension-value animate-fade-in-up">
      {disabled ? (
        <input type="number" id="number1" value={y} />
      ) : (
        <input type="number" id="number2" onChange={changex} />
      )}
      x
      {disabled ? (
        <input type="number" id="number3" onChange={changez} />
      ) : (
        <input type="number" id="number4" onChange={changey} />
      )}
    </div>
  );
};

export default Dimensions;
