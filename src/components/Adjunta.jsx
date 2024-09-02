import React from "react";
import Matriz from "./matriz";

const Adjunta = (props) => {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center">
      <h2 className="m-5">Adjunta de: </h2>
      <Matriz
        dimensions={props.dimensionsA}
        onMatrixChange={props.handleMatrixAChange}
        var={"A"}
      />
    </div>
  );
};

export default Adjunta;
