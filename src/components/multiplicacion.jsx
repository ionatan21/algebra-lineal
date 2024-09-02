import React from 'react';
import Matriz from './matriz';

const Multiplicacion = (props) => {
    return (
        <div className="flex md:flex-row flex-col justify-center items-center">
        <Matriz
          dimensions={props.dimensionsA}
          onMatrixChange={props.handleMatrixAChange}
          var={"A"}
        />
        <h1>*</h1>
        <Matriz
          dimensions={props.dimensionsB}
          onMatrixChange={props.handleMatrixBChange}
          var={"B"}
        />
      </div>
    );
}

export default Multiplicacion;
