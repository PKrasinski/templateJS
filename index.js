#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const Generator = require("./src/Generator.js");

const __path = path.resolve();
const __config = require(__path + '/templateJS.json');

const generator = new Generator(__path, __config);

generator.getNewFileContent();

var watch = require('watch')
watch.watchTree(__path, function (f, curr, prev) {
  if (typeof f == "object" && prev === null && curr === null) {
    generator.getNewFileContent();
  } else if (prev === null) {
    generator.getNewFileContent();
  } else if (curr.nlink === 0) {
    generator.getNewFileContent();
  } else {
    generator.getNewFileContent();
  }
})
