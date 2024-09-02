import React from "react";
import Matriz from "./matriz";

const Suma = (props) => {
  return (
    <div className="flex md:flex-row flex-col justify-evenly items-center">
      <Matriz
        dimensions={props.dimensionsA}
        onMatrixChange={props.handleMatrixAChange}
        var={"A"}
      />
      <h1>+</h1>
      <Matriz
        dimensions={props.dimensionsB}
        onMatrixChange={props.handleMatrixBChange}
        var={"B"}
      />
    </div>
  );
};

export default Suma;
