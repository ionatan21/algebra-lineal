import React from "react";
import './matriz.css'
const ResultadoMatriz = ({ resultado }) => {
  if (!resultado || resultado.length === 0) {
    return <div className="no-result animate-fade-in-up">No hay resultado para mostrar</div>;
  }
  return (
    <div className="result-container animate-zoom-in">
      <h3>Resultado</h3>
      <table className="table-result ">
        <tbody>
          {resultado.map((fila, i) => (
            <tr key={i}>
              {fila.map((valor, j) => (
                <td key={`${i}-${j}`}>{valor}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultadoMatriz;