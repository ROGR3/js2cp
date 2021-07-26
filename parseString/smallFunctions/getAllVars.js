function getAllVars(string) {
  if (string.match(/(?<= = ).+?\s/g)) {
    let vars = string
      .match(/(?<=let ).+?\s/g)
      .toString()
      .replace(/\r|;| /g, '')
      .split(',');
    return vars;
  }
  return '';
}

module.exports = getAllVars;
