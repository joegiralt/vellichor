"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const v8 = process.versions.v8;
const node = process.versions.node;
const plat = `${os_1.default.type()} ${os_1.default.release()} ${os_1.default.arch()}\nNode.JS ${node}\nV8 ${v8}`;
const Printer = () => {
    console.log("Platform info:");
    let cpus = os_1.default
        .cpus()
        .map(({ model }) => model)
        .reduce((o, model) => {
        if (!o[model]) {
            o[model] = 0;
        }
        o[model]++;
        return o;
    }, {});
    cpus = Object.keys(cpus)
        .map(key => `${key} \u00d7 ${cpus[key]}`)
        .join("\n");
    console.log(`${plat}\n${cpus}\n`);
};
exports.default = Printer;
//# sourceMappingURL=print.js.map