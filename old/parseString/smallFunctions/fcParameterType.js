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

      if (noFunctions.match(regex) && !noFunctions.match(regex).join('').includes(',')) {
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
        } else if (noFunctions.match(regex).join().includes('.')) {
          typesArr.push('float');
        } else if (!isNaN(noFunctions.match(regex).join().replace('-', '')[1])) {
          typesArr.push('int');
        } else if (noFunctions.match(regex).join()[1] == '"' && noFunctions.match(regex).join()[3] != '"') {
          typesArr.push('string');
        } else if (noFunctions.match(regex).join()[1] == '"' && noFunctions.match(regex).join()[3] == '"') {
          typesArr.push('char');
        } else {
          for (let j = 0; j < allVars.length; ++j) {
            let counter = 0;
            for (let k = 0; k < allVars[j].length; ++k) {
              if (allVars[j][k] == noFunctions.match(regex).join()[k + 1]) {
                counter++;
              }

              if (counter == allVars[j].length) {
                typesArr.push(getSingleType(string, allVars[j]));
              }
            }
          }
        }
      } else if (noFunctions.match(regex) && noFunctions.match(regex).join('').includes(',')) {
        let params = noFunctions.match(regex).join().split(',');
        for (let j = 0; j < params.length; ++j) {
          if (params[j]) {
            if (
              (params[j][1] == 't' && params[j][2] == 'r' && params[j][3] == 'u' && params[j][4] == 'e') ||
              (params[j][1] == 'f' &&
                params[j][2] == 'a' &&
                params[j][3] == 'l' &&
                params[j][4] == 's' &&
                params[j][5] == 'e')
            ) {
              typesArr.push('bool');
            } else if (params[j].includes('.') && !isNaN(params[j].replace('-', '')[1])) {
              typesArr.push('float');
            } else if (!isNaN(params[j].replace('-', '')[1])) {
              typesArr.push('int');
            } else if (params[j][1] == '"' && params[j][3] != '"') {
              typesArr.push('string');
            } else if (params[j][1] == '"' && params[j][3] == '"') {
              typesArr.push('char');
            } else {
              for (let k = 0; k < allVars.length; ++k) {
                let counter = 0;
                for (let l = 0; l < allVars[k].length; ++l) {
                  if (allVars[k][l] == params[j][l + 1]) {
                    counter++;
                  }
                  if (counter == allVars[k].length) {
                    typesArr.push(getSingleType(string, allVars[k]));
                  }
                }
              }
            }
          }
        }
      } else {
        typesArr.push('not said');
      }
    }
    let plusLength = 0;
    let isSecond = false;
    for (let i = 0; i < hasFunctionArr.length; ++i) {
      if (hasFunctionArr[i]) {
        const regex = new RegExp(`(?<=${functionNames[i]}).+\{`);
        let parameter = res[i].match(regex).join().replace('(', '').replace(')', '').replace('{', '').replace(' ', '');
        let parameter1 = res[i].match(regex).join().replace('(', '');
        if (res[i].includes(',')) {
          let params = parameter1.split(',');
          let mRes = '';
          if (isSecond) {
            for (let j = 0; j < params.length; ++j) {
              mRes += typesArr[i + plusLength - 1] + ' ' + params[j] + ',';
              plusLength++;
            }
          } else {
            for (let j = 0; j < params.length; ++j) {
              mRes += typesArr[i + plusLength] + ' ' + params[j] + ',';
              plusLength++;
            }
          }

          isSecond = true;
          res[i] = res[i].replace(parameter1, mRes.slice(0, -1));
        } else {
          res[i] = res[i].replace(parameter, typesArr[i + plusLength - 1] + ' ' + parameter);
        }
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
