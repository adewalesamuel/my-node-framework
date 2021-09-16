const VARS = require("../vars");
const { UserController } = require(`${VARS.ROOT_DIR}/controllers`)
const USER_ENDPOINT = "/users";
module.exports = [
    {
        method: 'GET',
        endpoint: `${USER_ENDPOINT}`,
        controller: UserController.testUser
    },
    {
        method: 'GET',  
        endpoint: `${USER_ENDPOINT}/{id}`,
        controller: UserController.showUser
    },
    {   
        method: 'GET',
        endpoint: `${USER_ENDPOINT}/{id}/orders`,
        controller: UserController.testUserOrder
    },
];