function changeLength(string) {
  if (string.match(/.length/g)) {
    let res = string.replace(/.length/g, '.size()');
    return res;
  }
  return string;
}

module.exports = changeLength;
