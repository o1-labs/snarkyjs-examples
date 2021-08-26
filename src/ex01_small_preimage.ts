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
    throw 'TODO';
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