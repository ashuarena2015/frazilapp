import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import history from '../history';

export default class MyAssignedProject extends Component {
	componentDidMount() {
		const { dataReset, getMyAssignedProjects, profileInfo: { id } = {}, getMySubmitReports } = this.props;
		getMyAssignedProjects(id);
		getMySubmitReports(id);
		dataReset();
	}

	onChange(e) {
		const { target: { value, name } = { } } = e;
		this.setState({
			[name]: value
		});
	}

	render() {
		const { fetching, myAssignedProject, loginInfo: { loginEmail, logoutSuccess } = {} } = this.props;
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
					<h3>My assigned project</h3>
					{ myAssignedProject ? myAssignedProject.map((project) => {
						return (
							<div className="users_list">
								<div className="user_info">
									<p className="name">{project.name}</p>
									<p>Assigned date: <b>{ project.assigned_date }</b> </p>
									<p>
										{project.completed_date === '0000-00-00' ? (
											<React.Fragment>
												<Link to={`/project-inspection/${project.id}/${project.name}/${project.assigned_by}/${project['0']}`} className="btn btn-sm btn-purple-o">Start Inspection</Link>
												<Link style={{ marginLeft: '0.5rem' }} to={`/assign-project/${project.id}/`} className="btn btn-sm btn-dark-o">Deny</Link>
											</React.Fragment>
										) : (<b>Project report has submitted on {project.completed_date}</b>)}
									</p>
								</div>
							</div>
						);
					}) : 'No project assigned to you!' }
				</div>
			</div>
		);
	}
}
