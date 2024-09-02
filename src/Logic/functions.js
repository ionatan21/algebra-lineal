
// Función para sumar dos matrices
const sumaMatrices = (matriz1, matriz2) => {
  return matriz1.map((fila, i) =>
    fila.map((valor, j) => parseFloat(valor) + parseFloat(matriz2[i][j]))
  );
};

// Función para restar dos matrices
const restaMatrices = (matriz1, matriz2) => {
  return matriz1.map((fila, i) =>
    fila.map((valor, j) => parseFloat(valor) - parseFloat(matriz2[i][j]))
  );
};

// Función para multiplicar dos matrices
const multiplicaMatrices = (matriz1, matriz2) => {
  const rows1 = matriz1.length;
  const rows2 = matriz2.length;
  const cols1 = matriz1[0].length;
  const cols2 = matriz2[0].length;

  console.log(rows1, cols1, rows2, cols2);

  let resultado = Array.from({ length: rows1 }, () => Array(cols2).fill(0));

  if (cols1 === rows2) {
    for (let i = 0; i < rows1; i++) {
      for (let j = 0; j < cols2; j++) {
        for (let k = 0; k < cols1; k++) {
          resultado[i][j] +=
            parseFloat(matriz1[i][k]) * parseFloat(matriz2[k][j]);
        }
      }
    }
  }

  return resultado;
};

// Función para transponer una matriz
const transponerMatriz = (matriz) => {
  return matriz[0].map((_, colIndex) => matriz.map((row) => row[colIndex]));
};

// Función para calcular el determinante de una matriz 2x2
const determinante2x2 = (matriz) => {
  return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
};

// Función para calcular el determinante de una matriz n x n
const determinante = (matriz) => {
  if (matriz.length === 2) {
    return determinante2x2(matriz);
  }

  let det = 0;
  for (let i = 0; i < matriz[0].length; i++) {
    const subMatriz = matriz
      .slice(1)
      .map((row) => row.filter((_, colIndex) => colIndex !== i));
    det += (i % 2 === 0 ? 1 : -1) * matriz[0][i] * determinante(subMatriz);
  }
  return det;
};

// Función para obtener la matriz de cofactores
const cofactores = (matriz) => {
  return matriz.map((row, i) =>
    row.map((_, j) => {
      const subMatriz = matriz
        .filter((_, rowIndex) => rowIndex !== i)
        .map((r) => r.filter((_, colIndex) => colIndex !== j));
      return (i + j) % 2 === 0
        ? determinante(subMatriz)
        : -determinante(subMatriz);
    })
  );
};

// Función para calcular la adjunta de una matriz
const adjuntaMatriz = (matriz) => {
  const matrizCofactores = cofactores(matriz);
  return transponerMatriz(matrizCofactores);
};

const multplicarK = (matriz, k) => {
  return matriz.map((fila) => fila.map((valor) => valor * k));
};

// Función principal
const operarMatrices = (matriz1, matriz2, operacion, k) => {
  switch (operacion) {
    case "+":
      return sumaMatrices(matriz1, matriz2);
    case "-":
      return restaMatrices(matriz1, matriz2);
    case "*":
      return multiplicaMatrices(matriz1, matriz2);
    case "T":
      return transponerMatriz(matriz1);
    case "k":
      return multplicarK(matriz1, k);
    case "Adj":
      return adjuntaMatriz(matriz1);
    case "Det":
      return determinante(matriz1);
    default:
      throw new Error("Operación no válida");
  }
};

const verificarMatrices = (matriz) => {
  if (matriz.length === 0) return false;

  let allFilled = true;

  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[0].length; j++) {
      if (matriz[i][j].length === 0) {
        allFilled = false;
        break;
      }
    }
    if (!allFilled) break;
  }

  return allFilled;
};

export { operarMatrices, verificarMatrices };
