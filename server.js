'use strict'

var restify = require('restify');
restify.CORS.ALLOW_HEADERS.push('authorization');

var passport = require('passport');
var server = restify.createServer();

var json2xls = require('json2xls');
server.use(json2xls.middleware);

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
    headers: ['Content-Disposition']
}));

server.use(passport.initialize());
server.use(function (request, response, next) {
    var query = request.query;
    query.order = !query.order ? {} : JSON.parse(query.order);
    query.filter = !query.filter ? {} : JSON.parse(query.filter);
    request.queryInfo = query;
    next();
});

// PURCHASE ORDER EXTERNAL
var v1PurchaseOrderExternalPostRouter = require('./src/routers/v1/purchase-order-external/purchase-order-external-post-router');
var v1PurchaseOrderExternalsUnpostedRouter = require('./src/routers/v1/purchase-order-external/purchase-order-external-posted-router');
var v1PurchaseOrderExternalByUserRouter = require('./src/routers/v1/purchase-order-external/purchase-order-external-by-user-router');
var v1PurchaseOrderExternalRouter = require('./src/routers/v1/purchase-order-external/purchase-order-external-router');

v1PurchaseOrderExternalPostRouter.applyRoutes(server,           "/v1/purchase-oders/externals/post");
v1PurchaseOrderExternalsUnpostedRouter.applyRoutes(server,      "/v1/purchase-oders/externals/posted"); 
v1PurchaseOrderExternalByUserRouter.applyRoutes(server,         "/v1/purchase-oders/externals/by-user");
v1PurchaseOrderExternalRouter.applyRoutes(server,               "/v1/purchase-oders/externals");



// PURCHASE ORDER
var v1PurchaseOrderSplitRouter = require('./src/routers/v1/purchase-order/purchase-order-split-router');
var v1DOMonitoringRouter = require('./src/routers/v1/purchase-order/purchase-order-monitoring-router');
var v1PurchaseOrderUnpostedRouter = require('./src/routers/v1/purchase-order/purchase-order-un-posted-router');
var v1PurchaseOrderByUserRouter = require('./src/routers/v1/purchase-order/purchase-order-by-user-router');
var v1ReportPoCategoryPeriode = require('./src/routers/v1/purchase-order/reports/purchase-order-report-category-router');
var v1ReportPoUnitPeriode = require('./src/routers/v1/purchase-order/reports/purchase-order-report-unit-router');
var v1ReportPoSubUnitPeriode = require('./src/routers/v1/purchase-order/reports/purchase-order-report-sub-unit-router');
var v1PurchaseOrderRouter = require('./src/routers/v1/purchase-order/purchase-order-router');

v1PurchaseOrderSplitRouter.applyRoutes(server,                  "/v1/purchase-oders/split");
v1DOMonitoringRouter.applyRoutes(server,                        '/v1/purchase-oders/monitoring');
v1PurchaseOrderUnpostedRouter.applyRoutes(server,               "/v1/purchase-oders/unposted");
v1PurchaseOrderByUserRouter.applyRoutes(server,                 "/v1/purchase-oders/by-user");
v1ReportPoCategoryPeriode.applyRoutes(server,                   "/v1/purchase-oders/reports/categories");
v1ReportPoUnitPeriode.applyRoutes(server,                       "/v1/purchase-oders/reports/units");
v1ReportPoSubUnitPeriode.applyRoutes(server,                    "/v1/purchase-oders/reports/subUnits");
v1PurchaseOrderRouter.applyRoutes(server,                       "/v1/purchase-oders");



// PURCHASE REQUEST
var v1PurchaseRequestPostedRouter = require('./src/routers/v1/purchase-request/purchase-request-posted-router');
var v1PurchaseRequestPostRouter = require('./src/routers/v1/purchase-request/purchase-request-post-router');
var v1PurchaseRequestByUserRouter = require('./src/routers/v1/purchase-request/purchase-request-by-user-router');
var v1PurchaseRequestMonitoringRouter = require('./src/routers/v1/purchase-request/purchase-request-monitoring-router');
var v1PurchaseRequestRouter = require('./src/routers/v1/purchase-request/purchase-request-router');

v1PurchaseRequestPostedRouter.applyRoutes(server,               "/v1/purchase-requests/posted");
v1PurchaseRequestPostRouter.applyRoutes(server,                 "/v1/purchase-requests/post");
v1PurchaseRequestByUserRouter.applyRoutes(server,               "/v1/purchase-requests/by-user");
v1PurchaseRequestMonitoringRouter.applyRoutes(server,           "/v1/purchase-requests/monitoring");
v1PurchaseRequestRouter.applyRoutes(server,                     "/v1/purchase-requests");



