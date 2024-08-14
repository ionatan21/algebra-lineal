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

// Función principal
const operarMatrices = (matriz1, matriz2, operacion) => {
  switch (operacion) {
    case "+":
      return sumaMatrices(matriz1, matriz2);
    case "-":
      return restaMatrices(matriz1, matriz2);
    case "*":
      return multiplicaMatrices(matriz1, matriz2);
    case "T":
      return transponerMatriz(matriz1);
    default:
      throw new Error("Operación no válida");
  }
};

export { operarMatrices };
