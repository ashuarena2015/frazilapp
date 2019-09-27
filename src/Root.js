import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import history from './history';
import Profile from './Profile/Profile.container';
import Login from './Login/Login.container';
import EditProfile from './Profile/Edit-profile.container';
import SideMenu from './SideMenu/SideMenu.container';
import About from './About';
import AddChecklists from './AddChecklists/AddChecklists.container';

const Root = () => {
	return (
		<HashRouter history={history}>
			<SideMenu />
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
				<Route
					exact
					path="/about"
					component={
						About
					}
				/>
				<Route
					exact
					path="/add-checklists"
					component={
						AddChecklists
					}
				/>
			</Switch>
		</HashRouter>
	);
};

export default Root;
