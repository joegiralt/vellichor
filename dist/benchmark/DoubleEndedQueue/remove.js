"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const benchmark_1 = __importDefault(require("benchmark"));
const denque_1 = __importDefault(require("denque"));
const print_1 = __importDefault(require("./print"));
const DoubleEndedQueue_1 = __importDefault(require("../../src/containers/DoubleEndedQueue/DoubleEndedQueue"));
const suite = new benchmark_1.default.Suite();
const denque = new denque_1.default();
const doubleEndedQueue = new DoubleEndedQueue_1.default();
const array = [];
print_1.default();
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
//# sourceMappingURL=remove.js.map