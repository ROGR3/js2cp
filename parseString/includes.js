function includes(string) {
  let res = '';
  if (string.includes('console.')) {
    res += '#include <iostream> \n';
  }

  if (string.includes('Math')) {
    res += '#include <cmath> \n';
  }

  if (string.includes('random')) {
    res += '#include <cstdlib> \n';
  }

  if (string.includes('[') && string.includes(']')) {
    res += '#include <vector> \n';
  }

  if (string.includes('"') || string.includes("'")) {
    res += '#include <string> \n';
  }
  return res;
}

module.exports = includes;
