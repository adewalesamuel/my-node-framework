const  fs = require('fs');
const VARS = require('../../vars');

const index = (request, response) => {
    const data = {
        APP_AUTHOR: "samcooker"
    };

    let html = fs.readFileSync(`${VARS.ROOT_DIR}/views/index.html`).toString();
    
    for (elem in data) {
        if (html.includes(`[${elem}]`)) {
            html = html.replace(`[${elem}]`, data[elem]);
        }
    
    }

    response.setHeader('Content-type', 'text/html');
    response.setHeader('Content-length', html.length);

    response.write(html.toString());
    response.end();
}

module.exports = index;