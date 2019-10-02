import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

export default class AssignProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			assigned_by: props.loginInfo.loginId,
			user_id: props.match.params.userId,
			projectSelected: ''
		};
	}

	componentDidMount() {
		const { dataReset, getSelectedProfileInfo, getProjects, match: { params: { userEmail, userId } = {} } } = this.props;
		const profileData = {
			loginEmail: userEmail,
			loginId: userId
		};
		getSelectedProfileInfo(profileData);
		getProjects();
		dataReset();
	}

	onChange(e) {
		const { target: { value, name } = { } } = e;
		this.setState({
			[name]: value
		});
	}

	assignProject() {
		const { projectSelected, assigned_by, user_id } = this.state;
		const payload = {
			project_id: projectSelected,
			user_id,
			assigned_by
		};
		this.props.assignProject(payload);
	}

	render() {
		const { saveDataSuccessFully, fetching, frazilProjects, selectedUserProfile, selectedUserProfile: { name, profile_img } = {} } = this.props;
		const allProjects = [];
		frazilProjects.length && frazilProjects.map((project) => {
			return allProjects.push(<option value={project.id}>{project.name}</option>);
		});

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
					<h3>Assign project to</h3>
					{ selectedUserProfile && (
						<div className="assign_to_user">
							<div className="user_img">
								<img src={`${APP_URL}/${profile_img}`} />
							</div>
							<div className="user_info">
								<p className="name">{name}</p>
							</div>
						</div>
					)}
					{ saveDataSuccessFully && (
						<div style={{ marginBottom: '2rem' }}>
							<p className="text-success">Checklists addedd successfully!</p>
						</div>
					)}
					<div className="form-group m-b-rg">
						<label>Select Project</label>
						<select name="projectSelected" className="form-control" style={{ height: '40px' }} onChange={e => this.onChange(e)}>
							<option value="">Select project</option>
							{ allProjects }
						</select>
					</div>
					<div className="form-group m-b-rg">
						<button type="button" onClick={() => this.assignProject()} className="btn btn-purple-o">Assign</button>
						<Link style={{ marginLeft: '1rem' }} to="/users" className="btn btn-redirect-o">Back to users</Link>
					</div>
				</div>
			</div>
		);
	}
}
