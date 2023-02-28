const fse = require('fs-extra');
const cppBase = require('./parseString/base/cppBase.js');
const getFunctionsFromString = require('./parseString/getFunctions.js');
const getBodyFromString = require('./parseString/getBody.js');
const getFile = require('./parseString/base/getFile.js');
const getIncludes = require('./parseString/includes.js');
const colors = require('colors');
const logoFile = require('./parseString/base/logo.js');
const getVersion = require('./parseString/base/getVersion.js');

async function write(i, f, b, resDir) {
  fse
    .outputFile(`${resDir}`, cppBase(i, f, b))
    .then(() => {
      console.log(logoFile.white);
      console.log(`Sucessfully translated`.green);
      console.log(`> Your result: `, resDir.bold.cyan);
      console.log();
      console.log('> Thank you for using', 'JS2CP!'.bold.cyan);
      console.log('> Feel free to contact me', 'robingrundel@seznam.cz'.bold.cyan);
    })
    .catch((err) => {
      console.error(err);
    });
}

exports.execute = async function (path) {
  try {
    if (!path || path == '-help') {
      let appVersion = await getVersion();
      console.log(logoFile.white);
      console.log(`Welcome in JS2CP!`.green.bold);
      console.log();
      console.log(`VERSION`.bold.white);
      console.log(`>  ${appVersion}`);
      console.log();
      console.log(`USAGE`.bold.white);
      console.log(`>  js2cp <path to your file>`);
      console.log();
      console.log(`COMMANDS`.bold.white);
      console.log(`>  -help   Display help for JS2CP`);
      console.log(`>  -v      Display version of JS2CP`);
      //AD NEW COMMANDS
      return;
    }
    if (path == '-v') {
      let appVersion = await getVersion();
      console.log(`${appVersion}`);
      return;
    }
    const jsfileName = path.includes('.js') ? path : path + '.js';
    const cppfileName = path.includes('.js') ? path.replace('.js', '') + '.cpp' : path + '.cpp';
    const cppfilePath = cppfileName.includes('/')
      ? 'dist/' + cppfileName.split('/')[cppfileName.split('/').length - 1]
      : 'dist/' + cppfileName;
    let fileString = await getFile(jsfileName);

    if (typeof fileString == 'object') {
      console.log(logoFile.white);
      console.log(`Unsuccessfully translated`.red.bold);
      if (fileString[0].includes(':')) {
        console.log(`> Your result:`, `No such file or directory`.cyan, `${fileString[0]}`.bold.cyan);
      } else {
        console.log(`> Your result:`, `No such file or directory`.cyan, `./${fileString[0]}`.bold.cyan);
      }
      console.log(`> What to do: `, `Change the path to the file. You're probably misspelled!`.cyan);

      return;
    }
    let sFunctions = getFunctionsFromString(fileString);
    let sBody = getBodyFromString(fileString);
    let fileIncludes = getIncludes(fileString);
    await write(fileIncludes, sFunctions, sBody, cppfilePath);
  } catch (e) {
    console.log(logoFile.white);
    console.log(`Unsuccessfully translated`.red.bold);
    console.log(`> Your result:`, `This is propably not problem of the user, but problem of the software.`.cyan);
    console.log(`> What to do: `, `I don't know!`.cyan);
    console.log(`> How to help: `, `Please make sure you send this error to me.`.cyan);
    console.log(`>              `, `Just copy error below and send it on this mail robingrundel@seznam.cz`.cyan);
    console.log();
    console.log(e);
    console.log(`               `, `Thank you very much. You help`.cyan, `js2cp`.cyan.bold, `grow!`.cyan);
    return;
  }
};
