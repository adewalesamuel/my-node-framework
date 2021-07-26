const VARS = require('./vars');
const routes = require('./routes');
const server = require('./server');
const app = require("./app");

for (route in routes)
    app.fillRoutesAndControllers(routes[route]);

app.run(server, VARS.PORT);
