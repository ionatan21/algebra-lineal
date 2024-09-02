import React from "react";

const Options = (props) => {
  return (
    <select
      name="options"
      id="options"
      onChange={(e) => props.setOption(e.target.value, props.setState(true))}
    >
      <option value="" disabled selected>
        Seleccione una opción
      </option>
      <option value="+">Suma</option>
      <option value="-">Resta</option>
      <option value="*">Multiplicación</option>
      <option value="T">Transpuesta</option>
      <option value="k">Producto K</option>
      <option value="Adj">Adjunta</option>
      <option value="Det">Determinante</option>
    </select>
  );
};

export default Options;
