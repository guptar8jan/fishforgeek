import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import ProfileComponent from './profile.js';
import NotFound from '../shared/notfound.jsx';
import { hashHistory } from 'react-router';

export default class ProfileComponentRouter extends React.Component {
	render(){
		return (
				<Router history={ hashHistory }>
						<Route path="/" component={ProfileComponent}>
							<Route path="*" component={NotFound} />
						</Route>
				</Router>
		);
	}
}
