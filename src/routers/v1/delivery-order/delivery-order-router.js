const apiVersion = '1.0.0';
var Manager = require("dl-module").managers.purchasing.DeliveryOrderManager;
var JwtRouterFactory = require("../../jwt-router-factory");

function getRouter() {
    var router = JwtRouterFactory(Manager, {
        version: apiVersion,
        defaultOrder: {
            "_updatedDate": -1
        },
        defaultSelect:["no","supplier.name","items"]
    });
    return router;
}
module.exports = getRouter;
