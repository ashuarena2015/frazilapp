import React from 'react';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom'
import history from './history';
import Profile from './Profile/Profile.container';
import Login from './Login/Login.container';
import EditProfile from './Profile/Edit-profile.container';

const Root = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route
					exact
					path="/"
					component={
						Login
					}
				/>
				<Route
					exact
					path="/profile"
					component={
						Profile
					}
				/>
				<Route
					exact
					path="/edit-profile/:userId"
					component={
						EditProfile
					}
				/>
			</Switch>
		</Router>
	);
};

export default Root;
