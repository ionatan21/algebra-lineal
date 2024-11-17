import React from "react";
import Matriz from "./matriz";

const Inversa = (props) => {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center">
      <h2 className="m-5">Inversa de: </h2>
      <Matriz
        dimensions={props.dimensionsA}
        onMatrixChange={props.handleMatrixAChange}
        var={"A"}
      />
    </div>
  );
};

export default Inversa;
