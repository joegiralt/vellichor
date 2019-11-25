import Benchmark from "benchmark";
import Denque from "denque";
import Printer from "./print";

import DoubleEndedQueue from "../../src/containers/DoubleEndedQueue/DoubleEndedQueue";

const suite = new Benchmark.Suite();
const denque = new Denque();
const doubleEndedQueue = new DoubleEndedQueue();

Printer();

let l = 2000000;

while (--l) {
  denque.push(l);
  doubleEndedQueue.push(l);
}

suite
  .add("denque", () => {
    const a = denque.shift();
    const b = denque.shift();
    const c = denque.shift();

    denque.push(a);
    denque.push(b);
    denque.push(c);
  })
  .add("vellichor-double-ended-queue", () => {
    const a = doubleEndedQueue.shift();
    const b = doubleEndedQueue.shift();
    const c = doubleEndedQueue.shift();

    doubleEndedQueue.push(a);
    doubleEndedQueue.push(b);
    doubleEndedQueue.push(c);
  })
  .on("cycle", ({ target }) => {
    console.log(`${target}`);
  })
  .run();
