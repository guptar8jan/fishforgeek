import React from 'react';
import ReactDom from 'react-dom';
import {store, dispatch} from './store.js';
import FacebookLogin from 'react-facebook-login';
import Toastr from '../shared/toastr.js';
import Router from 'react-router';
import { Route, RouteHandler, DefaultRoute, State, Link, Redirect } from 'react-router';

export default class AuthComponent extends React.Component {
  
  constructor(props, context){
    super(props, context);
    
    this.state = {
      user: store.user
    };
    
    store.on('fb-logged-in', function(){
      Toastr.success("Thanks for logging in " + this.state.user.firstName);
      this.forceUpdate();
      console.log(this.context.router);
      this.context.router.transitionTo('/profile')
      //this.props.history.pushState(null, '/profile')
      //this.context.router.push('/profile/profile');
    }.bind(this));

    store.on('fb-not-authorized', function(){
      Toastr.error("Not authorized.");
      this.forceUpdate();
    }.bind(this));

    store.on('fb-login-required', function(){
      Toastr.error("Please login.");
      this.forceUpdate();
    }.bind(this));
  };

  checkLoginState() {
    console.log('checkLoginState before dispatch');
    dispatch('FB.checkLoginStatus');
  };

  render(){
    return (
        <div>
          <FacebookLogin
            appId="827044444107511"
            autoLoad={true}
            callback={this.checkLoginState.bind(this)} />
          <div id="status">{this.state.message}</div>
        </div>
    );
  }
}

AuthComponent.contextTypes = {
  router: function contextType() {
    return React.PropTypes.func.isRequired;
  }
};