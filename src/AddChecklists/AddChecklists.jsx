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

export default class AddChecklists extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: '',
			tags: [],
			suggestions: [],
			projectSelected: '',
			projectSelectedEmpty: false,
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
	}

	componentDidMount() {
		this.props.getProjects();
		this.props.dataReset();
	}

	componentDidUpdate(prevProps) {
		prevProps.frazilProjects !== this.props.frazilProjects && this.setState({
			projects: this.props.frazilProjects
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
		const { addChecklists, profileInfo: { id } = {} } = this.props;
		const payload = {
			tags,
			projectSelected,
			user_id: id
		};
		if (projectSelected && tags.length) {
			addChecklists(payload);
			this.setState({ projectSelectedEmpty: false });
		} else {
			this.setState({ projectSelectedEmpty: true });
		}
	}

	render() {
		const { projects, tags, suggestions, projectSelectedEmpty } = this.state;
		const allProjects = [];
		projects && projects.map((project) => {
			return allProjects.push(<option value={project.id}>{project.name}</option>);
		});
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
							<h3>Add Checklists</h3>
							{ saveDataSuccessFully && (
								<div style={{ marginBottom: '2rem' }}>
									<p className="text-success">Checklists addedd successfully!</p>
									<p><Link to="/see-checklists" className="btn btn-redirect-o">See checklists</Link></p>
								</div>
							)}
							<div className="form-group m-b-rg">
								<label>Select Project</label>
								<select name="projectSelected" className="form-control" style={{ height: '40px' }} onChange={e => this.onChange(e)}>
									<option value="">Select project</option>
									{ allProjects }
									<Link to="/add-project" className="btn btn-redirect-o">Add Project</Link>
								</select>
								{ projectSelectedEmpty && (
									<div>
										<small className="text-error">Please enter project name</small>
									</div>
								)}
							</div>
							<div className="form-group m-b-rg">
								<label>Enter Checklists</label>
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
								<button type="button" className="btn btn-purple-o" onClick={() => this.checklistInputFieldsAdd()}>Submit</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
