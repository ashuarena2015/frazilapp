import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import Loader from '../Loader';

export default class AddProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectName: '',
			projectNameEmpty: false
		};
	}

	componentDidMount() {
		this.props.dataReset();
	}

	onChange(e) {
		const { target: { value, name } = { } } = e;
		this.setState({
			[name]: value
		});
	}

	saveProject() {
		const { projectName } = this.state;
		const { addProject, profileInfo: { id } = {} } = this.props;
		if (projectName) {
			const payload = {
				projectName,
				user_id: id
			};
			addProject(payload);
			this.setState({ projectNameEmpty: false });
		} else {
			this.setState({ projectNameEmpty: true });
		}
	}

	render() {
		const { projectNameEmpty } = this.state;
		const { saveDataSuccessFully, fetching } = this.props;

		if (this.props.loginInfo.loginEmail === '' && this.props.loginInfo.logoutSuccess) {
			history.push('/');
		}

		return (
			<React.Fragment>
				{ fetching && (
					<Loader
						loaderContainer="loader-fixed"
						loaderColor="#fff"
						loaderSize="loader__icon_small"
						loaderPosition="center"
					/>
				) }
				<div className="container m-t-50">
		    	<div className="panel panel-default">
		    		<div className="panel-body">
							<h3>Add Project</h3>
							{ saveDataSuccessFully && (
								<div style={{ marginBottom: '2rem' }}>
									<p className="text-success">Project name added successfully!</p>
									<p><Link to="/add-checklists" className="btn btn-redirect-o">Add checklists</Link></p>
								</div>
							)}
							<div className="form-group m-b-rg">
								<label>Enter project name</label>
								<input type="text" name="projectName" className="form-control" onChange={e => this.onChange(e)} />
								{ projectNameEmpty && (
									<div>
										<small className="text-error">Please enter project name</small>
									</div>
								)}
							</div>
							<div className="form-group m-b-rg">
								<button type="button" className="btn btn-purple-o" onClick={() => this.saveProject()}>Save project</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
