import { Field } from "@o1labs/snarkyjs-web";

/* Exercise 3:

Implement a function for matrix multiplication.
*/

type Matrix<A> = A[][];

/* Input: 
    m1: m x n matrix
    m2: n x k matrix
   Output: m x k matrix
*/
export function matMul(m1: Matrix<Field>, m2: Matrix<Field>): Matrix<Field> {
  throw 'TODO';
}

function checkMatrixEq(expected: Matrix<Field>, m: Matrix<Field>) {
  console.assert(m.length === expected.length);
  for (let i = 0; i < m.length; ++i) {
    console.assert(m[i].length === expected[i].length);
    for (let j = 0; j < m[i].length; ++j) {
      if (! m[i][j].equals(expected[i][j]).toBoolean()) {
        throw new Error(`result[${i}][${j}] == ${expected[i][j].toString()}, got ${m[i][j].toString()}`)
      }
    }
  }
}

export function test() {
  const mat = (m : Matrix<number>) => m.map(row => row.map(x => new Field(x)));
  const m1 = mat(
    [
      [1, 2, 3],
      [4, 5, 6]
    ]
  );
  const m2 = mat(
    [
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15]
    ]
  );
  const expectedResult = mat(
    [
      [ 66, 72, 78 ],
      [ 156, 171, 186 ]
    ]
  );
  checkMatrixEq(expectedResult, matMul(m1, m2));
}