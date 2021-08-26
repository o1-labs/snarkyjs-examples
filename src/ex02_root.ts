import { Poseidon, Field, Circuit, circuitMain, public_ } from "@o1labs/snarkyjs-web";
import { time } from "./util";

/* Exercise 2:

Public input: a field element x
Prove:
  I know a value y that is a cube root of x.
*/

class Main extends Circuit {
  @circuitMain
  static main(y: Field, @public_ x: Field) {
    throw 'TODO';
  }
}

export function test() {
  const kp = Main.generateKeypair();

  const x = new Field(8);
  const y = new Field(2);
  const pi = time('ex02 proving time', () =>
    Main.prove([y], [x], kp));
  console.log('proof', pi);
}