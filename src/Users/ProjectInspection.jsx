import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import history from '../history';
import Loader from '../Loader';

export function checkListAnswered(obj, matchId) {
	if (obj.length) {
		if (obj.some(item => item.id === matchId && item.checked && item.answered === 1)) {
			return true;
		}
		return false;
	}
}

export function findIdInAnswer(obj, matchId) {
	if (obj.length) {
		if (obj.some(item => item.id === matchId)) {
			return true;
		}
		return false;
	}
}

export default class ProjectInspection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: props.profileInfo.id,
			projectSelected: this.props.match.params.id,
			projectSelectedName: this.props.match.params.project_name,
			assigned_by: this.props.match.params.assigned_by,
			assigned_project_id: this.props.match.params.assigned_project_id,
			checklistResult: [],
			listResult: [],
			isCapture: false,
			imagePreviewUrl: []
		};
		this.cropImage = this.cropImage.bind(this);
		this.onChangeCrop = this.onChangeCrop.bind(this);
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
		const { target: { checked, id, name } = { } } = e;
		this.setState({
			[name]: checked,
			checklistResult: [
				{
					id: parseInt(id),
					checked,
					answered: 1
				},
				...this.state.checklistResult
			]
		}, () => {
			this.setState({
				listResult: _.uniqBy(this.state.checklistResult, 'id')
			});
		});
	}

	onInputChange(e) {
		const { target: { name, value } = { } } = e;
		this.setState({
			[name]: value,
		});
	}

	onChangeCrop(e) {
		this.setState({
			isCapture: true
		});
		e.preventDefault();
		let files;
		const { dataTransfer, dataTransfer: { files: FilesDataTransfer } = {}, target, target: { files: filesTarget } } = e;
		if (dataTransfer) {
			files = FilesDataTransfer;
		} else if (target) {
			files = filesTarget;
		}
		const reader = new FileReader();
		reader.onload = () => {
			this.setState({
				src: reader.result
			});
		};
		reader.readAsDataURL(files[0]);
	}

	cropImage() {
		if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
			return;
		}
		this.setState({
			isCapture: false
		}, () => {
			this.setState(prevState => ({
				imagePreviewUrl: [
					{
						imageCorpperPath: this.cropper.getCroppedCanvas().toDataURL()
					},
					...prevState.imagePreviewUrl
				]
			}));
		});
	}

	submitReport() {
		const submitReport = window.confirm('Do you want to submit the report?');
		if (submitReport) {
			const payload = {
				remarks: this.state.remarks,
				project_photos: this.state.imagePreviewUrl,
				checklistResult: _.sortBy(this.state.listResult, ['id']),
				project_id: parseInt(this.state.projectSelected),
				user_id: parseInt(this.state.user_id),
				assigned_by: parseInt(this.state.assigned_by),
				assigned_project_id: parseInt(this.state.assigned_project_id)
			};
			this.props.submitReport(payload);
		}
	}

	render() {
		const { fetching, projectChecklists, saveDataSuccessFully, saveDataFailed, loginInfo: { loginEmail, logoutSuccess } = {} } = this.props;
		const { projectSelectedName, listResult, isCapture } = this.state;
		const shortedCheckListResult = _.sortBy(listResult, ['id']);
		const allChecklists = [];
		projectChecklists && projectChecklists.map((item, key) => {
			return allChecklists.push(
				<label key={key}>
					<input name={`checklist_action_${item.id}`} id={item.id} type="checkbox" onChange={e => this.onChange(e, item.id)} />
					<span style={{ lineHeight: '1.25rem' }}>{item.checklist}</span>
					<span
						style={{ textAlign: 'right', flex: 1 }}
						className={`fa fa-lg ${this.state[`checklist_action_${item.id}`]
							? 'fa-check text-success'
							: (!findIdInAnswer(shortedCheckListResult, item.id) && this.state[`checklist_action_${item.id}`] === undefined) ? 'fa-ban text-slate' : 'fa-times text-error'}`}
					/>
				</label>
			);
		});

		if (loginEmail === '' && logoutSuccess) {
			history.push('/');
		}

		const { imagePreviewUrl } = this.state;
		const imagePreview = [];
		imagePreviewUrl && imagePreviewUrl.map((img, key) => {
			return imagePreview.push(<div id={key}><img src={`${imagePreviewUrl[key] && imagePreviewUrl[key].imageCorpperPath}`} /></div>);
		});

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
				<div id="takePhotoByCamera" className={isCapture && 'cameraOn'}>
					<Cropper
						style={{ height: '100%', width: '100%' }}
						aspectRatio={1 / 1}
						guides={false}
						src={this.state.src}
						ref={(cropper) => { this.cropper = cropper; }}
					/>
					<div style={{ margin: '2rem auto', position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }}>
						<button type="button" onClick={this.cropImage} className="btn btn-purple-o" style={{ float: 'right' }}>
              Crop Image
						</button>
					</div>
				</div>
				<div className="container m-t-50">
		    	<div className="panel panel-default">
		    		<div className="panel-body">
							<h3>Project Inspection</h3>
							{ saveDataSuccessFully && !saveDataFailed ? (
								<React.Fragment>
									<h4 className="text-success">Project report submitted successfully!</h4>
									<Link to="/my-assigned-projects" className="btn btn-redirect-o">Back to my projects</Link>
								</React.Fragment>
							) : (
								<React.Fragment>
									{saveDataFailed && <h4 className="text-error">We found some issue, Please try to submit report again</h4>}
									<div className="form-group m-b-rg">
										<label>Project</label>
										<p style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0' }}>{ projectSelectedName }</p>
									</div>
									<div className="form-group m-b-rg">
										<h3>
											<div>{projectChecklists.length} Checklists</div>
											{listResult.length !== projectChecklists.length ? (
												<p style={{ fontSize: '1rem', fontWeight: 'normal', margin: '0.5rem 0 0' }}><b>{listResult.length}</b>, You answered</p>
											)
												: <p style={{ fontSize: '1rem', fontWeight: 'normal', margin: '0.5rem 0 0' }}>You answered all of them. now you can submit the report with some remoarks.</p>}
										</h3>
										{ fetching
											? (
												<div style={{ display: 'flex', justifyContent: 'center' }}><span className="fa fa-spin fa-spinner fa-2x" /></div>
											) : (
												<div className="project_inspection_checklists" style={{ maxHeight: '265px', overflow: 'auto' }}>
													{allChecklists}
												</div>
											) }
									</div>
									<div className="form-group m-b-rg">
										{listResult.length === projectChecklists.length && (
											<React.Fragment>
												<label>Remarks</label>
												<textarea name="remarks" onChange={e => this.onInputChange(e)} className="form-control" style={{ marginBottom: '1rem' }} />
												<label>Attach Photos</label>
												<div className="project_photos_uploads">
													{imagePreview}
												</div>
												<input type="file" onChange={this.onChangeCrop} style={{ marginBottom: '1rem' }} />
												<button type="button" onClick={() => this.submitReport()} className="btn btn-purple-o">Submit Report</button>
											</React.Fragment>
										)}
										<Link style={{ marginLeft: '0.5rem' }} to="/my-assigned-projects" className="btn btn-redirect-o">Back to my projects</Link>
									</div>
								</React.Fragment>
							)}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
