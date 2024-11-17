import React from "react";

const Options = (props) => {

  function handleChange(e) {
    const { value } = e.target;
    props.setOption(value);
    props.setState(true);
    props.setAnswer(false);
  }

  return (
    <select
      name="options"
      id="options"
      onChange={handleChange}
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
      <option value="Inv">Inversa</option>
    </select>
  );
};

export default Options;
