function tripleEquals(string) {
  let res = string.replace(/===/g, '==');
  return res;
}

module.exports = tripleEquals;
