#!/usr/bin/env node

const app = require('../app.js');

let arguments = process.argv.splice(2);

app.execute(arguments[0]);
