import React from "react";
import InputVar from "./InputVar";
import Matriz from "./matriz";
const ProductoK = (props) => {
  return (
    <div className="flex md:flex-row flex-col justify-evenly items-center w-full">
      <div>
        <InputVar value={"Variable K:"} setvalue={props.setk} />
      </div>
      <h1 className="m-5">*</h1>
      <Matriz
        dimensions={props.dimensionsA}
        onMatrixChange={props.handleMatrixAChange}
        var={"A"}
      />
    </div>
  );
};

export default ProductoK;
