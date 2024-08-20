'use client'

import { FormEvent, useState } from "react";

export default function Home() {
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [result, setResult] = useState<number[][]>([]);
  const [generated, setGenerated] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [numRows, setNumRows] = useState(4);
  const [numColumns, setNumColumns] = useState(4);

  const addMatrices = () => {
    const result = matrixA.map((row, i) =>
      row.map((val, j) => val + matrixB[i][j])
    );
    setResult(result);
    setCalculated(true);
  };

  const subtractMatrices = () => {
    const result = matrixA.map((row, i) =>
      row.map((val, j) => val - matrixB[i][j])
    );
    setResult(result);
    setCalculated(true);
  };

  const multiplyMatrices = () => {
    const result = matrixA.map((row, i) =>
      row.map((val, j) => val * matrixB[i][j])
    );
    setResult(result);
    setCalculated(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    matrix: number[][],
    setMatrix: React.Dispatch<React.SetStateAction<number[][]>>,
    row: number,
    col: number
  ) => {
    const newMatrix = matrix.map((r, i) =>
      r.map((val, j) => (i === row && j === col ? Number(e.target.value) : val))
    );
    setMatrix(newMatrix);
  };

  const haandleGenerateMatrix = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Generating matrix");
    // generate matrix A
    const matrixA = Array.from({ length: numRows }, (_,i) => Array.from({ length: numColumns }, (_, j) => i+j))
    setMatrixA(matrixA);
    // generate matrix B
    const matrixB = Array.from({ length: numRows }, (_,i) => Array.from({ length: numColumns }, (_, j) => i*j))
    setMatrixB(matrixB);
    setGenerated(true);
  }
  return (
    <main className="flex min-h-screen flex-col items-center">
      <form method="POST" action="" onSubmit={haandleGenerateMatrix} className="flex md:flex-row flex-col gap-4">
        <div className="flex flex-col justify-center">
          <label htmlFor="rows" className="text-lg font-semibold">
            Rows
          </label>
          <input
            type="number"
            id="rows"
            name="rows"
            value={numRows}
            onChange={(e) => setNumRows(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md md:w-20 p-2"
          />
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="columns" className="text-lg font-semibold">
            Columns
          </label>
          <input
            type="number"
            id="columns"
            name="columns"
            value={numColumns}
            onChange={(e) => setNumColumns(parseInt(e.target.value))}
            className="border border-gray-300 md:w-20 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4  py-2 rounded-md mt-4"
        >
          Generate Matrix
        </button>
      </form>
      <hr />
      
      {generated && <div className="flex md:flex-row flex-col gap-4">
        {/* // addition matrix input */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Matrix A</h2>
          <div className="flex">
            <div className="flex flex-col gap-4 items-center">
              {matrixA.map((row, i) => (
                <div key={i} className="flex flex-col gap-4 items-center">
                  <div>
                    {row.map((col, j) => (
                      <input
                        type="number"
                        key={j}
                        onChange={(e) => handleInputChange(e, matrixA, setMatrixA, i, j)}
                        className="border w-16 border-gray-300 rounded-md p-2"
                        value={col}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multiply matrix */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Matrix B</h2>
          <div className="flex">
            <div className="flex flex-col gap-4 items-center">
              {matrixB.map((row, i) => (
                <div key={i} className="flex flex-col gap-4 items-center">
                  <div>
                    {row.map((col, j) => (
                      <input
                        type="number"
                        key={j}
                        onChange={(e) => handleInputChange(e, matrixB, setMatrixB, i, j)}
                        className="border w-16 border-gray-300 rounded-md p-2"
                        value={col}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </div>
        </div>

        <hr />


      </div>}

      {generated && <div className="flex gap-4 px-8">
        <hr />
          <button
            onClick={addMatrices}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Add
          </button>
          <button
            onClick={subtractMatrices}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Subtract
          </button>
          <button
            onClick={multiplyMatrices}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Multiply
          </button>
        </div>}

      {calculated && <div className="flex mt-8 gap-4">
        {/* Result matrix */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold">Result</h2>
          <div className="flex">
            <div className="flex flex-col gap-4 items-center">
              {result.map((row, i) => (
                <div key={i} className="flex flex-col gap-4 items-center">
                  <div className="flex">
                    {row.map((col, j) => (
                      <div
                        key={j}
                        className="border text-center w-16 border-gray-300 rounded-md p-2"
                      > {col}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>}

    </main>
  );
}
