const testUser = (request, response) => {
    const userData = [
	{name: "Samuel Adewale", email: "samroberval@gmail.com"},
	{name: "Daniel Jackob", email: "danieljackob@gmail.com"}
    ]
    response.setHeader('Content-type', 'application/json');
    
    response.write(JSON.stringify(userData));
    response.end();
}

module.exports = testUser;
