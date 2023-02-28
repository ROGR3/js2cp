function changeConsole(string) {
  if (string.match(/(?<=console.log).+\;|(?<=console.error).+\;/g)) {
    let consoleContent = string.match(/(?<=console.log).+\;|(?<=console.error).+\;/g);
    let midRes = string.match(/(?<=console.log).+\;|(?<=console.error).+\;/g);
    for (let i = 0; i < midRes.length; ++i) {
      consoleContent[i] = consoleContent[i].replace('(', '').replace(');', '');
      midRes[i] = 'std::cout <<' + consoleContent[i] + '<< std::endl;';
    }
    let oc = -1;
    let res = string.replace(/(?=console.log).+\;|(?=console.error).+\;/g, function (match) {
      oc++;
      return midRes[oc];
    });
    return res;
  }
  return string;
}

module.exports = changeConsole;
