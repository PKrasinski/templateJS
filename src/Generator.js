const Reader = require("./Reader.js");

class Generator {
    constructor ( path, config ) {
        this.__paths = path;
        this.__config = config;
        this.reader = new Reader();
    }
    getJSON () {
        console.log(this.__paths);
    }
}

module.exports = Generator;
