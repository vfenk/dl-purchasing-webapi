var Router = require('restify-router').Router;
var db = require("../../../db");
var PurchaseRequestManager = require("dl-module").managers.purchasing.PurchaseRequestManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new PurchaseRequestManager(db, request.user);

            var dateFormat = "DD MMM YYYY";
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

            manager.getAllDataPR(filter)
                .then(list => {
                    var data = [];
                    for (var _data of list) {
                        for (var item of _data.items) {
                            var _item = {
                                "NOMOR PURCHASE REQUEST": _data.no,
                                "TANGGAL PURCHASE REQUEST": moment(new Date(_data.date)).format(dateFormat),
                                "TANGGAL DIMINTA": moment(new Date(_data.expectedDeliveryDate)).format(dateFormat),
                                "TANGGAL TERIMA PR": moment(new Date(_data.date)).format(dateFormat),
                                "KODE BUDGET": _data.budget.code,
                                "BAGIAN / UNIT": _data.unit.division.name + " - " + _data.unit.name,
                                "KODE KATEGORI": _data.category.code,
                                "KETERANGAN": _data.remark,
                                "KODE BARANG": item.product.code,
                                "NAMA BARANG": item.product.name,
                                "JUMLAH BARANG": item.quantity,
                                "SATUAN BARANG": item.product.uom.unit,
                                "KETERANGAN BARANG": item.remark,
                                "USER INPUT": "",
                                "STATUS POST": _data.isPosted ? "Sudah diposting" : "Belum diposting"
                            }
                            data.push(_item);
                        }
                    }
                    var options = {
                        "NOMOR PURCHASE REQUEST": "string",
                        "TANGGAL PURCHASE REQUEST": "string",
                        "TANGGAL DIMINTA": "string",
                        "TANGGAL TERIMA PR": "string",
                        "KODE BUDGET": "string",
                        "BAGIAN / UNIT": "string",
                        "KODE KATEGORI": "string",
                        "KETERANGAN": "string",
                        "KODE BARANG": "string",
                        "NAMA BARANG": "string",
                        "JUMLAH BARANG": "number",
                        "SATUAN BARANG": "string",
                        "KETERANGAN BARANG": "string",
                        "USER INPUT": "",
                        "STATUS POST": "string"
                    };
                    if (data.length === 0) {
                        var _item = {
                            "NOMOR PURCHASE REQUEST": "",
                            "TANGGAL PURCHASE REQUEST": "",
                            "TANGGAL DIMINTA": "",
                            "KODE BUDGET": "",
                            "BAGIAN / UNIT": "",
                            "KODE KATEGORI": "",
                            "KETERANGAN": "",
                            "KODE BARANG": "",
                            "NAMA BARANG": "",
                            "JUMLAH BARANG": "",
                            "SATUAN BARANG": "",
                            "USER INPUT": "",
                            "STATUS POST": ""
                        }
                        data.push(_item);
                    }
                    if (dateFrom && dateTo) {
                        response.xls(`Laporan Purchase Request -  ${moment(new Date(dateFrom)).format(dateFormat)} -  ${moment(new Date(dateTo)).format(dateFormat)}.xlsx`, data, options);
                    } else {
                        response.xls(`Laporan Purchase Request -  ${moment(new Date()).format(dateFormat)}.xlsx`, data, options);
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

