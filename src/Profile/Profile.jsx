import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import history from '../history';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      imagePreviewUrl: '',
      uploadImgMsg: false,
      currentUploadedImg: '',
      dataUri: '',
      isCapture: false,
      photCaptured: false
    }
    this.cancelImgUpload = this.cancelImgUpload.bind(this);
    this.onStartCamera = this.onStartCamera.bind(this);
  }

  componentDidMount(){
    const { loginEmail, loginId } = this.props.loginInfo;
    const profileData = {
      loginEmail,
      loginId
    }
    this.props.getProfileInfo(profileData);
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);
  }

  startCamera (idealFacingMode, idealResolution) {
    this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }
 
  startCameraMaxResolution (idealFacingMode) {
    this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }
 
  takePhoto() {
    const config = {
      sizeFactor: 1
    };
 
    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({
      dataUri,
      photCaptured: true,
      isCapture: false,
      imagePreviewUrl: dataUri,
      uploadImgBtn: true,
      cancelImg: true,
      uploadImgMsg: false,
      openImageSelector: false
    });
  }
 
  stopCamera () {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stoped!');
        this.setState({
          isCapture: false,
          photCaptured: false
        })
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }

  _handleImageChange(e) {
    e.preventDefault();
    console.log('e.target', e.target);
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        uploadImgBtn: true,
        cancelImg: true,
        uploadImgMsg: false,
        openImageSelector: false
      });
    }

    reader.readAsDataURL(file)
  }

  _handleSubmit(e) {
    e.preventDefault();
    if(this.state.imagePreviewUrl){	
          fetch('http://ideaweaver.in/frazil-php/profile-image.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'profile-image='+this.state.imagePreviewUrl+'&user-id='+this.props.profileInfo.user_id,
          }).then(response => {
            return response.json();
          }).then(json => {
                if(json){
                  this.setState({
                    uploadImgBtn: false,
                    cancelImg: false,
                    uploadImgMsg: true,
                    changePicOption: true,
                    openImageSelector: false,
                    currentUploadedImg: 'http://ideaweaver.in/frazil-php/'+json
                  })
                }
          });
      }
  }

  cancelImgUpload(){
    this.setState({
        imagePreviewUrl: this.state.currentUploadedImg,
        uploadImgBtn: false,
        cancelImg: false,
        changePicOption: true,
        uploadImgMsg: false
      });
  }

  onStartCamera(){
    this.setState({
      isCapture: true,
      photCaptured: false
    })
  }

  render() {
    const { name, email, mobile, profile_img, user_id,
      imageCamp, smsCamp, designCamp } = this.props.profileInfo || {};

    const { uploadImgMsg, isCapture, photCaptured } = this.state;

    let imagePreview;
    const { imagePreviewUrl } = this.state;
    const imagePath = 'http://ideaweaver.in/frazil-php/';
    let prevProfileImg  = profile_img;
    if (imagePreviewUrl) {
      imagePreview = <img src={imagePreviewUrl} />;
    } else {
      imagePreview = <img src={`${imagePath}${prevProfileImg}`} />;
    }

    return(
      <div className="profile__section"> 
        <div id="takePhotoByCamera" className={isCapture && 'cameraOn'}>
          <button className="take_photo_button btn btn-purple-o" onClick={ () => {
            this.takePhoto();
          }}> Take photo </button>
  
          <button className="stop_photo_button btn btn-ghost-o" onClick={ () => {
            this.stopCamera();
          }}> Stop </button>
  
          <video
            className={photCaptured && 'videoOff'}
            ref={this.videoRef}
            autoPlay="true"
          />
          <img
            id="capturedImage"
            className={photCaptured && 'imageOn'}
            alt="imgCamera"
            src={this.state.dataUri}
          />
        </div>
        <div className="container vertical-center-box">
          <div className="panel panel-default transparent-bg-box profile-page">
            <div className="panel-body">
              {!name && (<div className="text-center">
                <span className="fa fa-spin fa-spinner fa-3x m-t-rg"></span>
              </div>)}
              <div className="panel_section">
                <div className="profile-img">
                  {imagePreview}
                  <div className="photo-edit">
                    <span className="fa fa-camera"></span>
                    <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
                  </div>
                  <div className="photo-camera">
                    <span className="fa fa-camera"></span>
                    <button
                      onClick={ () => {
                        let facingMode = FACING_MODES.USER;
                        this.startCamera(facingMode, {});
                        this.onStartCamera();
                      }}
                      className="camerOnButton"
                    >
                    </button>
                  </div>
                </div>
                <div className="previewComponent text-center">
                  <form onSubmit={(e)=>this._handleSubmit(e)}>
                      {uploadImgMsg && <p className="show">Profile picture upload successfully!</p>}
                      <div className="btn-group" style={{'margin-top':'5px'}}>
                        <button className={this.state.uploadImgBtn ? "btn btn-sm btn-success" : "hide"} type="submit" onClick="">Upload</button>
                        <button onClick={this.cancelImgUpload} className={this.state.cancelImg ? "btn btn-sm btn-danger" : "hide"}>Cancel</button>
                      </div>
                    </form>
                </div>

                <div className="panel-row panel-row-group m-t-rg m-b-rg">
                  <div className="row-item">
                    <span className="fa fa-user fa-stack label"></span>
                    <span className="label-value">{name}</span>
                  </div>
                  <div className="row-item">
                    <span className="fa fa-envelope fa-stack label"></span>
                    <span className="label-value">{email}</span>
                  </div>
                  <div className="row-item">
                    <span className="fa fa-phone fa-stack label"></span>
                    <span className="label-value">{mobile}</span>
                  </div>
                </div>

                <div className="text-center m-b-lg">
                  <Link to={`/edit-profile/${user_id}/`} className="btn btn-purple-o">Edit profile</Link>
                </div>

              </div>

              <div className="panel_section">
		    			<div className="panel-row panel-row-group m-t-rg m-b-rg">
			    			<div onClick="" className="row-item" style={{'background':'#66a430', 'color': '#fff','border':'none'}}>
			    				<span className="fa fa-user fa-envelope fa-stack label"></span>
			    				<span className="label-value">Image campaigns</span>
			    				<div className="counts">{imageCamp}</div>
			    				<span className="fa fa-stack fa-arrow-right goto-link"></span>
		    				</div>
		    				<div onClick="" className="row-item" style={{'background':'#3065a4', 'color': '#fff','border':'none'}}>
			    				<span className="fa fa-comment fa-stack label"></span>
			    				<span className="label-value">SMS campaigns</span>
			    				<div className="counts">{smsCamp}</div>
			    				<span className="fa fa-stack fa-arrow-right goto-link"></span>
		    				</div>
		    				<div onClick="" className="row-item" style={{'background':'#e66730', 'color': '#fff','border':'none'}}>
			    				<span className="fa fa-paint-brush fa-stack label"></span>
			    				<span className="label-value">Design campaigns</span>
			    				<div className="counts">{designCamp}</div>
			    				<span className="fa fa-stack fa-arrow-right goto-link"></span>
		    				</div>
		    			</div>

							</div>
              </div>
              </div>
      </div>
      </div>
    )
  }
}