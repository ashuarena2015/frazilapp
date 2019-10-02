import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

export function uniqByKeepLast(a, key) {
	return [
		...new Map(
			a.map(x => [key(x), x])
		).values()
	];
}

export default class ProjectInspection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: props.profileInfo.id,
			projectSelected: this.props.match.params.id,
			projectSelectedName: this.props.match.params.project_name,
			displayChecklists: false,
      checklistResult: [],
      checkStatus: false
		};
	}

	componentDidMount() {
		const { user_id, projectSelected } = this.state;
		const payload = {
			projectSelected,
			user_id
		};
		this.props.seeChecklists(payload);
		this.props.dataReset();
	}

	onChange(e) {
		const { target: { checked, id } = { } } = e;
		this.setState({
			checklistResult: [
				...this.state.checklistResult,
				{
					id,
					checked
				}]
		}, () => {
			
		});
	}

	render() {
		const { fetching, projectChecklists } = this.props;
		const { projectSelectedName, displayChecklists, checklistResult, checkStatus } = this.state;

		const allChecklists = [];
		projectChecklists && projectChecklists.map((item, key) => {
			return allChecklists.push(
				<div className="project_inspection_checklists">
					<label key={key}>
						<input name="checklist_action" id={item.id} type="checkbox" onChange={e => this.onChange(e, item.id)} />
						<span key={item.id}>{item.checklist}</span>
					</label>
				</div>
			);
		});

		if (this.props.loginInfo.loginEmail === '' && this.props.loginInfo.logoutSuccess) {
			history.push('/');
		}

		return (
			<React.Fragment>
				<div className="container m-t-50">
		    	<div className="panel panel-default">
		    		<div className="panel-body">
							<h3>Project Inspection</h3>
							<div className="form-group m-b-rg">
								<label>Project</label>
								<b>{ projectSelectedName }</b>
							</div>
							<div className="form-group m-b-rg">
								<h3 style={{ display: 'flex', alignItems: 'center' }}>
									{displayChecklists
										? allChecklists
											? <span style={{ flex: 1, marginRight: '1rem' }}>{allChecklists.length} checklists found</span>
											: <span style={{ flex: 1, marginRight: '1rem' }}>No checklists found!</span>
										: '' }
								</h3>
								{ fetching
									? (
										<div style={{ display: 'flex', justifyContent: 'center' }}><span className="fa fa-spin fa-spinner fa-2x" /></div>
									) : allChecklists }
							</div>
							<div className="form-group m-b-rg">
								<button type="button" className="btn btn-purple-o">Submit Report</button>
								<Link style={{ marginLeft: '0.5rem' }} to="/my-assigned-projects" className="btn btn-redirect-o">Back to my projects</Link>
							</div>
        </div>
       </div>
				</div>
			</React.Fragment>
		);
	}
}
