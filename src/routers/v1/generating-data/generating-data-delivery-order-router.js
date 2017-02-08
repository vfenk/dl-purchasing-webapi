var Router = require('restify-router').Router;
var db = require("../../../db");
var DeliveryOrderManager = require("dl-module").managers.purchasing.DeliveryOrderManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new DeliveryOrderManager(db, request.user);

            var dateFormat = "DD/MM/YYYY";
            var locale = 'id-ID';
            var moment = require('moment');
            moment.locale(locale);
            var dateFrom = request.params.dateFrom;
            var dateTo = request.params.dateTo;
            var filter = {};
            if (dateFrom && dateTo) {
                filter = {
                    date: {
                        $gte: new Date(dateFrom),
                        $lte: new Date(dateTo)
                    }
                };
            }

            manager.getAllData(filter)
                .then(list => {
                    var data = [];
                    for (var _data of list) {
                        for (var item of _data.items) {
                            for (var _fulfillment of item.fulfillments) {
                                var _item = {
                                    "NOMOR SURAT JALAN": _data.no,
                                    "TANGGAL SURAT JALAN": moment(new Date(_data.date)).format(dateFormat),
                                    "TANGGAL DATANG BARANG": moment(new Date(_data.date)).format(dateFormat),
                                    "KODE SUPPLIER": _data.supplier.code,
                                    "NAMA SUPPLIER": _data.supplier.name,
                                    "NOMOR PO EXTERNAL": item.purchaseOrderExternal ? item.purchaseOrderExternal.no : "",
                                    "KODE BARANG": _fulfillment.product.code,
                                    "NAMA BARANG": _fulfillment.product.name,
                                    "JUMLAH BARANG": _fulfillment.purchaseOrderQuantity,
                                    "SATUAN BARANG": _fulfillment.purchaseOrderUom.unit,
                                    "JUMLAH DITERIMA": _fulfillment.deliveredQuantity,
                                    "KETERANGAN": _data.remark
                                }
                                data.push(_item);
                            }
                        }
                    }
                    var options = {
                        "NOMOR SURAT JALAN": "string",
                        "TANGGAL SURAT JALAN": "date",
                        "TANGGAL DATANG BARANG": "date",
                        "KODE SUPPLIER": "string",
                        "NAMA SUPPLIER": "string",
                        "NOMOR PO EXTERNAL": "string",
                        "KODE BARANG": "string",
                        "NAMA BARANG": "string",
                        "JUMLAH BARANG": "number",
                        "SATUAN BARANG": "string",
                        "JUMLAH DITERIMA": "number",
                        "KETERANGAN": "string"
                    };
                    if (data.length === 0) {
                        var _item = {
                            "NOMOR SURAT JALAN": "",
                            "TANGGAL SURAT JALAN": "",
                            "TANGGAL DATANG BARANG": "",
                            "KODE SUPPLIER": "",
                            "NAMA SUPPLIER": "",
                            "NOMOR PO EXTERNAL": "",
                            "KODE BARANG": "",
                            "NAMA BARANG": "",
                            "JUMLAH BARANG": "",
                            "SATUAN BARANG": "",
                            "JUMLAH DITERIMA": "",
                            "KETERANGAN": ""
                        }
                        data.push(_item);
                    }
                    if (dateFrom && dateTo) {
                        response.xls(`Laporan Surat Jalan -  ${moment(new Date(dateFrom)).format("DD MMM YYYY")} -  ${moment(new Date(dateTo)).format("DD MMM YYYY")}.xlsx`, data, options);
                    } else {
                        response.xls(`Laporan Surat Jalan -  ${moment(new Date()).format("DD MMM YYYY")}.xlsx`, data, options);
                    }
                })
                .catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                })
        })
    });
    return router;
}
module.exports = getRouter;

