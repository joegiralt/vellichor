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
    array.push(l);
    doubleEndedQueue.push(l);
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
//# sourceMappingURL=removeOne.js.map