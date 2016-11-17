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

var v1PurchaseOrderExternalPostRouter = require('./src/routers/v1/purchasing/purchase-order-external-post-router');
v1PurchaseOrderExternalPostRouter.applyRoutes(server, "/v1/purchasing/po/externals/post");

var v1PurchaseOrderExternalsUnpostedRouter = require('./src/routers/v1/purchasing/purchase-order-external-posted-router');
v1PurchaseOrderExternalsUnpostedRouter.applyRoutes(server, "/v1/purchasing/po/externals/posted"); 

var v1PurchaseOrderExternalByUserRouter = require('./src/routers/v1/purchasing/purchase-order-external-by-user-router');
v1PurchaseOrderExternalByUserRouter.applyRoutes(server, "/v1/purchasing/po/externals/by-user");

var v1PurchaseOrderExternalRouter = require('./src/routers/v1/purchasing/purchase-order-external-router');
v1PurchaseOrderExternalRouter.applyRoutes(server, "/v1/purchasing/po/externals");

var v1PurchaseOrderSplitRouter = require('./src/routers/v1/purchasing/purchase-order-split-router');
v1PurchaseOrderSplitRouter.applyRoutes(server, "/v1/purchasing/po/split");

var v1DOMonitoringRouter = require('./src/routers/v1/purchasing/purchase-order-monitoring-router');
v1DOMonitoringRouter.applyRoutes(server, '/v1/purchasing/po/monitoring');

var v1PurchaseOrderUnpostedRouter = require('./src/routers/v1/purchasing/purchase-order-un-posted-router');
v1PurchaseOrderUnpostedRouter.applyRoutes(server, "/v1/purchasing/po/unposted");

var v1PurchaseOrderByUserRouter = require('./src/routers/v1/purchasing/purchase-order-by-user-router');
v1PurchaseOrderByUserRouter.applyRoutes(server, "/v1/purchasing/po/by-user");

var v1PurchaseOrderRouter = require('./src/routers/v1/purchasing/purchase-order-router');
v1PurchaseOrderRouter.applyRoutes(server, "/v1/purchasing/po");

var v1PurchaseRequestPostedRouter = require('./src/routers/v1/purchasing/purchase-request-posted-router');
v1PurchaseRequestPostedRouter.applyRoutes(server, "/v1/purchasing/pr/posted");

var v1PurchaseRequestPostRouter = require('./src/routers/v1/purchasing/purchase-request-post-router');
v1PurchaseRequestPostRouter.applyRoutes(server, "/v1/purchasing/pr/post");

var v1PurchaseRequestByUserRouter = require('./src/routers/v1/purchasing/purchase-request-by-user-router');
v1PurchaseRequestByUserRouter.applyRoutes(server, "/v1/purchasing/pr/by-user");

var v1PurchaseRequestRouter = require('./src/routers/v1/purchasing/purchase-request-monitoring-router');
v1PurchaseRequestRouter.applyRoutes(server, "/v1/purchasing/pr/monitoring");

var v1PurchaseRequestRouter = require('./src/routers/v1/purchasing/purchase-request-router');
v1PurchaseRequestRouter.applyRoutes(server, "/v1/purchasing/pr");

var v1DOMonitoringByUserRouter = require('./src/routers/v1/purchasing/delivery-order-monitoring-by-user-router');
v1DOMonitoringByUserRouter.applyRoutes(server, '/v1/purchasing/do/monitoring/by-user');

var v1POMonitoringRouter = require('./src/routers/v1/purchasing/delivery-order-monitoring-router');
v1POMonitoringRouter.applyRoutes(server, '/v1/purchasing/do/monitoring');

var v1DeliveryOrderByUserRouter = require('./src/routers/v1/purchasing/delivery-order-by-user-router');
v1DeliveryOrderByUserRouter.applyRoutes(server, "/v1/purchasing/do/by-user");

var v1DeliveryOrderRouter = require('./src/routers/v1/purchasing/delivery-order-router');
v1DeliveryOrderRouter.applyRoutes(server, "/v1/purchasing/do");

var v1ReportPoCategoryPeriode = require('./src/routers/v1/purchasing/reports/purchase-order-report-category-router');
v1ReportPoCategoryPeriode.applyRoutes(server, "/v1/purchasing/po/reports/categories");

var v1ReportPoUnitPeriode = require('./src/routers/v1/purchasing/reports/purchase-order-report-unit-router');
v1ReportPoUnitPeriode.applyRoutes(server, "/v1/purchasing/po/reports/units");

var v1ReportPoSubUnitPeriode = require('./src/routers/v1/purchasing/reports/purchase-order-report-sub-unit-router');
v1ReportPoSubUnitPeriode.applyRoutes(server, "/v1/purchasing/po/reports/subUnits");

var v1UnitReceiptNote = require('./src/routers/v1/purchasing/unit-receipt-note-do-router');
v1UnitReceiptNote.applyRoutes(server, "/v1/purchasing/receipt-note/unit/do");

var v1UnitReceiptNoteMonitoringByUser = require('./src/routers/v1/purchasing/unit-receipt-note-monitoring-by-user-router');
v1UnitReceiptNoteMonitoringByUser.applyRoutes(server, "/v1/purchasing/receipt-note/unit/monitoring/by-user");

var v1UnitReceiptNoteMonitoring = require('./src/routers/v1/purchasing/unit-receipt-note-monitoring-router');
v1UnitReceiptNoteMonitoring.applyRoutes(server, "/v1/purchasing/receipt-note/unit/monitoring");

var v1UnitReceiptNoteByUser = require('./src/routers/v1/purchasing/unit-receipt-note-by-user-router');
v1UnitReceiptNoteByUser.applyRoutes(server, "/v1/purchasing/receipt-note/unit/by-user");

var v1UnitReceiptNote = require('./src/routers/v1/purchasing/unit-receipt-note-router');
v1UnitReceiptNote.applyRoutes(server, "/v1/purchasing/receipt-note/unit");

var v1UnitPaymentPriceCorrectionNoteByUser = require('./src/routers/v1/purchasing/unit-payment-price-correction-note-by-user-router');
v1UnitPaymentPriceCorrectionNoteByUser.applyRoutes(server, "/v1/purchasing/unit-payment-note/price-correction/by-user"); 
 
var v1UnitPaymentPriceCorrectionReturNote = require('./src/routers/v1/purchasing/unit-payment-price-correction-retur-note-router');
v1UnitPaymentPriceCorrectionReturNote.applyRoutes(server, "/v1/purchasing/unit-payment-note/price-correction/retur"); 

var v1UnitPaymentPriceCorrectionNote = require('./src/routers/v1/purchasing/unit-payment-price-correction-note-router');
v1UnitPaymentPriceCorrectionNote.applyRoutes(server, "/v1/purchasing/unit-payment-note/price-correction");

var v1UnitPaymentOrderByUser = require('./src/routers/v1/purchasing/unit-payment-order-by-user-router');
v1UnitPaymentOrderByUser.applyRoutes(server, "/v1/purchasing/payment-order/unit/by-user");

var v1UnitPaymentOrder = require('./src/routers/v1/purchasing/unit-payment-order-router');
v1UnitPaymentOrder.applyRoutes(server, "/v1/purchasing/payment-order/unit");

var v1UnitPaymentOrderSupplier = require('./src/routers/v1/purchasing/unit-receipt-note-suplier-unit-router');
v1UnitPaymentOrderSupplier.applyRoutes(server, "/v1/purchasing/unit-receipt-note-suplier-unit");

server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`)