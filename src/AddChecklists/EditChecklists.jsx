import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { Link } from 'react-router-dom';
import history from '../history';
import Loader from '../Loader';

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class EditChecklists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: props.profileInfo.id,
			projectSelected: '',
			projectChecklists: props.projectChecklists,
			tags: [],
			suggestions: [],
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
	}

	componentDidMount() {
		this.props.getProjects();
		this.props.dataReset();
		const { user_id } = this.state;
		this.setState({
			projectSelected: this.props.match.params.projectId
		}, () => {
			const { projectSelected, projectChecklists } = this.state;
			const payload = {
				user_id,
				projectSelected
			};
			!projectChecklists && this.props.seeChecklists(payload);
		});
	}

	onChange(e) {
		const { target: { value, name } = { } } = e;
		this.setState({
			[name]: value
		});
	}

	handleDelete(i) {
		const { tags } = this.state;
		this.setState({
			tags: tags.filter((tag, index) => index !== i),
		});
	}

	handleAddition(tag) {
		this.setState(state => ({ tags: [...state.tags, tag] }));
	}

	handleDrag(tag, currPos, newPos) {
		const tags = [...this.state.tags];
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		// re-render
		this.setState({ tags: newTags });
	}

	checklistInputFieldsAdd() {
		const { tags, projectSelected } = this.state;
		const { editChecklists, profileInfo: { id } = {} } = this.props;
		const payload = {
			tags,
			projectSelected,
			user_id: id
		};
		projectSelected && tags.length && editChecklists(payload);
	}

	render() {
		const { fetching, frazilProjects, projectChecklists, saveDataSuccessFully } = this.props;
		const { projectSelected, tags, suggestions } = this.state;
		const projectName = [];
		frazilProjects.length && frazilProjects.map((project) => {
			return projectName.push(project.id === projectSelected && project.name);
		});

		projectChecklists && projectChecklists.map((item) => {
			return tags.push(
				{ id: item.checklist, text: item.checklist }
			);
		});

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
							<h3>Checklists</h3>
							{ saveDataSuccessFully && (
								<div style={{ marginBottom: '2rem' }}>
									<p className="text-success">Checklists updated successfully!</p>
									<p><Link to="/see-checklists" className="btn btn-redirect-o">See checklists</Link></p>
								</div>
							)}
							<div className="form-group m-b-rg">
								<label>Project</label>
								<div><b>{ projectName }</b></div>
							</div>
							<div className="form-group m-b-rg">
								<h3 style={{ display: 'flex', alignItems: 'center' }}>
									<span style={{ flex: 1, marginRight: '1rem' }}>{tags.length} Saved checklists</span>
									<Link to="/see-checklists" className="btn btn-redirect-o">Back to checklists</Link>
								</h3>
								<div id="all_checklists" className="checklist_input_section">
									<ReactTags
										tags={tags}
										suggestions={suggestions}
										handleDelete={this.handleDelete}
										handleAddition={this.handleAddition}
										handleDrag={this.handleDrag}
										delimiters={delimiters}
									/>
								</div>
							</div>
							<div className="form-group m-b-rg">
								<button type="button" className="btn btn-purple-o" onClick={() => this.checklistInputFieldsAdd()}>Save Checklists</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
