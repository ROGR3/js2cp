const both = require('./both.js');
const deleteFunctions = require('./smallFunctions/deleteFunctions.js');

function getBody(string) {
  let res = both(string);
  res = deleteFunctions(res);
  res = res.replace(/left/g, '{').replace(/right/g, '}');
  res = res.replace(/slash/g, '/');
  return res;
}

module.exports = getBody;
