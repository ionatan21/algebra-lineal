import React from "react";
import './dimension.css'

const Dimensions = (props) => {
  const { changex, changey, y, changez, disabled } = props;
  return (
    <div className="m-2 dimension-value">   
      {disabled ? (
        <input type="number" value={y} />
      ) : (
        <input type="number" onChange={changex} /> 
      )}
      x

      {disabled ? (
        <input type="number" onChange={changez} />
      ) : ( 
        <input type="number" onChange={changey} />
      )}

    </div>
  );
};

export default Dimensions;
