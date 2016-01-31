import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import AuthComponent from './auth.js';
import NotFound from '../shared/notfound.jsx';
import { hashHistory } from 'react-router';

export default class AuthComponentRouter extends React.Component {
	render(){
		return (
				<Router history={ hashHistory }>
						<Route path="/" component={AuthComponent}>
							<Route path="*" component={NotFound} />
						</Route>
				</Router>
		);
	}
}
