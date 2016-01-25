import React from 'react';
import ReactDom from 'react-dom';
import {store, dispatch} from './store.js';
import FacebookLogin from 'react-facebook-login';

export default class UserComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: store.user,
      message: 'hello!!!!'
    };
    store.on('fb-logged-in', function(){
      this.state.message = 'Thanks for logging in ' + this.state.user.first_name + "!";
      this.forceUpdate();
    }.bind(this));

    store.on('fb-not-authorized', function(){
      this.state.message = 'Not authorized';
      this.forceUpdate();
    }.bind(this));

    store.on('fb-login-required', function(){
      this.state.message = 'Please login!';
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