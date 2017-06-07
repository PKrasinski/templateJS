const fs = require('fs');

class Reader {
    constructor (path) {
        this.__path = path;
    }
    readJS ( path ) {
        let string = "";
        const split = this.split;
        fs.readFile(path, 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            const lines = data.split("\n");
            lines.forEach((line) => {
                if(line.indexOf("//") > -1)
                    string += line.split('//')[1];
            })
            console.log("\n\n"+path+'\n\n')
        });
    }
}

module.exports = Reader;
