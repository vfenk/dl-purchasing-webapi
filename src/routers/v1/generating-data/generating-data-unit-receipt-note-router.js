var Router = require('restify-router').Router;
var db = require("../../../db");
var UnitReceiptNoteManager = require("dl-module").managers.purchasing.UnitReceiptNoteManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get('/', passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new UnitReceiptNoteManager(db, request.user);

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
                            var _item = {
                                "NOMOR BON TERIMA UNIT": _data.no,
                                "TANGGAL BON TERIMA UNIT": moment(new Date(_data.date)).format(dateFormat),
                                "BAGIAN": _data.unit.division.name + " - " + _data.unit.name,
                                "KODE SUPPLIER": _data.supplier.code,
                                "NAMA SUPPLIER": _data.supplier.name,
                                "NOMOR SURAT JALAN": _data.deliveryOrder.no,
                                "KETERANGAN": _data.remark,
                                "KODE BARANG": item.product.code,
                                "NAMA BARANG": item.product.name,
                                "JUMLAH BARANG": item.deliveredQuantity,
                                "SATUAN BARANG": item.deliveredUom.unit,
                                "KETERANGAN BARANG": item.remark
                            }
                            data.push(_item);
                        }
                    }
                    var options = {
                        "NOMOR BON TERIMA UNIT": "string",
                        "TANGGAL BON TERIMA UNIT": "date",
                        "BAGIAN": "string",
                        "KODE SUPPLIER": "string",
                        "NAMA SUPPLIER": "string",
                        "NOMOR SURAT JALAN": "string",
                        "KETERANGAN": "string",
                        "KODE BARANG": "string",
                        "NAMA BARANG": "string",
                        "JUMLAH BARANG": "number",
                        "SATUAN BARANG": "string",
                        "KETERANGAN BARANG": "string"
                    };

                    if (data.length === 0) {
                        var _item = {
                            "NOMOR BON TERIMA UNIT": "",
                            "TANGGAL BON TERIMA UNIT": "",
                            "BAGIAN": "",
                            "KODE SUPPLIER": "",
                            "NAMA SUPPLIER": "",
                            "NOMOR SURAT JALAN": "",
                            "KETERANGAN": "",
                            "KODE BARANG": "",
                            "NAMA BARANG": "",
                            "JUMLAH BARANG": "",
                            "SATUAN BARANG": "",
                            "KETERANGAN BARANG": ""
                        }
                        data.push(_item);
                    }
                    if (dateFrom && dateTo) {
                        response.xls(`Laporan Bon Terima -  ${moment(new Date(dateFrom)).format(dateFormat)} -  ${moment(new Date(dateTo)).format(dateFormat)}.xlsx`, data, options);
                    } else {
                        response.xls(`Laporan Bon Terima -  ${moment(new Date()).format(dateFormat)}.xlsx`, data, options);
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

