var Router = require('restify-router').Router;
var db = require("../../../db");
var PurchaseOrderManager = require("dl-module").managers.purchasing.PurchaseOrderManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();

    var getManager = (user) => {
        return db.get()
            .then((db) => {
                return Promise.resolve(new PurchaseOrderManager(db, user));
            });
    };

    router.get("/", passport, function (request, response, next) {
        var user = request.user;
        var query = request.query;
        query.order = {
            "_updatedDate": -1
        };
        var filter = {
            "_createdBy": request.user.username
        };
        Object.assign(query.filter, filter);
        query.select = [
            "unit.division.name", "unit.name", "category.name", "purchaseRequest.date", "purchaseRequest.no", "purchaseRequest.expectedDeliveryDate", "_createdBy", "purchaseOrderExternal.isPosted", "isPosted"
        ];

        getManager(user)
            .then((manager) => {
                return manager.read(query);
            })
            .then(docs => {
                var result = resultFormatter.ok(apiVersion, 200, docs.data);
                delete docs.data;
                result.info = docs;
                return Promise.resolve(result);
            })
            .then((result) => {
                response.send(result.statusCode, result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    });

    router.get("/:id", passport, (request, response, next) => {
        var user = request.user;
        var id = request.params.id;
        var query = {
            "_createdBy": request.user.username,
            "_id": new ObjectId(id)
        };
        getManager(user)
            .then((manager) => {
                return manager.getSingleByQueryOrDefault(query);
            })
            .then((doc) => {
                var result;
                if (!doc) {
                    result = resultFormatter.fail(apiVersion, 404, new Error("data not found"));
                }
                else {
                    result = resultFormatter.ok(apiVersion, 200, doc);
                }
                return Promise.resolve(result);
            })
            .then((result) => {
                response.send(result.statusCode, result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    });

    router.post("/", passport, (request, response, next) => {
        var user = request.user;
        var data = request.body;

        getManager(user)
            .then((manager) => {
                return manager.create(data);
            })
            .then((docId) => {
                response.header("Location", `${request.url}/${docId.toString()}`);
                var result = resultFormatter.ok(apiVersion, 201);
                return Promise.resolve(result);
            })
            .then((result) => {
                response.send(result.statusCode, result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    });

    router.put("/:id", passport, (request, response, next) => {
        var user = request.user;
        var id = request.params.id;
        var data = request.body;

        getManager(user)
            .then((manager) => {
                return manager.getSingleByIdOrDefault(id)
                    .then((doc) => {
                        var result;
                        if (!doc) {
                            result = resultFormatter.fail(apiVersion, 404, new Error("data not found"));
                            return Promise.resolve(result);
                        }
                        else {
                            return manager.update(data)
                                .then((docId) => {
                                    result = resultFormatter.ok(apiVersion, 204);
                                    return Promise.resolve(result);
                                });
                        }
                    });
            })
            .then((result) => {
                response.send(result.statusCode, result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    });

    router.del("/:id", passport, (request, response, next) => {
        var user = request.user;
        var id = request.params.id;

        getManager(user)
            .then((manager) => {
                return manager.getSingleByIdOrDefault(id)
                    .then((doc) => {
                        var result;
                        if (!doc) {
                            result = resultFormatter.fail(apiVersion, 404, new Error("data not found"));
                            return Promise.resolve(result);
                        }
                        else {
                            return manager.delete(doc)
                                .then((docId) => {
                                    result = resultFormatter.ok(apiVersion, 204);
                                    return Promise.resolve(result);
                                });
                        }
                    });
            })
            .then((result) => {
                response.send(result.statusCode, result);
            })
            .catch((e) => {
                var statusCode = 500;
                if (e.name === "ValidationError")
                    statusCode = 400;
                var error = resultFormatter.fail(apiVersion, statusCode, e);
                response.send(statusCode, error);
            });
    });

    return router;
}
module.exports = getRouter;
