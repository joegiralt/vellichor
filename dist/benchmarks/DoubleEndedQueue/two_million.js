"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./print");
const benchmark_1 = __importDefault(require("benchmark"));
const suite = new benchmark_1.default.Suite();
const DoubleEndedQueue_1 = __importDefault(require("../../src/containers/DoubleEndedQueue/DoubleEndedQueue"));
const __1 = __importDefault(require("../../"));
const denque = new __1.default();
const doubleEndedQueue = new DoubleEndedQueue_1.default();
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
    .add("double-ended-queue", () => {
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