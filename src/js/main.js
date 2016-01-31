import Auth from './auth/auth';
import Profile from './profile/profile';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import NotFound from './shared/NotFound.jsx';

ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Auth}>
      <Route path="profile" component={Profile}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>, document.getElementById('main'));