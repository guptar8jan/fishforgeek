/**
 *
 *	TODO: simplify and seperate data concerns into seperate files
 *  TODO: implement React data provider
 *  TODO: global error handling with custom suppress option
 *
 *  API USAGE:
 *
 *  TODO: document
 *  options:
 *     useDefaultErrorHandling: {false} - set to true to use toast error handling
 */
import $ from 'jquery';
import Toastr from './toastr.js';

module.exports = (function data() {

  // Common Options
  var genericAjaxSuccessMsg = 'Request was successful',
      genericAjaxErrorMsg = 'An error happened while fetching data for this page. If the error persists, please contact support.';

  // Get Success Message
  function getSuccessMessage(results){
    if(results && results.responseJSON && results.responseJSON.messages){
      if($.isArray(results.responseJSON.messages)){
        return results.responseJSON.messages.join('<br />');
      }
      return results.responseJSON.messages;
    }
    return genericAjaxSuccessMsg;
  }

  // Get Error Message
  function getErrorMessage(results){
    if (results && results.responseJSON && results.responseJSON.errors)
    {
      if($.isArray(results.responseJSON.errors)){
        return results.responseJSON.errors.join('<br />');
      }
      return results.responseJSON.errors;
    }
    return genericAjaxErrorMsg;
  }

  // Begin Core CRUD API (get, create, update, remove);
  function _executeRequest(type, url, params, options){
    var reject,
        resolve,
        requestPromise = new Promise(function(_resolve, _reject){
          resolve = _resolve;
          reject = _reject;
        }),
        requestOptions = {
          url:url,
          data:params || {},
          type:type
        };

    if(type === 'PUT' || type === 'POST' || type === 'DELETE'){
      requestOptions.contentType = 'application/json; charset=utf-8';
      requestOptions.dataType = 'json';
      requestOptions.data = JSON.stringify(requestOptions.data);
    }

    $.ajax(requestOptions).then(function(results, statusCode, response) {
      if (!this._fulfillmentHandler0) {
        this._fulfillmentHandler0 = function(){
          Toastr.success(getSuccessMessage(results));
        };
      }
      resolve(results, statusCode, response);
    }.bind(requestPromise), function(results){
      if (!this._rejectionHandler0) {
        this._rejectionHandler0 = function() {
          Toastr.error(getErrorMessage(results));
        };
      }
      reject(getErrorMessage(results));
    }.bind(requestPromise));

    return requestPromise;
  }

  /**
  	*	get()
  	*/
  function get(url, params, options) {
    return _executeRequest('GET', url, params, options);
  }

  /**
  	 *	create()
  	 */
  function create(url, model, options) {
    return _executeRequest('POST', url, model, options);
  }

  /**
  	 *	update()
  	 */
  function update(url, model, options) {
    return _executeRequest('PUT', url, model, options);
  }

  /**
  	 *	remove()
  	 */
  function remove(url, model, options) {
    return _executeRequest('DELETE', url, model, options);
  }

  return {
    get:get,
    create:create,
    post:create,
    update:update,
    remove:remove
  };

}());
