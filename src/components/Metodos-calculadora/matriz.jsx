import React, { useState, useEffect } from "react";
import "./matriz.css";

const Matriz = (props) => {
  const { dimensions, onMatrixChange } = props;

  const lenghtX = dimensions.rows;
  const lenghtY = dimensions.columns;

  // Comprobamos si las dimensiones están definidas
  if (!dimensions || !dimensions.rows || !dimensions.columns) {
    return <div></div>;
  }

  // Inicializar la matriz con ceros o valores vacíos
  const [matrix, setMatrix] = useState([]);
 
  // Efecto para actualizar la matriz cuando cambian las dimensiones
  useEffect(() => {
    const newMatrix = [];
    for (let i = 0; i < dimensions.rows; i++) {
      const row = [];
      for (let j = 0; j < dimensions.columns; j++) {
        row.push(""); // Puedes reemplazar "1" con cualquier valor que desees
      }
      newMatrix.push(row);
    }
    setMatrix(newMatrix); 
  }, [lenghtX, lenghtY]);



  // Manejador de eventos para cambios en los inputs
  const handleInputChange = (e) => {
    const row = parseInt(e.target.dataset.row, 10);
    const column = parseInt(e.target.dataset.column, 10);
    const value = e.target.value;


    // Actualizar la matriz con el nuevo valor
    setMatrix((prevMatrix) =>
      prevMatrix.map((rowArr, i) =>
        rowArr.map((cell, j) => (i === row && j === column ? value : cell))
      )
    );
  };

  useEffect(() => {
    onMatrixChange(matrix);
  }, [matrix, onMatrixChange]);

  const renderMatrix = () => {
    const rows = [];
    for (let i = 0; i < dimensions.rows; i++) {
      const cells = [];
      for (let j = 0; j < dimensions.columns; j++) {
        cells.push(
          <td key={`${i}-${j}`} className="number-option">
            <input
              type="number"
              name={`cell-${i}-${j}`}
              data-row={i}
              data-column={j}
              value={matrix[i] ? matrix[i][j] : ""}
              onChange={handleInputChange}
              style={{
                width: dimensions.columns > "7" ? "35px" : "50px",
              }}
            />
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };

  return (
    <div className="animate-fade-in-up main-container">
      <h3>Matriz {props.var}</h3>
      <table className="matrix-container">
        <tbody>{renderMatrix()}</tbody>
      </table>
    </div>
  );
};

export default Matriz;
