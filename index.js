#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const Generator = require("./src/Generator.js");

const __path = path.resolve();
const __config = "";
// const __config = require(__path + '/tempjs.json');

const generator = new Generator(__path, __config);

generator.getJSON();
