const  fs = require('fs');
const VARS = require('../../vars');

const index = (request, response) => {
    response.setHeader('Content-type', 'text/plain');
    response.write("Hello world. this is my node framework");
    response.end();
}

module.exports = index;
