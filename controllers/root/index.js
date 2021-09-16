const  fs = require('fs');
const VARS = require('../../vars');

const index = (request, response) => {
    let imagePath = "C:/Users/EPISTROPHE/Downloads/victoria-kubiaki-t0Aio60jD4Q-unsplash.jpg"
    
    response.setHeader('Content-type', 'image/jpg');
    response.setHeader('Content-length', fs.statSync(imagePath).size);
    response.setHeader('Accept-Ranges', 'bytes');

    response.write(fs.readFileSync(imagePath));
    response.end();
}

module.exports = index;
