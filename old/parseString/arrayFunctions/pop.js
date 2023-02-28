function pop(string) {
  if (string.match(/.pop|.shift/g)) {
    let res = string.replace(/.pop|.shift/g, '.pop_back');
    return res;
  }
  return string;
}

module.exports = pop;
