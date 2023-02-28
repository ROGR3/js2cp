function fixMathRandom(string) {
  if (string.match(/random().+/g)) {
    let midRes = string.match(/random().+/g);
    for (let i = 0; i < midRes.length; ++i) {
      midRes[i] = midRes[i].replace('*', '%').replace('random', 'rand');
    }
    let oc = -1;
    string = string.replace(/random().+/g, function (match) {
      oc++;
      return midRes[oc];
    });
    return string;
  }
  return string;
}

module.exports = fixMathRandom;
