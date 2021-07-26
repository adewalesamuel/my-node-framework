const url = require('./modules/url');
const fs = require('fs');
const os = require('os');
const VARS = require('./vars');

const App = function() {
    this.METHODS;
    this.routes;
    this.controllers;
    this.error;
    this.status;
    this.currentPath; 
    this.activeController;
    this.url;
    this.locale;

    this.init = () => {
        this.status = 200;
        this.routes = []
        this.controllers = [];
        this.METHODS = {
            get: "GET",
            post: "POST",
            put: "PUT",
            delete: "DELETE",
            options: "OPTIONS"
        }
        this.url = url;
        this.locale = "fr"
    }

    this.init();

}

App.prototype.logActivity = function(request, type="succes") {
    const date = new Date().toLocaleString(this.locale);

    const userAgent = ('user-agent' in request.headers) ? request.headers['user-agent'] : "";
    const ip = ('x-forwarded-for' in request.headers) ? request.headers['x-forwarded-for'] : "";

    const url = request.url;
    const method = request.method;

    const errorMessage = this.error ? `${this.error.stack}` : "";
    const line = `${date} ${ip} ${userAgent} ${url} ${method}\n`;

    const filename = (type === 'succes') ? "access.log" : "error.log";
    const filepath = `${VARS.LOG_DIR}/${filename}`;

    if (!fs.readdirSync(VARS.LOG_DIR))
        fs.mkdirSync(VARS.LOG_DIR);

    if (filename === "error.log")
        fs.appendFileSync(filepath, "ERROR: " + line + errorMessage);

    fs.appendFileSync(filepath, line);

} 

App.prototype.getNewRequest = function(request) {
    return {
        ...request, 
        params: this.url.getParams(this.currentPath, request.url),
        query: this.url.getQueries(request.url)
    }
}

App.prototype.addRoute = function(method, path) {
    this.routes.push([method, path]);
}

App.prototype.addController = function(controllerFunction) {
    this.controllers.push(controllerFunction)
    }

App.prototype.fillRoutesAndControllers = function(routesControllersObject) {
    routesControllersObject.forEach(routeControllerElement => {
        this.addRoute(routeControllerElement.method, routeControllerElement.endpoint);
        this.addController(routeControllerElement.controller);
    });
}

App.prototype.routesControllerManager = function(request, response, self) {
    self.logActivity(request)

    for (let i=0; i <= self.routes.length - 1; i++) {
        self.currentMethod = self.routes[i][0] || self.METHODS.options;
        self.currentPath = self.routes[i][1];
        self.activeController = self.controllers[i];
        
        if (request.method === self.currentMethod ) {
            if (self.url.isEndpoint(self.currentPath, request.url) ) {
                
                try {
                    self.status = 200;
                    //self.activeMiddleware(newRequest, response)
                    self.activeController(self.getNewRequest(request), response);
                    break;
                } catch (error) {
                    self.status = 500;
                    self.error = error;
                    break;
                }

            }else {
                self.status = 404;
            }
        }else {
            self.status = 400;
        }

        }
        
    if (self.status !== 200) {
        response.writeHead(self.status);
        if (self.status === 500) {
            self.logActivity(request, "error")
            response.write(self.error.message)
        }
        response.end();
    }
        
    }

App.prototype.run = function(server, port) {
    server(this.routesControllerManager, port, this)
}

const app = new App();

module.exports = app;
