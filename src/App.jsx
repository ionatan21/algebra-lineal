import { useEffect, useState } from "react";
import "./App.css";
import Matriz from "./components/matriz";
import Dimensions from "./components/dimensions";
import { operarMatrices } from "./Logic/functions";
import ResultadoMatriz from "./components/ResultadoMatriz";

function App() {
  const [dimension, setDimension] = useState(0);
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [z, setz] = useState(0);
  const [option, setOption] = useState("");
  const [matrixDataA, setMatrixDataA] = useState([]);
  const [matrixDataB, setMatrixDataB] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [state, setState] = useState(false);

  // Callback para recibir la matriz del componente hijo
  const handleMatrixAChange = (updatedMatrix) => {
    setMatrixDataA(updatedMatrix);
  };

  const handleMatrixBChange = (updatedMatrix) => {
    setMatrixDataB(updatedMatrix);
  };

  useEffect(() => {
    let allFilled = true;

    // Verificar matrixDataA
    for (let i = 0; i < matrixDataA.length; i++) {
      for (let j = 0; j < matrixDataA[0].length; j++) {
        if (matrixDataA[i][j].length === 0) {
          allFilled = false;
          break;
        }
      }
      if (!allFilled) break;
    }

    // Verificar matrixDataB
    if (allFilled) {
      for (let i = 0; i < matrixDataB.length; i++) {
        for (let j = 0; j < matrixDataB[0].length; j++) {
          if (matrixDataB[i][j].length === 0) {
            allFilled = false;
            break;
          }
        }
        if (!allFilled) break;
      }
    }

    setState(allFilled);
  }, [matrixDataA, matrixDataB]);

  const handleCalculate = () => {
    const resultado = operarMatrices(matrixDataA, matrixDataB, option);
    setResultado(resultado);
  };

  let dimensionsA = { rows: dimension, columns: dimension };
  let dimensionsB = { rows: dimension, columns: dimension };

  if (option === "*") {
    dimensionsA = { rows: x, columns: y };
    dimensionsB = { rows: y, columns: z };
  }

  return (
    <div className="font-sans">
      <h1 className="animate-fade-in-down mt-3 title">Álgebra de Matrices</h1>

      <section className="user-options animate-fade-in-down">
        <select
          name="options"
          id="options"
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="" disabled selected>
            Seleccione una opción
          </option>
          <option value="+">Suma</option>
          <option value="-">Resta</option>
          <option value="*">Multiplicación</option>
          <option value="T">Transpuesta</option>
        </select>

        {option != "*" && (
          <select
            onChange={(e) =>
              setDimension(
                parseInt(e.target.value),
                setMatrixDataA([]),
                setMatrixDataB([])
              )
            }
            name="dimension"
            id="dimension"
          >
            <option value="" disabled selected>
              Seleccione una opción
            </option>
            <option value="2">2x2</option>
            <option value="3">3x3</option>
            <option value="4">4x4</option>
            <option value="5">5x5</option>
            <option value="6">6x6</option>
            <option value="7">7x7</option>
            <option value="8">8x8</option>
            <option value="9">9x9</option>
          </select>
        )}
      </section>
      {option === "*" && (
        <section className="dimensions-container mb-3">
          <div className="flex flex-col animate-fade-in-up">
            <h2>Dimensión matriz A</h2>
            <Dimensions
              changex={(e) => setx(e.target.value)}
              changey={(e) => sety(e.target.value)}
            />
          </div>

          <div className="flex flex-col animate-fade-in-up">
            <h2>Dimensión matriz B</h2>
            <Dimensions
              y={y}
              disabled={true}
              changez={(e) => setz(e.target.value)}
            />
          </div>
        </section>
      )}
      <section className="matrices animate-fade-in">
        <Matriz
          dimensions={dimensionsA}
          onMatrixChange={handleMatrixAChange}
          var={"A"}
        />
        {option != "T" && (
          <div className="option-container">
            <h1 className="option-selected animate-fade-in">{option}</h1>
          </div>
        )}
        {option != "T" && (
          <Matriz
            dimensions={dimensionsB}
            onMatrixChange={handleMatrixBChange}
            var={"B"}
          />
        )}
      </section>

      <button
        className="calculatate-button animate-fade-in-up"
        onClick={handleCalculate}
        disabled={!state}
      >
        Calcular resultado
      </button>

      <ResultadoMatriz resultado={resultado} />

      <footer className="footer animate-blurred-fade-in">
        <strong className="text-black">Hecho por Jonatan {state}</strong>
      </footer>
    </div>
  );
}

export default App;
