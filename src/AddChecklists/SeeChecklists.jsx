import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

export default class SeeChecklists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: props.profileInfo.id,
			projectSelected: '',
			displayChecklists: false
		};
	}

	componentDidMount() {
		this.props.getProjects();
		this.props.dataReset();
	}

	onChange(e) {
		const { target: { value, name } = { } } = e;
		this.setState({
			[name]: value
		}, () => {
			const { user_id, projectSelected } = this.state;
			const payload = {
				user_id,
				projectSelected
			};
			this.props.seeChecklists(payload);
			this.setState({ displayChecklists: true });
		});
	}

	render() {
		const { fetching, frazilProjects, projectChecklists } = this.props;
		const { projectSelected, displayChecklists } = this.state;
		const allProjects = [];
		frazilProjects.length && frazilProjects.map((project) => {
			return allProjects.push(<option value={project.id}>{project.name}</option>);
		});

		const allChecklists = [];
		projectChecklists && projectChecklists.map((item) => {
			return allChecklists.push(<li key={item.id}>{item.checklist}</li>);
		});

		if (this.props.loginInfo.loginEmail === '' && this.props.loginInfo.logoutSuccess) {
			history.push('/');
		}

		return (
			<React.Fragment>
				<div className="container m-t-50">
		    	<div className="panel panel-default">
		    		<div className="panel-body">
							<h3>Checklists</h3>
							<div className="form-group m-b-rg">
								<label>Select Project</label>
								<select name="projectSelected" className="form-control" style={{ height: '40px' }} onChange={e => this.onChange(e)}>
									<option value="">Select project</option>
									{ allProjects }
									<Link to="/add-project" className="btn btn-redirect-o">Add Project</Link>
								</select>
							</div>
							<div>
								<h3 style={{ display: 'flex', alignItems: 'center' }}>
									{displayChecklists
										? allChecklists
											? <span style={{ flex: 1, marginRight: '1rem' }}>{allChecklists.length} checklists found</span>
											: <span style={{ flex: 1, marginRight: '1rem' }}>No checklists found!</span>
										: '' }
									{ allChecklists.length ? <Link to={`/edit-checklists/${projectSelected}`} className="btn btn-edit-o">Edit</Link> : ''}
								</h3>
								{ fetching
									? (
										<div style={{ display: 'flex', justifyContent: 'center' }}><span className="fa fa-spin fa-spinner fa-2x" /></div>
									) : allChecklists }
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
