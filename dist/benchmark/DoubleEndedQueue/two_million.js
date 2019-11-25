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
print_1.default();
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
//# sourceMappingURL=two_million.js.map