function toString(string) {
  if (string.match(/\s\w+\.toString\(\)/g)) {
    let mArr = string.match(/\s\w+\.toString\(\)/g);
    for (let i = 0; i < mArr.length; ++i) {
      mArr[i] = mArr[i].replace('.toString()', '').replace(' ', '');
    }
    let oc = -1;
    string = string.replace(/\s\w+\.toString\(\)/g, function (match) {
      oc++;
      return ` std::to_string(${mArr[oc]})`;
    });
    return string;
  }
  return string;
}

module.exports = toString;
