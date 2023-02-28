function getRidOfMath(string) {
  string = string.replace(/Math./g, '');
  return string;
}

module.exports = getRidOfMath;
