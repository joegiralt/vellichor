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
  array.push(l);
  doubleEndedQueue.push(l)
}

suite
  .add("denque.removeOne", () => {
    const a = denque.removeOne(5);
    const b = denque.removeOne(50);
    const c = denque.removeOne(500);
    denque.push(a);
    denque.push(b);
    denque.push(c);
  })
  .add("vellichor-doubleEndedQueue.removeOne", () => {
    const a = doubleEndedQueue.removeOne(5);
    const b = doubleEndedQueue.removeOne(50);
    const c = doubleEndedQueue.removeOne(500);
    doubleEndedQueue.push(a);
    doubleEndedQueue.push(b);
    doubleEndedQueue.push(c);
  })
  .add("native array splice", () => {
    const a = array.splice(5, 1)[0];
    const b = array.splice(50, 1)[0];
    const c = array.splice(500, 1)[0];
    array.push(a);
    array.push(b);
    array.push(c);
  })
  .on("cycle", ({ target }) => {
    console.log(`${target}`);
  })
  .run();
