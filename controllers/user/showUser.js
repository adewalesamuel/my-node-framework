const showUser = (request, response) => {
    response.setHeader('Content-type', 'applition/json');
    
    console.log("show user")
    response.write(JSON.stringify(request.params));
    response.end();
}

module.exports = showUser;