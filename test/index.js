var scaler = require('../');
var should = require('chai').should();

describe('Test a live Heroku app', function() {
  it('scaler should start an app', function(done) {
    scaler({
      arg: 'on',
      cb: function(err, app) {
        should.not.exist(err);
        app[0].should.have.property('quantity', 1);
        done();
      }
    });
  });
  
  it('scaler should stop an app', function(done) {
    scaler({
      arg: 'off',
      cb: function(err, app) {
        should.not.exist(err);
        app[0].should.have.property('quantity', 0);
        done();
      }
    });
  });
  
  after(function(done) {
    scaler({
      arg: 'on',
      cb: function(err, app) {
        if (err) return;
        done();
      }
    });
  });
});
