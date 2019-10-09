import { connect } from 'react-redux';
import EditProfile from './Edit-profile';
import { sendOTP, verifyOTP, updateProfile } from '../actions/profile';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo,
		profileInfo: state.userProfile.profileInfo,
		otpResponse: state.userProfile.otpResponse,
		verifyOtpResponse: state.userProfile.verifyOtpResponse,
		saveDataSuccessFully: state.userProfile.saveDataSuccessFully
	};
}

function mapDispatchToProps(dispatch) {
	return {
		sendOTP: (userData) => {
			dispatch(sendOTP(userData));
		},
		verifyOTP: (userData) => {
			dispatch(verifyOTP(userData));
		},
		updateProfile: (payload) => {
			dispatch(updateProfile(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
