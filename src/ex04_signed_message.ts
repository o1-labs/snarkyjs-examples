import { Field, Circuit, circuitMain, CircuitValue, PrivateKey, prop, PublicKey, public_, Signature } from "@o1labs/snarkyjs-web";import { time } from "./util";
;

class Transaction extends CircuitValue {
  @prop sender: PublicKey
  @prop receiver: PublicKey
  @prop amount: Field

  constructor(sender: PublicKey, receiver: PublicKey, amount: Field) {
    super();
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
  }
}

/* Exercise 4:

Public input: a field element `lowerBound`
Prove:
  I know a signed transaction, sent to a public key that I control, for an amount > x.
*/

class Main extends Circuit {
  @circuitMain
  static main(
    transaction: Transaction,
    s: Signature,
    receiverPrivKey: PrivateKey,
    @public_ lowerBound: Field)
  {
    s.verify(transaction.sender, transaction.toFieldElements()).assertEquals(true);
    transaction.receiver.assertEquals(
      receiverPrivKey.toPublicKey());
    transaction.amount.assertGt(lowerBound);
  }
}

export function test() {
  const kp = Main.generateKeypair();

  const receiverPrivKey = PrivateKey.random();
  const senderPrivKey = PrivateKey.random();
  const transaction = new Transaction(senderPrivKey.toPublicKey(), receiverPrivKey.toPublicKey(), new Field(1234));
  const sig = Signature.create(senderPrivKey, transaction.toFieldElements());

  console.assert(
    sig.verify(
      transaction.sender,
      transaction.toFieldElements()
    ).toBoolean()
  );

  const lowerBound = new Field(500); 

  const pi = time('ex04 proving time', () =>
    Main.prove([transaction, sig, receiverPrivKey], [lowerBound], kp));
  console.log('proof', pi);
}