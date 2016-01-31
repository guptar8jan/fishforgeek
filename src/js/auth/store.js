import { EventEmitter } from 'events';
import React from 'react';
import Data from '../shared/data';
import Config from './config';
import Toastr from '../shared/toastr.js';

class Store extends EventEmitter {
	constructor(options){
		super(options);
		this.user = {};
	}

	fbCheckLoginStatus() {
		console.log('store.fbCheckLoginStatus');
		FB.getLoginStatus(function(response) {
			console.log(response);
			if (response.status === 'connected') {
		      	// Logged into your app and Facebook.
		      	FB.api('/me', {fields: 'email, first_name, last_name'}, function(response2) {
		      		console.log(response2);
		      		this.user.email = response2.email;
		      		this.user.firstName = response2.first_name;
		      		this.user.lastName = response2.last_name;
		      		this.user.authId = response2.id;
		      		this.user.authProvider = "facebook";

		      		Data.get(Config.getSearchUrl(this.user))
		      			.then(function(savedUsers){
		      				if(savedUsers.length == 0) {
		      					Data.post(Config.getPostUrl(), this.user)
	      						.then(function(newUser) {
			      					this.user = newUser;
			      				}.bind(this), (error) => {
			      					Toastr.error("Error while logging in");
			      				});
			      			}
			      			else{
			      				this.user = savedUsers[0];
			      			}
			      			this.emit('fb-logged-in');
	      				}.bind(this));
		      		}.bind(this));
		      }else if (response.status === 'not_authorized') {
	      		// The person is logged into Facebook, but not your app.
				this.emit('fb-not-authorized');
			} else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
				this.emit('fb-login-required');
	  		}
		}.bind(this))
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