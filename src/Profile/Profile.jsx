import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import history from '../history';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.cameraPhoto = null;
		this.videoRef = React.createRef();
		this.state = {
			imagePreviewUrl: '',
			uploadImgMsg: false,
			currentUploadedImg: '',
			isCapture: false,
		};
		this.cancelImgUpload = this.cancelImgUpload.bind(this);
		this.cropImage = this.cropImage.bind(this);
		this.onChangeCrop = this.onChangeCrop.bind(this);
	}

	componentDidMount() {
		const { loginEmail, loginId } = this.props.loginInfo;
		const profileData = {
			loginEmail,
			loginId
		};
		this.props.getProfileInfo(profileData);
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
			this.setState({ src: reader.result });
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
			this.setState({
				imagePreviewUrl: this.cropper.getCroppedCanvas().toDataURL(),
				uploadImgBtn: true,
				cancelImg: true,
				uploadImgMsg: false
			});
		});
	}

	_handleSubmit(e) {
		e.preventDefault();
		const profileImage = this.state.imagePreviewUrl;
		const userId = this.props.profileInfo.id;
		if (this.state.imagePreviewUrl) {
			fetch(`${APP_URL}/profile-image.php`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `profile-image=${profileImage}&user-id=${userId}`,
			}).then((response) => {
				return response.json();
			}).then((json) => {
				if (json) {
					this.setState({
						uploadImgBtn: false,
						cancelImg: false,
						uploadImgMsg: true,
						currentUploadedImg: `${APP_URL}/json`
					});
				}
			});
		}
	}

	cancelImgUpload() {
		const { currentUploadedImg } = this.state;
		this.setState({
			imagePreviewUrl: currentUploadedImg,
			uploadImgBtn: false,
			cancelImg: false,
			uploadImgMsg: false
		});
	}

	render() {
		const { name, email, mobile, profile_img, user_id } = this.props.profileInfo || {};

		const { uploadImgMsg, isCapture } = this.state;

		let imagePreview;
		const { imagePreviewUrl } = this.state;
		const imagePath = `${APP_URL}/`;
		const prevProfileImg = profile_img;
		if (imagePreviewUrl) {
			imagePreview = <img src={imagePreviewUrl} />;
		} else {
			imagePreview = <img src={`${imagePath}${prevProfileImg}`} />;
		}

		if (this.props.loginInfo.loginEmail === '' && this.props.loginInfo.logoutSuccess) {
			history.push('/');
		}

		return (
			<div className="profile__section">
				<div id="takePhotoByCamera" className={isCapture ? 'cameraOn' : ''}>
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
				<div className="container vertical-center-box">
					<div className="panel panel-default transparent-bg-box profile-page">
						<div className="panel-body">
							{!name && (
								<div className="text-center">
									<span className="fa fa-spin fa-spinner fa-3x m-t-rg" />
								</div>
							)}
							<div className="panel_section">
								<div className="profile-img">
									{imagePreview}
									<div className="photo-edit">
										<span className="fa fa-camera" />
										<input type="file" onChange={this.onChangeCrop} />
									</div>
								</div>
								<div className="previewComponent text-center">
									<form onSubmit={e => this._handleSubmit(e)}>
										{uploadImgMsg && <p className="show">Profile picture upload successfully!</p>}
										<div className="btn-group" style={{ marginTop: '5px' }}>
											<button className={this.state.uploadImgBtn ? 'btn btn-sm btn-success' : 'hide'} type="submit" onClick="">Upload</button>
											<button type="button" onClick={this.cancelImgUpload} className={this.state.cancelImg ? 'btn btn-sm btn-danger' : 'hide'}>Cancel</button>
										</div>
									</form>
								</div>

								<div className="panel-row panel-row-group m-t-rg m-b-rg">
									<div className="row-item">
										<span className="fa fa-user fa-stack label" />
										<span className="label-value">{name}</span>
									</div>
									<div className="row-item">
										<span className="fa fa-envelope fa-stack label" />
										<span className="label-value">{email}</span>
									</div>
									<div className="row-item">
										<span className="fa fa-phone fa-stack label" />
										<span className="label-value">{mobile}</span>
									</div>
								</div>

								<div className="text-center m-b-lg">
									<Link to={`/edit-profile/${user_id}/`} className="btn btn-purple-o">Edit profile</Link>
								</div>

							</div>

							<div className="panel_section">
		    			<div className="panel-row panel-row-group m-t-rg m-b-rg">
			    			<div onClick="" className="row-item" style={{ background: '#66a430', color: '#fff', border: 'none' }}>
			    				<span className="label-value">Report Submitted</span>
			    				<div className="counts">4</div>
			    				<span className="fa fa-stack fa-arrow-right goto-link" />
		    				</div>
		    				<div onClick="" className="row-item" style={{ background: '#3065a4', color: '#fff', border: 'none' }}>
			    				<span className="label-value">Site Visited</span>
			    				<div className="counts">5</div>
			    				<span className="fa fa-stack fa-arrow-right goto-link" />
		    				</div>
		    			</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
