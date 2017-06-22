#!/usr/bin/env node

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
const path = require('path');
const fs = require('fs');

const __path = path.resolve();
const __config = require(__path + '/templateJS.json');
const __src = __path + "\\" + __config.src;

let data = [];

function getNewFileContent () {
    let text;
    fs.readFile(__src, 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        downloadData(split("{%", "%}", data), __path);
        text = data;
    });
    setTimeout(function() {
        concat(text, __path);
    },500)
}

function concat (string, path) {
    let text = "";
    const temp = string.split("%}");
    temp.forEach((el, index) => {
        const val = el.split("{%");
        if(data[index]){
            text += (val[0] + data[index]);
            console.log(text);
        }
        else
            text += val[0];
    })
    fs.writeFile(path + "\\index.min.js", text, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    console.log(text);
}

function downloadData(arr, path) {
    var i = 0;
    arr.forEach((el, index) => {
        const file = path + "\\" + el;
        fs.readFile(file , 'utf8', function read(err, com) {
            if (err) {
                throw err;
            }
            data[index] = "'" + com.replaceAll("{{","' + (").replaceAll("}}",") + '").replace(/(\r\n|\n|\r|\t)/gm,"").replaceAll("    ","") + "'";
        });
    })
}

function split (a, b, string) {
    const ret = [];
    const temp = string.split(a);
    temp.forEach((el) => {
        const val = el.split(b);
        if(val.length > 1)
            ret.push(val[0])
    })
    return ret;
}

getNewFileContent();
