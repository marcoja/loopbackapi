'use strict';
var chalk = require('chalk');
module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */

  app.models.Video.observe('access', function(ctx, next) {
    var output = chalk.yellow('Access operation hook for /Videos');
    console.log(output);
    next();
  });

  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