// DELIVERY ORDER
var v1DOMonitoringByUserRouter = require('./src/routers/v1/delivery-order/delivery-order-monitoring-by-user-router');
var v1POMonitoringRouter = require('./src/routers/v1/delivery-order/delivery-order-monitoring-router');
var v1DeliveryOrderBySupplierRouter = require('./src/routers/v1/delivery-order/delivery-order-by-supplier-router');
var v1DeliveryOrderByUserRouter = require('./src/routers/v1/delivery-order/delivery-order-by-user-router');
var v1DeliveryOrderRouter = require('./src/routers/v1/delivery-order/delivery-order-router');

v1DOMonitoringByUserRouter.applyRoutes(server,                  '/v1/delivery-orders/monitoring/by-user');
v1POMonitoringRouter.applyRoutes(server,                        '/v1/delivery-orders/monitoring');
v1DeliveryOrderBySupplierRouter.applyRoutes(server,             "/v1/delivery-orders/by-supplier");
v1DeliveryOrderByUserRouter.applyRoutes(server,                 "/v1/delivery-orders/by-user");
v1DeliveryOrderRouter.applyRoutes(server,                       "/v1/delivery-orders");



// UNIT RECEIPT NOTE
var v1UnitReceiptNoteMonitoringByUser = require('./src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-by-user-router');
var v1UnitReceiptNoteMonitoring = require('./src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-router');
var v1UnitReceiptNoteByUser = require('./src/routers/v1/unit-receipt-note/unit-receipt-note-by-user-router');
var v1UnitPaymentOrderSupplier = require('./src/routers/v1/unit-receipt-note/unit-receipt-note-suplier-unit-router');
var v1UnitReceiptNote = require('./src/routers/v1/unit-receipt-note/unit-receipt-note-router');
-
v1UnitReceiptNoteMonitoringByUser.applyRoutes(server,           "/v1/unit-receipt-notes/monitoring/by-user");
v1UnitReceiptNoteMonitoring.applyRoutes(server,                 "/v1/unit-receipt-notes/monitoring");
v1UnitReceiptNoteByUser.applyRoutes(server,                     "/v1/unit-receipt-notes/by-user");
v1UnitPaymentOrderSupplier.applyRoutes(server,                  "/v1/unit-receipt-notes/by-suplier-unit");
v1UnitReceiptNote.applyRoutes(server,                           "/v1/unit-receipt-notes/unit");



// UNIT PAYMENT NOTE
var v1UnitPaymentPriceCorrectionNoteByUser = require('./src/routers/v1/unit-payment-note/unit-payment-price-correction-note-by-user-router');
var v1UnitPaymentPriceCorrectionReturNote = require('./src/routers/v1/unit-payment-note/unit-payment-price-correction-retur-note-router');
var v1UnitPaymentPriceCorrectionNote = require('./src/routers/v1/unit-payment-note/unit-payment-price-correction-note-router');
var v1UnitPaymentQuantityCorrectionNoteByUser = require('./src/routers/v1/unit-payment-note/unit-payment-quantity-correction-note-by-user-router');
var v1UnitPaymentQuantityCorrectionNote = require('./src/routers/v1/unit-payment-note/unit-payment-quantity-correction-note-router');
var v1UnitPaymentOrderByUser = require('./src/routers/v1/unit-payment-note/unit-payment-order-by-user-router'); 
var v1UnitPaymentOrder = require('./src/routers/v1/unit-payment-note/unit-payment-order-router');

v1UnitPaymentPriceCorrectionNoteByUser.applyRoutes(server,      "/v1/unit-payment-orders/corrections/prices/by-user");  
v1UnitPaymentPriceCorrectionReturNote.applyRoutes(server,       "/v1/unit-payment-orders/corrections/prices/retur"); 
v1UnitPaymentPriceCorrectionNote.applyRoutes(server,            "/v1/unit-payment-orders/corrections/prices");
v1UnitPaymentQuantityCorrectionNoteByUser.applyRoutes(server,   "/v1/unit-payment-orders/corrections/quantities/by-user");  
v1UnitPaymentQuantityCorrectionNote.applyRoutes(server,         "/v1/unit-payment-orders/corrections/quantities");
v1UnitPaymentOrderByUser.applyRoutes(server,                    "/v1/unit-payment-orders/by-user");
v1UnitPaymentOrder.applyRoutes(server,                          "/v1/unit-payment-orders");

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)