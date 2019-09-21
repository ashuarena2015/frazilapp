import { connect } from 'react-redux';
import EditProfile from './Edit-profile';
import { sendOTP, verifyOTP } from '../actions/profile';
import { stat } from 'fs';

function mapStateToProps(state) {
	return {
    loginInfo: state.loginInfo,
		profileInfo: state.userProfile.profileInfo,
		otpResponse: state.userProfile.otpResponse,
		verifyOtpResponse: state.userProfile.verifyOtpResponse
	};
}

function mapDispatchToProps(dispatch) {
	return {
		sendOTP: (userData) => {
			dispatch(sendOTP(userData));
		},
		verifyOTP: (userData) => {
			dispatch(verifyOTP(userData));
		}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
