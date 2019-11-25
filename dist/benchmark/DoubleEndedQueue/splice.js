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
//# sourceMappingURL=splice.js.map