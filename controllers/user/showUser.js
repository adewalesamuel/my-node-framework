const showUser = (request, response) => {
    response.setHeader('Content-type', 'application/json');
    
    console.log("show user")
    response.write(JSON.stringify(request.params));
    response.end();
}

module.exports = showUser;
