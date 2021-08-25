import { Poseidon, Field, Circuit, circuitMain, public_ } from "@o1labs/snarkyjs-web";
import { time } from "./util";
/* Exercise 1:

Public input: a hash value h
Prove:
  I know a value x < 2^32 such that hash(x) = h 
*/

class Main extends Circuit {
  @circuitMain
  static main(preimage: Field, @public_ hash: Field) {
    preimage.toBits(32);
    Poseidon.hash([preimage]).assertEquals(hash);
  }
}

class Main2 extends Circuit {
  @circuitMain
  static main(solution: Field[][], instance: Field[][]) {
    for (let i = 0; i < solution.length; ++i) {
      for (let j = 0; j < solution[0].length; ++j) {
        solution[i][j].equals(instance[i][j]).or(
          instance[i][j].equals(0)
        ).assertEquals(true);
        // add assertTrue and assertFalse and assert()
      }
    }

    for (let colIdx = 0; colIdx < solution[0].length; ++colIdx) {
      for (let i = 1; i <= 9; ++i) {
        let col = solution.map(row => row[colIdx]);
        col.map(j => j.equals(i))
        .reduce((x, y) => x.or(y))
        .assertEquals(true);
        // Bool.any?
      }
    }
  }
}

export function test() {
  const kp = Main.generateKeypair();

  const preimage = Field.ofBits(Field.random().toBits().slice(0, 32));
  const hash = Poseidon.hash([preimage]);
  const pi = time('ex01 proving time', () => 
    Main.prove([preimage], [hash], kp));

  console.assert(pi.verify(kp.verificationKey(), [hash]));

  console.log('proof', pi);
}