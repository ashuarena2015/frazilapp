import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import history from './history';
import Profile from './Profile/Profile.container';
import Login from './Login/Login.container';
import EditProfile from './Profile/Edit-profile.container';
import SideMenu from './SideMenu/SideMenu.container';
import About from './About';
import AddChecklists from './AddChecklists/AddChecklists.container';
import AddProject from './AddProject/AddProject.container';
import SeeChecklists from './AddChecklists/SeeChecklists.container';
import EditChecklists from './AddChecklists/EditChecklists.container';

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
				<Route
					exact
					path="/add-project"
					component={
						AddProject
					}
				/>
				<Route
					exact
					path="/see-checklists"
					component={
						SeeChecklists
					}
				/>
				<Route
					exact
					path="/edit-checklists/:projectId"
					component={
						EditChecklists
					}
				/>
			</Switch>
		</HashRouter>
	);
};

export default Root;
