const http = require('http');
const https = require('https');
const VARS = require('./vars');
const HEADERS = {
    "Content-type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Acces-Control-Allow-Method": "GET, POST, PUT, DELETE, OPTIONS"
}

console.log(`Running app on localhost:${VARS.PORT}`);

const server = (routeManager, port, app) => {
    return http.createServer(function (request, response) {
        for (header in HEADERS)
            response.setHeader(header, HEADERS[header]);
        routeManager(request, response, app);
      }).listen(port)
}

module.exports = server;



