import { useEffect, useState } from "react";
import "./Calculadora.css";
import Dimensions from "../Metodos-calculadora/dimensions";
import {
  operarMatrices,
  verificarMatrices,
  inversaMatriz,
  determinante,
} from "../../Logic/functions";

import ResultadoMatriz from "../Metodos-calculadora/ResultadoMatriz";
import Suma from "../Metodos-calculadora/suma";
import Resta from "../Metodos-calculadora/resta";
import Multiplicacion from "../Metodos-calculadora/multiplicacion";
import Transpuesta from "../Metodos-calculadora/transpuesta";
import ProductoK from "../Metodos-calculadora/ProductoK";
import Options from "../Metodos-calculadora/options";
import Handlebutton from "../Metodos-calculadora/handlebutton";
import Adjunta from "../Metodos-calculadora/Adjunta";
import Determinante from "../Metodos-calculadora/Determinante";
import Inversa from "../Metodos-calculadora/Inversa";

function CalculadoraMatriz() {
  const [dimension, setDimension] = useState(0);
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [z, setz] = useState(0);
  const [k, setk] = useState(0);
  const [option, setOption] = useState("");
  const [matrixDataA, setMatrixDataA] = useState([]);
  const [matrixDataB, setMatrixDataB] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [resultadoNum, setresultadoNum] = useState("");
  const [state, setState] = useState(true);
  const [answer, setAnswer] = useState(false);

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
      option === "Det" ||
      option === "Inv"
    ) {
      matriz2Filled = true;
    }

    if (matriz1Filled && matriz2Filled) {
      allFilled = false;
    }

    setState(allFilled);
  }, [matrixDataA, matrixDataB]);

  const handleCalculate = () => {
    setAnswer(true);

    // Manejar operación de inversa
    if (option === "Inv") {
      calcularInversa(matrixDataA);
      return;
    }

    // Manejar otras operaciones
    calcularOperacion(matrixDataA, matrixDataB, option, k);
  };

  // Función auxiliar para calcular la inversa
  const calcularInversa = (matriz) => {
    const det = determinante(matriz);

    if (det === 0) {
      setresultadoNum("No se puede calcular la inversa de una determinante 0");
      return;
    }

    const resultado = inversaMatriz(matriz, det);
    setResultado(resultado);
    setresultadoNum("");
  };

  // Función auxiliar para otras operaciones
  const calcularOperacion = (matrizA, matrizB, opcion, k) => {
    try {
      const resultado = operarMatrices(matrizA, matrizB, opcion, k);

      if (opcion === "Det") {
        setresultadoNum(resultado); // Si es una operación que devuelve un número
      } else {
        setResultado(resultado); // Si devuelve una matriz
      }
    } catch (error) {
      setresultadoNum(`Error al calcular: ${error.message}`);
    }
  };

  let dimensionsA = { rows: dimension, columns: dimension };
  let dimensionsB = { rows: dimension, columns: dimension };

  if (option === "*") {
    dimensionsA = { rows: x, columns: y };
    dimensionsB = { rows: y, columns: z };
  }

  return (
    <div className="calc-container font-sans bg-transparen mt-24">
      <h1 className="animate-fade-in-down mt-3 title">Álgebra de Matrices</h1>

      <section className="user-options animate-fade-in-down">
        <Options
          setOption={setOption}
          setState={setState}
          setAnswer={setAnswer}
        />

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
            
          </section>

          <Multiplicacion
            dimensionsA={dimensionsA}
            handleMatrixAChange={handleMatrixAChange}
            dimensionsB={dimensionsB}
            handleMatrixBChange={handleMatrixBChange}
          />

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
        ) : option === "Inv" ? (
          <Inversa
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

      {option === "Det" && answer === true ? (
        <h2 className="det-answer">Resultado: {resultadoNum}</h2>
      ) : option === "Inv" &&
        answer === true &&
        resultadoNum ===
          "No se puede calcular la inversa de una determinante 0" ? (
        <h2 className="inv-error">{resultadoNum}</h2>
      ) : answer === true ? (
        <ResultadoMatriz resultado={resultado} />
      ) : (
        <></>
      )}

      <footer className="footer animate-blurred-fade-in">
        <strong className="text-black">Hecho por Jonatan {state}</strong>
      </footer>
    </div>
  );
}

export default CalculadoraMatriz;
