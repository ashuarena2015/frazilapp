import ActionTypes from '../constants/ActionTypes';
import axios from './axios';

function fetchingStart() {
	return {
		type: ActionTypes.FETCHING_START,
	};
}

function fetchingStop() {
	return {
		type: ActionTypes.FETCHING_STOP,
	};
}

function profileRequest() {
	return {
		type: ActionTypes.PROFILE_REQUEST,
	};
}

function profileSuccess(response) {
	return {
    type: ActionTypes.PROFILE_SUCCESS,
    response
	};
}

function profileFailed() {
	return {
		type: ActionTypes.PROFILE_FAILED,
	};
}

export function getProfileInfo(userData) {
	return (dispatch) => {
		dispatch(profileRequest());
    return axios.post('/profile.php', {
      email: userData.loginEmail,
      user_id: userData.loginId,
    })
    .then((res) => {
        dispatch(profileSuccess(res.data));
    }).catch(() => {
      dispatch(profileFailed(true));
    });
	};
}

function editProfileOTPRequest() {
  return {
    type: ActionTypes.EDIT_PROFILE_OTP_REQUEST
  }
}

function editProfileOTPSuccess(response) {
  return {
    type: ActionTypes.EDIT_PROFILE_OTP_SUCCESS,
    response
  }
}

function editProfileOTPFailed() {
  return {
    type: ActionTypes.EDIT_PROFILE_OTP_FAILED
  }
}

export function sendOTP(userData) {
	return (dispatch) => {
		dispatch(editProfileOTPRequest());
    return axios.post('/send-otp-mobile-verify.php', {
      userId: userData.userId,
      mobile: userData.mobile,
    })
    .then((res) => {
        dispatch(editProfileOTPSuccess(res.data));
    }).catch(() => {
      dispatch(editProfileOTPFailed(true));
    });
	};
}

function verifyOTPSuccess(response){
  return {
    type: ActionTypes.VERIFY_OTP_SUCCESS,
    response
  }
}

export function verifyOTP(userData) {
  console.log('userData', userData);
	return (dispatch) => {
		dispatch(fetchingStart());
    return axios.post('/update-mobile.php', {
      userId: userData.userId,
      mobile: userData.mobile,
      otp: userData.otp
    })
    .then((res) => {
        dispatch(verifyOTPSuccess(res.data));
    }).catch(() => {
      dispatch(fetchingStop(true));
    });
	};
}