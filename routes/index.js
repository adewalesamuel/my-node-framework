const VARS = require("../vars");
module.exports = {
    ROOT_ROUTES: [
        {
            method: "GET",
            endpoint: "/",
            controller: require(`${VARS.ROOT_DIR}/controllers/root`)
        }
    ],
    USER_ROUTES: require(`${VARS.ROOT_DIR}/routes/user`)
}