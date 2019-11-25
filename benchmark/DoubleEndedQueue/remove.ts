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
  .add("denque.remove", () => {
    denque.remove(111, 10);
    denque.push(11);
    denque.push(11);
    denque.push(11);
    denque.push(11);
    denque.push(11);
    denque.push(11);
    denque.push(11);
    denque.push(11);
    denque.push(11);
    denque.push(11);
  })
  .add("vellichor-doubleEndedQueue.remove", () => {
    doubleEndedQueue.remove(111, 10);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
    doubleEndedQueue.push(11);
  })
  .add("native array splice", () => {
    array.splice(111, 10);
    array.push(11);
    array.push(11);
    array.push(11);
    array.push(11);
    array.push(11);
    array.push(11);
    array.push(11);
    array.push(11);
    array.push(11);
    array.push(11);
  })
  .on("cycle", ({ target }) => {
    console.log(`${target}`);
  })
  .run();
