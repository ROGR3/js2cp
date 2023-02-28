const acorn = require('acorn');
const fs = require("fs")
let { generateWholeCode } = require("./lib/index.js")

function translate(_path) {
  const code = fs.readFileSync(_path, "utf-8")
  const ast = acorn.parse(code);
  const res = generateWholeCode(ast)
  fs.writeFileSync(_path.replace(".js", ".cpp"), res)
}

module.exports = { translate }