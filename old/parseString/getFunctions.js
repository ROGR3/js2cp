const both = require('./both.js');
const deleteFunctions = require('./smallFunctions/deleteFunctions.js');
const functionReturn = require('./smallFunctions/functionReturn.js');
const getFunctionParameterTypes = require('./smallFunctions/fcParameterType.js');
const replaceBrackets = require('./smallFunctions/replaceBrackets.js');

function getFunctions(string) {
  let midRes = replaceBrackets(string);
  let res = midRes.match(/function((?:.|[\r\n])*?)}/gm);
  if (!res) return '';
  res = getFunctionParameterTypes(string, res);
  res = functionReturn(res);
  res = res.replace(/left/g, '{').replace(/right/g, '}');
  res = both(res);
  res = res.replace(/slash/g, '/');
  return res;
}

module.exports = getFunctions;
