function handleQuotes(string) {
  string = string.replace(/'/g, /"/).replace(/\//g, '');
  if (string.match(/(?<=char ).+/g)) {
    let lines = string.match(/(?<=char ).+/g);
    for (let i = 0; i < lines.length; ++i) {
      lines[i] = lines[i].replace(/"/g, /'/);
    }
    let oc = -1;
    let res = string.replace(/(?<=char ).+/g, function (match) {
      oc++;
      return lines[oc];
    });
    res = res.replace(/\//g, '');
    return res;
  }
  return string;
}

module.exports = handleQuotes;
