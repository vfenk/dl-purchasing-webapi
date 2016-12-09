// PURCHASE REQUEST
var v1PurchaseRequestPostedRouter = require('../src/routers/v1/purchase-request/purchase-request-posted-router');
var v1PurchaseRequestPostRouter = require('../src/routers/v1/purchase-request/purchase-request-post-router');
var v1PurchaseRequestByUserRouter = require('../src/routers/v1/purchase-request/purchase-request-by-user-router');
var v1PurchaseRequestMonitoringRouter = require('../src/routers/v1/purchase-request/purchase-request-monitoring-router');
var v1PurchaseRequestRouter = require('../src/routers/v1/purchase-request/purchase-request-router');
// PURCHASE ORDER
var v1PurchaseOrderSplitRouter = require('../src/routers/v1/purchase-order/purchase-order-split-router');
var v1POMonitoringRouter = require('../src/routers/v1/purchase-order/purchase-order-monitoring-router');
var v1PurchaseOrderUnpostedRouter = require('../src/routers/v1/purchase-order/purchase-order-un-posted-router');
var v1PurchaseOrderByUserRouter = require('../src/routers/v1/purchase-order/purchase-order-by-user-router');
var v1ReportPoCategoryPeriode = require('../src/routers/v1/purchase-order/reports/purchase-order-report-category-router');
var v1ReportPoUnitPeriode = require('../src/routers/v1/purchase-order/reports/purchase-order-report-unit-router');
var v1ReportPoSubUnitPeriode = require('../src/routers/v1/purchase-order/reports/purchase-order-report-sub-unit-router');
var v1PurchaseOrderRouter = require('../src/routers/v1/purchase-order/purchase-order-router');
// PURCHASE ORDER EXTERNAL
var v1PurchaseOrderExternalPostRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-post-router');
var v1PurchaseOrderExternalsUnpostedRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-posted-router');
var v1PurchaseOrderExternalByUserRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-by-user-router');
var v1PurchaseOrderExternalRouter = require('../src/routers/v1/purchase-order-external/purchase-order-external-router');
// DELIVERY ORDER
var v1DOMonitoringByUserRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-by-user-router');
var v1DOMonitoringRouter = require('../src/routers/v1/delivery-order/delivery-order-monitoring-router');
var v1DeliveryOrderBySupplierRouter = require('../src/routers/v1/delivery-order/delivery-order-by-supplier-router');
var v1DeliveryOrderByUserRouter = require('../src/routers/v1/delivery-order/delivery-order-by-user-router');
var v1DeliveryOrderRouter = require('../src/routers/v1/delivery-order/delivery-order-router');
// UNIT RECEIPT NOTE
var v1UnitReceiptNoteMonitoringByUser = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-by-user-router');
var v1UnitReceiptNoteMonitoring = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-monitoring-router');
var v1UnitReceiptNoteByUser = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-by-user-router');
var v1UnitPaymentOrderSupplier = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-suplier-unit-router');
var v1UnitReceiptNote = require('../src/routers/v1/unit-receipt-note/unit-receipt-note-router');
// UNIT PAYMENT NOTE
var v1UnitPaymentPriceCorrectionNoteByUser = require('../src/routers/v1/unit-payment-note/unit-payment-price-correction-note-by-user-router');
var v1UnitPaymentPriceCorrectionReturNote = require('../src/routers/v1/unit-payment-note/unit-payment-price-correction-retur-note-router');
var v1UnitPaymentPriceCorrectionNote = require('../src/routers/v1/unit-payment-note/unit-payment-price-correction-note-router');
var v1UnitPaymentQuantityCorrectionNoteByUser = require('../src/routers/v1/unit-payment-note/unit-payment-quantity-correction-note-by-user-router');
var v1UnitPaymentQuantityCorrectionReturNote = require('../src/routers/v1/unit-payment-note/unit-payment-quantity-correction-retur-note-router');
var v1UnitPaymentQuantityCorrectionNote = require('../src/routers/v1/unit-payment-note/unit-payment-quantity-correction-note-router');
var v1UnitPaymentOrderByUser = require('../src/routers/v1/unit-payment-note/unit-payment-order-by-user-router'); 
var v1UnitPaymentOrder = require('../src/routers/v1/unit-payment-note/unit-payment-order-router');

 module.exports = function(server) {
    //PURCHASE REQUEST
    v1PurchaseRequestPostedRouter.applyRoutes(server,               "/purchase-requests/posted");
    v1PurchaseRequestPostRouter.applyRoutes(server,                 "/purchase-requests/post");
    v1PurchaseRequestByUserRouter.applyRoutes(server,               "/purchase-requests/by-user");
    v1PurchaseRequestMonitoringRouter.applyRoutes(server,           "/purchase-requests/monitoring");
    v1PurchaseRequestRouter().applyRoutes(server,                   "/purchase-requests");
    //PURCHASE ORDER
    v1PurchaseOrderSplitRouter.applyRoutes(server,                  "/purchase-oders/split");
    v1POMonitoringRouter.applyRoutes(server,                        "/purchase-oders/monitoring");
    v1PurchaseOrderUnpostedRouter.applyRoutes(server,               "/purchase-oders/unposted");
    v1PurchaseOrderByUserRouter.applyRoutes(server,                 "/purchase-oders/by-user");
    v1ReportPoCategoryPeriode.applyRoutes(server,                   "/purchase-oders/reports/categories");
    v1ReportPoUnitPeriode.applyRoutes(server,                       "/purchase-oders/reports/units");
    v1ReportPoSubUnitPeriode.applyRoutes(server,                    "/purchase-oders/reports/subUnits");
    v1PurchaseOrderRouter().applyRoutes(server,                     "/purchase-oders");
    //PURCHASE ORDER EXTERNAL
    v1PurchaseOrderExternalPostRouter.applyRoutes(server,           "/purchase-oders/externals/post");
    v1PurchaseOrderExternalsUnpostedRouter.applyRoutes(server,      "/purchase-oders/externals/posted"); 
    v1PurchaseOrderExternalByUserRouter.applyRoutes(server,         "/purchase-oders/externals/by-user");
    v1PurchaseOrderExternalRouter().applyRoutes(server,             "/purchase-oders/externals");
    //DELIVERY ORDER
    v1DOMonitoringByUserRouter.applyRoutes(server,                  "/delivery-orders/monitoring/by-user");
    v1DOMonitoringRouter.applyRoutes(server,                        "/delivery-orders/monitoring");
    v1DeliveryOrderBySupplierRouter.applyRoutes(server,             "/delivery-orders/by-supplier");
    v1DeliveryOrderByUserRouter.applyRoutes(server,                 "/delivery-orders/by-user");
    v1DeliveryOrderRouter().applyRoutes(server,                     "/delivery-orders");
    //UNIT RECEIPT NOTE
    v1UnitReceiptNoteMonitoringByUser.applyRoutes(server,           "/unit-receipt-notes/monitoring/by-user");
    v1UnitReceiptNoteMonitoring.applyRoutes(server,                 "/unit-receipt-notes/monitoring");
    v1UnitReceiptNoteByUser.applyRoutes(server,                     "/unit-receipt-notes/by-user");
    v1UnitPaymentOrderSupplier.applyRoutes(server,                  "/unit-receipt-notes/by-suplier-unit");
    v1UnitReceiptNote().applyRoutes(server,                         "/unit-receipt-notes");
    //UNIT PAYMENT NOTE
    v1UnitPaymentPriceCorrectionNoteByUser.applyRoutes(server,      "/unit-payment-orders/corrections/prices/by-user");  
    v1UnitPaymentPriceCorrectionReturNote.applyRoutes(server,       "/unit-payment-orders/corrections/prices/retur"); 
    v1UnitPaymentPriceCorrectionNote().applyRoutes(server,          "/unit-payment-orders/corrections/prices");
    v1UnitPaymentQuantityCorrectionNoteByUser.applyRoutes(server,   "/unit-payment-orders/corrections/quantities/by-user");  
    v1UnitPaymentQuantityCorrectionReturNote.applyRoutes(server,    "/unit-payment-orders/corrections/quantities/retur"); 
    v1UnitPaymentQuantityCorrectionNote().applyRoutes(server,       "/unit-payment-orders/corrections/quantities");
    v1UnitPaymentOrderByUser.applyRoutes(server,                    "/unit-payment-orders/by-user");
    v1UnitPaymentOrder().applyRoutes(server,                        "/unit-payment-orders");
 };