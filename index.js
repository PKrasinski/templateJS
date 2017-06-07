#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const Generator = require("./src/Generator.js");

const __path = path.resolve();
const __config = require(__path + '/templateJS.json');

const generator = new Generator(__path, __config);

generator.getNewFileContent();
