function test(name, path) {
    describe(name, function () {
        require(path);
    })
}

var server = require('./server');

before('initialize server', function (done) {
    server
        .then(uri => {
            console.log(uri);
            done();
        })
        .catch(e => done(e));
})



describe('@dl-purchasing-webapi', function () {
    this.timeout(2 * 60000); 
    //Purchasing
    test("/v1/purchasing/purchase-orders", "./routers/purchasing/purchase-order-router-test");
    test("/v1/purchasing/purchase-order-externals", "./routers/purchasing/purchase-order-external-router-test");
    test("/v1/purchasing/delivery-orders", "./routers/purchasing/delivery-order-router-test");
});
