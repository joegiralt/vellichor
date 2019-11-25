import os from "os";
const v8 = process.versions.v8;
const node = process.versions.node;
const plat = `${os.type()} ${os.release()} ${os.arch()}\nNode.JS ${node}\nV8 ${v8}`;

const Printer = () => {
  console.log("Platform info:");
  let cpus = os
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
export default Printer;
