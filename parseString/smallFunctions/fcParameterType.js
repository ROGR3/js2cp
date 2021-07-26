const deleteFunctions = require('./deleteFunctions.js');
const getAllVars = require('./getAllVars.js');
const getSingleType = require('./singleType.js');
function fcParameterType(string, res) {
  let noFunctions = deleteFunctions(string);
  let allVars = getAllVars(string);
  if (res) {
    let hasFunctionArr = [];
    let functionNames = res.join().match(/(?<=function ).+\(/g);
    let typesArr = [];
    for (let i = 0; i < functionNames.length; ++i) {
      functionNames[i] = functionNames[i].replace(/\(/g, '');
      hasFunctionArr.push(noFunctions.includes(functionNames[i]));
      const regex = new RegExp(`(?<=${functionNames[i]}).+`);

      if (noFunctions.match(regex)) {
        if (
          (noFunctions.match(regex).join()[1] == 't' &&
            noFunctions.match(regex).join()[2] == 'r' &&
            noFunctions.match(regex).join()[3] == 'u' &&
            noFunctions.match(regex).join()[4] == 'e') ||
          (noFunctions.match(regex).join()[1] == 'f' &&
            noFunctions.match(regex).join()[2] == 'a' &&
            noFunctions.match(regex).join()[3] == 'l' &&
            noFunctions.match(regex).join()[4] == 's' &&
            noFunctions.match(regex).join()[5] == 'e')
        ) {
          typesArr.push('bool');
        } else if (!isNaN(noFunctions.match(regex).join().replace('-', '')[1])) {
          typesArr.push('int');
        } else {
          for (let j = 0; j < allVars.length; ++j) {
            for (let k = 0; k < allVars[j].length; ++k) {
              let counter = 0;
              if (allVars[j][k] == noFunctions.match(regex).join()[k + 1]) {
                counter++;
              }
              if (counter == allVars[j].length) {
                typesArr.push(getSingleType(string, allVars[j]));
              }
            }
          }
          typesArr.push('string');
        }
      } else {
        typesArr.push('not said');
      }
    }

    for (let i = 0; i < hasFunctionArr.length; ++i) {
      if (hasFunctionArr[i]) {
        const regex = new RegExp(`(?<=${functionNames[i]}).+\{`);
        let parameter = res[i].match(regex).join().replace('(', '').replace(')', '').replace('{', '').replace(' ', '');
        res[i] = res[i].replace(parameter, typesArr[i] + ' ' + parameter);
      } else {
        res[i] =
          'slash* UNUSED FUNCTION \n(If you want to use just add data type before parameter) \n' + res[i] + '*slash';
      }
    }
    return res;
  }
  return res;
}

module.exports = fcParameterType;
