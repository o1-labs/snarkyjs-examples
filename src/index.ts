import { CircuitValue, Field, prop, Signature, Scalar, PrivateKey } from "@o1labs/snarkyjs-web";
import * as Ex00 from "./ex00_preimage";
import * as Ex01 from "./ex01_small_preimage";
import * as Ex02 from "./ex02_root";
import * as Ex03 from "./ex03_matrix";
import * as Ex04 from "./ex04_signed_message";
import * as Api from './api_exploration';
import * as Exchange from './exchange';

Api.test();

Ex00.test();

/*
Exchange.test();
[Ex00, Ex01, Ex02, Ex03, Ex04].forEach((x, i) => {
  console.log(`testing exercise ${i}`);
  x.test()
});
*/
document.body.appendChild(
  document.createTextNode('Tests completed!')
);
