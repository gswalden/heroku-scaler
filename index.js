module.exports = function(options) {
  options = (typeof options == 'object') ? options : {};

  var appName = options.appName || process.env.APP_NAME;
  if (!appName) {
    console.log('Please set environment variable APP_NAME');
    return;
  }

  var herokuToken = options.herokuToken || process.env.HEROKU_TOKEN;
  if (!herokuToken) {
    console.log('Please set environment variable HEROKU_TOKEN');
    return;
  }

  var arg = options.arg || process.argv.slice(2)[0];
  if (!/^on|off$/i.test(arg)) {
    console.log('Please pass ON or OFF as first argument');
    return;
  }
  arg = (arg.toLowerCase() == 'on') ? 1 : 0;

  var Heroku = require('heroku-client');
  var heroku = new Heroku({ token: herokuToken });

  var data = {
    updates: [
      {
        process: 'web',
        quantity: arg
      }
    ]
  };

  var cb = (typeof options.cb == 'function') ? options.cb : function(err, app) {
    if (err) {
      console.log(err);
    }
  };

  heroku.patch('/apps/' + appName + '/formation', data, cb);
};
