import { useEffect, useState } from "react";
import "./App.css";
import Matriz from "./components/matriz";
import Dimensions from "./components/dimensions";
import { operarMatrices, verificarMatrices } from "./Logic/functions";
import ResultadoMatriz from "./components/ResultadoMatriz";
import InputVar from "./components/InputVar";
import Suma from "./components/suma";
import Resta from "./components/resta";
import Multiplicacion from "./components/multiplicacion";
import Transpuesta from "./components/transpuesta";
import ProductoK from "./components/ProductoK";
import Options from "./components/options";
import Handlebutton from "./components/handlebutton";
import Adjunta from "./components/Adjunta";
import Determinante from "./components/Determinante";

function App() {
  const [dimension, setDimension] = useState(0);
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [z, setz] = useState(0);
  const [k, setk] = useState(0);
  const [option, setOption] = useState("");
  const [matrixDataA, setMatrixDataA] = useState([]);
  const [matrixDataB, setMatrixDataB] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [resultadoNum, setresultadoNum] = useState(0);
  const [state, setState] = useState(true);

  // Callback para recibir la matriz del componente hijo
  const handleMatrixAChange = (updatedMatrix) => {
    setMatrixDataA(updatedMatrix);
  };

  const handleMatrixBChange = (updatedMatrix) => {
    setMatrixDataB(updatedMatrix);
  };

  useEffect(() => {
    let allFilled = true;

    let matriz1Filled = verificarMatrices(matrixDataA);
    let matriz2Filled = verificarMatrices(matrixDataB);

    if (
      option === "k" ||
      option === "T" ||
      option === "Adj" ||
      option === "Det"
    ) {
      matriz2Filled = true;
    }

    if (matriz1Filled && matriz2Filled) {
      allFilled = false;
    }

    setState(allFilled);
  }, [matrixDataA, matrixDataB]);

  const handleCalculate = () => {
    const resultado = operarMatrices(matrixDataA, matrixDataB, option, k);
    if (option === "Det") {
      setresultadoNum(resultado);
    } else {
      setResultado(resultado);
    }
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
        <Options setOption={setOption} setState={setState} />

        {option != "*" && (
          <select
            onChange={(e) =>
              setDimension(
                parseInt(e.target.value),
                setMatrixDataA([]),
                setMatrixDataB([]),
                setState(true)
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
        <div>
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

          <Multiplicacion
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
            dimensionsB={dimensionsB}
            handleMatrixBChange={handleMatrixBChange}
          />
        </div>
      )}

      <section className="matrices animate-fade-in">
        {option === "+" ? (
          <Suma
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
            dimensionsB={dimensionsB}
            handleMatrixBChange={handleMatrixBChange}
          />
        ) : option === "-" ? (
          <Resta
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
            dimensionsB={dimensionsB}
            handleMatrixBChange={handleMatrixBChange}
          />
        ) : option === "T" ? (
          <Transpuesta
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
          />
        ) : option === "k" ? (
          <ProductoK
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
            setk={setk}
          />
        ) : option === "Adj" ? (
          <Adjunta
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
          />
        ) : option === "Det" ? (
          <Determinante
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
          />
        ) : (
          <></>
        )}
      </section>

      <Handlebutton
        handle={handleCalculate}
        content={"Calcular resultado"}
        state={state}
      />

      <ResultadoMatriz resultado={resultado} />

      {option === "Det" && <h2>Resultado: {resultadoNum}</h2>}

      <footer className="footer animate-blurred-fade-in">
        <strong className="text-black">Hecho por Jonatan {state}</strong>
      </footer>
    </div>
  );
}

export default App;
