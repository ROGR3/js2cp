function replace(string) {
  let left = 0;
  let right = 0;
  return string.replace(/{|}/g, function (match) {
    if (match == '{') left++;
    if (match == '}') right++;
    if (left == right) {
      left = 0;
      right = 0;
      return '}';
    }
    if (left == 1) return '{';

    if (match == '{') return 'left';
    if (match == '}') return 'right';
  });
}

module.exports = replace;
