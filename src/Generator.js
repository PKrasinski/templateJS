const fs = require('fs');


class Generator {

    constructor ( path, config ) {
        this.__src = path + "\\" + config.src;
        this.__path = path;
    }

    getNewFileContent () {
        const path = this.__path;
        const concat = this.concat;
        fs.readFile(this.__src, 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            console.log(concat(data.split(/{%|%}/), path));
        });
    }

    concat (arr, path) {
        let text = "";

        while(arr.length>0) {
            let temp = arr.shift();
            if(temp.charAt(0) === "=") {
                const file = path + "\\" + temp.slice(1);
                try{
                    fs.readFile(file , 'utf8', function read(err, data) {
                        if (err) {
                            throw err;
                        }
                        console.log(data);
                        text += data;
                    });
                    console.log(text);
                }
                catch (err) {
                    console.log(err);
                }
            }
            else text += temp;
        }

        return text;
    }

}

module.exports = Generator;
