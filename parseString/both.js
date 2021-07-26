const changeTypes = require('./smallFunctions/types.js');
const changeConsole = require('./smallFunctions/console.js');
const changeTripleEqual = require('./smallFunctions/tripleEqual.js');
const handleQuotes = require('./smallFunctions/hadlequotes.js');

function getAll(string) {
  let res = changeTypes(string);
  res = changeConsole(res);
  res = changeTripleEqual(res);
  res = handleQuotes(res);
  return res;
}

module.exports = getAll;
