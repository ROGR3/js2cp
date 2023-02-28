const changeTypes = require('./smallFunctions/types.js');
const changeConsole = require('./smallFunctions/console.js');
const changeTripleEqual = require('./smallFunctions/tripleEqual.js');
const handleQuotes = require('./smallFunctions/hadlequotes.js');
const toString = require('./stringFunctions/toString.js');
const getRidOfMath = require('./math/removeMath.js');
const fixMathRandom = require('./math/random.js');
const pop = require('./arrayFunctions/pop.js');
const push = require('./arrayFunctions/push.js');
const changeLength = require('./arrayFunctions/length.js');
const changeForEach = require('./arrayFunctions/forEach.js');

function getAll(string) {
  let res = toString(string);
  res = changeTypes(res);
  res = changeConsole(res);
  res = changeTripleEqual(res);
  res = changeForEach(res);
  res = handleQuotes(res);
  res = fixMathRandom(res);
  res = pop(res);
  res = push(res);
  res = changeLength(res);
  res = getRidOfMath(res);
  return res;
}

module.exports = getAll;
