 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/purchase-requests",
     model: require("dl-models").purchasing.PurchaseRequest,
     validate: require("dl-models").validator.purchasing.purchaseRequest,
     util: require("dl-module").test.data.purchasing.purchaseRequest,
     keyword: "code"
 });
 