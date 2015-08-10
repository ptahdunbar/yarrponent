//

///*
//loadWebApp()
//    .then(login)
//    .then(openUserPreferences)
//    .then(changePassword)
//    .then(null, function(err) {
//      console.error(
//          "An error was thrown! " + err)
//    })
//*/

//var chai        = require('chai'),
//    assert      = chai.assert,
//    webdriverio = require('webdriverio');
//
//describe('my webdriverio tests', function(){
//
//    this.timeout(99999999);
//    var client = {};
//
//    before(function(done){
//            client = webdriverio.remote({ desiredCapabilities: {browserName: 'chrome'} });
//            client.init(done);
//    });
//
//    it('Github test',function(done) {
//        client
//            .url('https://github.com/')
//            .getElementSize('.header-logo-wordmark', function(err, result) {
//                assert.equal(undefined, err);
//                assert.strictEqual(result.height , 26);
//                assert.strictEqual(result.width, 37);
//            })
//            .getTitle(function(err, title) {
//                assert.equal(undefined, err);
//                assert.strictEqual(title,'GitHub · Build software better, together.');
//            })
//            .getCssProperty('a[href="/plans"]', 'color', function(err, result){
//                assert.equal(undefined, err);
//                assert.strictEqual(result.value, 'rgba(64,120,192,1)');
//            })
//            .call(done);
//    });
//
//    after(function(done) {
//        client.end(done);
//    });
//});
