const testUserOrder = (request, response) => {
    console.log(`${request.url} testUserOrderController`);
    response.setHeader('Content-type', 'text/html');
    response.write("Hello");
    response.end();
}

module.exports = testUserOrder;