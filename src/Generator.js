const fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let data = []
class Generator {

    constructor ( path, config ) {
        this.__src = path + "\\" + config.src;
        this.__path = path;
    }

    getNewFileContent () {
        const path = this.__path;
        const downloadData = this.downloadData;
        const split = this.split;
        const concat = this.concat;
        let text;
        fs.readFile(this.__src, 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            downloadData(split("{%", "%}", data), path);
            text = data;
        });
        setTimeout(function() {
            concat(text, path);
        },500)
    }

    concat (string, path) {
        let text = "";
        const temp = string.split("%}");
        temp.forEach((el, index) => {
            const val = el.split("{%");
            if(data[index]){
                text += (val[0] + data[index]);
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

    downloadData(arr, path) {
        var i = 0;
        arr.forEach((el, index) => {
            const file = path + "\\" + el;
            fs.readFile(file , 'utf8', function read(err, com) {
                if (err) {
                    throw err;
                }
                data.push("'" + com.replaceAll("{{","' + ").replaceAll("}}"," + '").replace(/(\r\n|\n|\r|\t)/gm,"").replaceAll("    ","") + "'");
            });
        })
    }

    split (a, b, string) {
        const ret = [];
        const temp = string.split(a);
        temp.forEach((el) => {
            const val = el.split(b);
            if(val.length > 1)
                ret.push(val[0])
        })
        return ret;
    }

}

module.exports = Generator;
