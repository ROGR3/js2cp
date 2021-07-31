function changeTypes(string, exact) {
  const regex = new RegExp(`(?<=let ${exact} = ).+\;|(?<=var ${exact} = ).+\;|(?<=const ${exact} = ).+\;`);
  let vars = string.match(regex).join('-').replace(';', '').split('-');
  for (let i = 0; i < vars.length; ++i) {
    if (vars[i] == 'true' || vars[i] == 'false') {
      vars[i] = 'bool';
    } else if (vars[i].includes('.')) {
      vars[i] = 'float';
    } else if (/^\d+$/.test(vars[i])) {
      if (vars[i].length > 8) {
        vars[i] = 'long long int';
      } else {
        vars[i] = 'int';
      }
    } else if (vars[i].length == 3) {
      vars[i] = 'char';
    } else {
      vars[i] = 'std::string';
    }
  }
  return vars[0];
}

module.exports = changeTypes;
