function changeTypes(string) {
  if (string.match(/(?<= = ).+?\s/g)) {
    let arrLength = [];
    let vars = string
      .match(/(?<= = ).+?\s/g)
      .toString()
      .replace(/\r|;| /g, '')
      .split(',');
    vars;
    let arrVars = string.match(/(?<= = ).+?\]/g);
    vars = vars.filter(function (ele) {
      return ele != '';
    });
    for (let i = 0; i < vars.length; ++i) {
      if (vars[i] == 'true' || vars[i] == 'false') {
        vars[i] = 'bool';
      } else if (/^\d+$/.test(vars[i])) {
        if (vars[i].length > 8) {
          vars[i] = 'long long int';
        } else {
          vars[i] = 'int';
        }
      } else if (/^\d+$/.test(vars[i].replace('.', ''))) {
        vars[i] = 'float';
      } else if (
        vars[i].startsWith('Math.ceil') ||
        vars[i].startsWith('Math.floor') ||
        vars[i].startsWith('Math.round')
      ) {
        vars[i] = 'int';
      } else if (vars[i].startsWith('Math.')) {
        vars[i] = 'float';
      } else if (vars[i].startsWith("'") && vars[i].length == 3) {
        vars[i] = 'char';
      } else if (vars[i].startsWith("'") || vars[i].startsWith('std::to_string')) {
        vars[i] = 'std::string';
      } else if (vars[i].startsWith('[')) {
        if (vars[i][1] == "'" && vars[i][3] == "'") {
          vars[i] = 'std::vector<char>';
        } else if (vars[i][1] == "'") {
          vars[i] = 'std::vector<std::string>';
        } else if (/^\d+$/.test(vars[i].replace(/]|,|\./, '').replace('[', '')) && vars[i].includes('.')) {
          vars[i] = 'std::vector<float>';
        } else if (/^\d+$/.test(vars[i].replace(/]|,|\./, '').replace('[', ''))) {
          vars[i] = 'std::vector<int>';
        }
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
    res = res.replace(/\[|]/g, function (match) {
      if (match == '[') return '{';
      return '}';
    });
    let arrOc = -1;

    res = res.replace(/arr/g, '');
    return res;
  }
  return string;
}

module.exports = changeTypes;
