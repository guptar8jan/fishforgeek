import React from 'react';
import ReactDom from 'react-dom';
import Toastr from '../shared/toastr.js';

export default class ProfileComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: store.user
    };
  };

  render(){
    return (
        <div>
          <img src="//graph.facebook.com/{this.state.user.authId}/picture?type=large" />
        </div>
    );
  }
}