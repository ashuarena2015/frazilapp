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

function saveSuccessfully(response) {
	return {
		type: ActionTypes.SAVE_SUCCESSFULLY,
		response
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

export function updateProfile(userData) {
	return (dispatch) => {
		dispatch(profileRequest());
		const { id, name, address } = userData;
		return axios.post('/update-profile.php', {
			id,
			name,
			address,
		})
			.then((res) => {
				dispatch(profileSuccess(res.data));
				dispatch(saveSuccessfully(1));
			}).catch(() => {
				dispatch(profileFailed(true));
			});
	};
}

function selectedProfileSuccess(response) {
	return {
		type: ActionTypes.SELECTED_USER_PROFILE,
		response
	};
}

export function getSelectedProfileInfo(userData) {
	return (dispatch) => {
		dispatch(profileRequest());
		return axios.post('/profile.php', {
			email: userData.loginEmail,
			user_id: userData.loginId,
		})
			.then((res) => {
				dispatch(selectedProfileSuccess(res.data));
			}).catch(() => {
				dispatch(profileFailed(true));
			});
	};
}

function editProfileOTPRequest() {
	return {
		type: ActionTypes.EDIT_PROFILE_OTP_REQUEST
	};
}

function editProfileOTPSuccess(response) {
	return {
		type: ActionTypes.EDIT_PROFILE_OTP_SUCCESS,
		response
	};
}

function editProfileOTPFailed() {
	return {
		type: ActionTypes.EDIT_PROFILE_OTP_FAILED
	};
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

function verifyOTPSuccess(response) {
	return {
		type: ActionTypes.VERIFY_OTP_SUCCESS,
		response
	};
}

export function verifyOTP(userData) {
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

export function submittedProject(response) {
	return {
		type: ActionTypes.SUBMITTED_ASSIGNED_PROJECT,
		response
	};
}

export function getSubmittedProject(payload) {
	return (dispatch) => {
		dispatch(fetchingStart());
		return axios.post('/get_my_submitted_project.php', {
			userId: payload.loginId,
			email: payload.loginEmail,
			role: payload.role
		})
			.then((res) => {
				dispatch(submittedProject(res.data));
			}).catch(() => {
				dispatch(fetchingStop(true));
			});
	};
}

export function assignedProject(response) {
	return {
		type: ActionTypes.MY_ASSIGNED_PROJECT,
		response
	};
}

export function getAssignedProject(payload) {
	return (dispatch) => {
		dispatch(fetchingStart());
		return axios.post('/get_assigned_project.php', {
			userId: payload.loginId,
			email: payload.loginEmail,
			role: payload.role
		})
			.then((res) => {
				dispatch(assignedProject(res.data));
			}).catch(() => {
				dispatch(fetchingStop(true));
			});
	};
}
