const fs = require('fs');
const path = require('path');
const getVersion = async () => {
  try {
    const dirPath = path.join(__dirname, '../../package.json');
    let res = fs.readFileSync(dirPath, 'utf-8');
    return JSON.parse(res).version;
  } catch (er) {
    console.log(er);
  }
};
module.exports = getVersion;
