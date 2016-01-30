import { EventEmitter } from 'events';
import React from 'react';

class Store extends EventEmitter {
	constructor(options){
		super(options);
		this.user = {};
	}

	fbCheckLoginStatus() {
		console.log('store.fbCheckLoginStatus');
		var that = this;
		FB.getLoginStatus(function(response) {
			console.log(response);
			if (response.status === 'connected') {
		      	// Logged into your app and Facebook.
		      	FB.api('/me', {fields: 'email, first_name, last_name'}, function(response2) {
		      		console.log(response2);
		      		that.user.email = response2.email;
		      		that.user.first_name = response2.first_name;
		      		that.user.last_name = response2.last_name;
		      		that.user.authId = response2.id;
		      		that.user.authProvider = "facebook"
		      		that.emit('fb-logged-in');
		      	});
		    } else if (response.status === 'not_authorized') {
	      		// The person is logged into Facebook, but not your app.
				that.emit('fb-not-authorized');
			} else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
				that.emit('fb-login-required');
	  		}
		})
	};
}

var store = new Store();

function dispatch(action, data){
	switch(action){
		case 'FB.checkLoginStatus':
			store.fbCheckLoginStatus();
			break;
		default:
			console.warn("dispatcher was called with unknown action:", action, data);
	}
}

export {store, dispatch};