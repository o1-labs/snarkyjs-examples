import { Poseidon, Field, Circuit, circuitMain, public_ } from "@o1labs/snarkyjs-web";
import { time } from "./util";

/* Exercise 0:

Public input: a hash value h
Prove:
  I know a value x such that hash(x) = h 
*/

class Main extends Circuit {
  @circuitMain
  static main(preimage: Field, @public_ hash: Field) {
    Poseidon.hash([preimage]).assertEquals(hash);
  }
}

export function test() {
  const kp = Main.generateKeypair();

  const preimage = Field.random();
  const hash = Poseidon.hash([preimage]);

  const pi = time('ex00 proving time', () =>
    Main.prove([preimage], [hash], kp));

  console.assert(
    pi.verify(kp.verificationKey(), [hash]));

  console.log('proof verified!');
}