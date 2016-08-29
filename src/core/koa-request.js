var _request = require('request');

function request(uri, options) {
  return function(callback) {
    _request(uri, options, function(error, response, body) {
      callback(error, response);
    })
  }
}

//copy request's properties

for (var attr in _request) {
  if (_request.hasOwnProperty(attr)) {
    if (['get', 'post', 'put', 'patch', 'head', 'del'].indexOf(attr) > -1) {
      //trunkify request's convenience methods
      request[attr] = (function(attr) {
        return function(uri, options) {
          return function(callback) {
            _request[attr](uri, options, function(error, response, body) {
              callback(error, response);
            })
          }
        }
      })(attr);
    } else {
      request[attr] = _request[attr];
    }
  }
}

module.exports = request;
