function changeTypes(string) {
  if (string.match(/(?<= = ).+?\s/g)) {
    let vars = string
      .match(/(?<= = ).+?\s/g)
      .toString()
      .replace(/\r|;| /g, '')
      .split(',');
    for (let i = 0; i < vars.length; ++i) {
      if (vars[i] == 'true' || vars[i] == 'false') {
        vars[i] = 'bool';
      } else if (/^\d+$/.test(vars[i])) {
        if (vars[i].length > 8) {
          vars[i] = 'long long int';
        } else {
          vars[i] = 'int';
        }
      } else if (vars[i].length == 3) {
        vars[i] = 'char';
      } else {
        vars[i] = 'string';
      }
    }

    let oc = -1;
    let res = string.replace(/let|var|const/g, function (match) {
      oc++;
      if (vars[oc]) {
        return vars[oc];
      } else {
        return 'slashslash Unused variable';
      }
    });

    return res;
  }
  return string;
}

module.exports = changeTypes;
