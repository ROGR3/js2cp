function functionReturn(string) {
  let posArr = [];
  for (let i = 0; i < string.length; ++i) {
    let retStatement = 'void';
    if (string[i].match(/(?<= return ).+?\;/g)) {
      let rets = string[i]
        .match(/(?<= return ).+?\;/)
        .toString()
        .replace(/\r|;| /g, '')
        .split(',');
      if (
        rets[0] == 'true' ||
        rets[0] == 'false' ||
        rets[0].includes('>') ||
        rets[0].includes('<') ||
        rets[0].includes('==')
      ) {
        retStatement = 'bool';
      } else if (/^\d+$/.test(rets[0])) {
        retStatement = 'int';
      } else if (rets[0].length == 3) {
        retStatement = 'char';
      } else {
        retStatement = 'string';
      }
    }
    posArr.push(retStatement);
  }
  let oc = -1;
  let res = string.join('\n').replace(/function/g, function (match) {
    oc++;
    return posArr[oc];
  });

  return res;
}

module.exports = functionReturn;
