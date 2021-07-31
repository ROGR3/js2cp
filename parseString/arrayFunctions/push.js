function push(string) {
  if (string.match(/.push|.unshift/g)) {
    let res = string.replace(/.push|.unshift/g, '.push_back');
    return res;
  }
  return string;
}

module.exports = push;
