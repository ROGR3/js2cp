function changeForEach(string) {
  // if (string.match(/(?<=\.forEach\().+(?=\}\)\;)/gs)) {
  //   let choosed = string.match(/(?<=\.forEach\().+(?=\}\)\;)/gs);
  //   let vari = '';
  //   console.log('here');
  //   if (choosed[0][0] == '(') {
  //     vari = choosed[0].match(/(?<=\().+(?=\))/)[0];
  //   } else if (choosed[0][0] == 'f' && choosed[1] == 'u' && choosed[7] == '(') {
  //     vari = choosed[0].match(/(?<=function\().+(?=\))/)[0];
  //   } else if (choosed[0][0] == 'f' && choosed[1] == 'u' && choosed[8] == '(') {
  //     vari = choosed[0].match(/(?<=function \().+(?=\))/)[0];
  //   } else {
  //     vari = choosed[0].match(/.+=/)[0];
  //   }
  //   console.log(vari);
  // }
  return string;
}

module.exports = changeForEach;
