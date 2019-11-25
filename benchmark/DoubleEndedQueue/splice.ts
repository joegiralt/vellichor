import Benchmark from "benchmark";
import Denque from "denque";
import Printer from "./print";

import DoubleEndedQueue from "../../src/containers/DoubleEndedQueue/DoubleEndedQueue";

const suite = new Benchmark.Suite();

const denque = new Denque();
const doubleEndedQueue = new DoubleEndedQueue();
const array = [];

Printer();
let l = 100000;
while (--l) {
  denque.push(l);
  doubleEndedQueue.push(l);
  array.push(l);
}

suite
  .add("denque.splice", () => {
    denque.splice(111, 1, 11, 12, 13, 14, 15, 16);
  })
  .add("vellichor-doubleEndedQueue.splice", () => {
    doubleEndedQueue.splice(111, 1, 11, 12, 13, 14, 15, 16);
  })
  .add("native array splice", () => {
    array.splice(111, 1, 11, 12, 13, 14, 15, 16);
  })
  .on("cycle", ({ target }) => {
    console.log(`${target}`);
  })
  .run();
