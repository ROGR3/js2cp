const replaceBrackets = require('./replaceBrackets.js');
function deleteFunctions(string) {
  if (string.match('function')) {
    let midRes = replaceBrackets(string);
    let res = midRes.replace(/function((?:.|[\r\n])*?)}/gm, '');
    return res;
  }
  return string;
}

module.exports = deleteFunctions;
