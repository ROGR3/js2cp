const fs = require('fs');
const file = (fileName) => fs.readFileSync(fileName, 'utf-8');
module.exports = file;
