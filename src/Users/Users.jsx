import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import history from '../history';

export default class Users extends Component {
	componentDidMount() {
		this.props.allUsers();
	}

	render() {
		const { allUsers, fetching, loginEmail, logoutSuccess } = this.props.loginInfo;

		if (loginEmail === '' && logoutSuccess) {
			history.push('/');
		}

		return (
			<div className="panel">
				{ fetching && (
					<Loader
						loaderContainer="loader-fixed"
						loaderColor="#fff"
						loaderSize="loader__icon_small"
						loaderPosition="center"
					/>
				) }
				<div className="panel-body">
					<h3>All users</h3>
					{ allUsers && allUsers.filter(user => user.role !== 1).map((user) => {
						return (
							<div className="users_list">
								<div className="user_img">
									<img src={`${APP_URL}/${user.profile_img}`} />
								</div>
								<div className="user_info">
									<p className="name">{user.name}</p>
									<p>Mob: {user.mobile}</p>
									<p><Link to={`/assign-project/${user.id}/${user.email}`} className="btn btn-sm btn-redirect-o">Assign project</Link></p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
