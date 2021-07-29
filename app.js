const fse = require('fs-extra');
const cppBase = require('./parseString/base/cppBase.js');
const getFunctionsFromString = require('./parseString/getFunctions.js');
const getBodyFromString = require('./parseString/getBody.js');
const getFile = require('./parseString/base/getFile.js');
const getIncludes = require('./parseString/includes.js');

async function write(i, f, b, resDir) {
  fse
    .outputFile(`${resDir}`, cppBase(i, f, b))
    .then(() => {
      console.log('The file was saved!');
    })
    .catch((err) => {
      console.error(err);
    });
}

exports.execute = async function (path) {
  try {
    const jsfileName = path.includes('.js') ? path : path + '.js';
    const cppfileName = path.includes('.js') ? path.replace('.js', '') + '.cpp' : path + '.cpp';
    const cppfilePath = cppfileName.includes('/')
      ? 'dist/' + cppfileName.split('/')[cppfileName.split('/').length - 1]
      : 'dist/' + cppfileName;
    let fileString = await getFile(jsfileName);
    let sFunctions = getFunctionsFromString(fileString);
    let sBody = getBodyFromString(fileString);
    let fileIncludes = getIncludes(fileString);
    await write(fileIncludes, sFunctions, sBody, cppfilePath);
  } catch (e) {
    console.log('e', e);
  }
};
