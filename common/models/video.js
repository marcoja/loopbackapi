'use strict';

module.exports = function(Video) {
  Video.search = function(cb) {
    var response = 'Hello I am the remote method search!';
    cb(null, response);
  };
  Video.remoteMethod('search', {
    http: {path: '/search', verb: 'get'},
    returns: {arg: 'search', type: 'string'},
  });
};
