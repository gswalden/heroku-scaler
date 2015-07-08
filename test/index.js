var appName = process.env.APP_NAME;
if (!appName) {
  console.log('Please set environment variable APP_NAME');
  return;
}

var herokuToken = process.env.HEROKU_TOKEN;
if (!herokuToken) {
  console.log('Please set environment variable HEROKU_TOKEN');
  return;
}

var scaler = require('../');
var should = require('chai').should();
var Heroku = require('heroku-client');
var heroku = new Heroku({ token: herokuToken });
var state;

describe('Test a live Heroku app', function() {
  before(function(done) {
    heroku.get('/apps/' + appName + '/formation', function(err, app) {
      if (err) should.fail();
      state = (app[0].quantity === 1) ? 'on' : 'off';
      done();
    });
  });

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
      arg: state,
      cb: function(err, app) {
        if (err) return;
        done();
      }
    });
  });
});
