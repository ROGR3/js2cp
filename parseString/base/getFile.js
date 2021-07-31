const fs = require('fs');
const file = async (fileName) => {
  try {
    return fs.readFileSync(fileName, 'utf-8');
  } catch (er) {
    return [
      er
        .toString()
        .match(/(?<=open ').+\'/)
        .toString()
        .replace("'", ''),
    ];
  }
};
module.exports = file;
