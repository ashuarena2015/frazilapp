import ActionTypes from '../constants/ActionTypes';

const initialState = {
	fetching: false,
	verifyOtpResponse: '',
	saveDataSuccessFully: '',
	submittedProject: [],
	assignedProject: []
};

const userProfile = (state = initialState, action) => {
	switch (action.type) {
	case ActionTypes.PROFILE_REQUEST || ActionTypes.FETCHING_START:
		return {
			...state,
			fetching: true,
		};
	case ActionTypes.PROFILE_SUCCESS:
		return {
			...state,
			fetching: false,
			profileInfo: action.response[0],
			saveDataSuccessFully: ''
		};
	case ActionTypes.PROFILE_FAILED:
		return {
			...state,
			fetching: false,
			profileFailed: true
		};
	case ActionTypes.EDIT_PROFILE_OTP_REQUEST:
		return {
			...state,
			fetching: true
		};
	case ActionTypes.EDIT_PROFILE_OTP_SUCCESS:
		return {
			...state,
			fetching: false,
			otpResponse: action.response,
			verifyOtpResponse: {}
		};
	case ActionTypes.EDIT_PROFILE_OTP_FAILED:
		return {
			...state,
			fetching: false,
			otpFailed: true
		};
	case ActionTypes.VERIFY_OTP_SUCCESS:
		return {
			...state,
			fetching: false,
			verifyOtpResponse: action.response,
			otpResponse: {}
		};
	case ActionTypes.SELECTED_USER_PROFILE:
		return {
			...state,
			selectedUserProfile: action.response[0]
		};
	case ActionTypes.SAVE_SUCCESSFULLY:
		return {
			...state,
			fetching: false,
			saveDataSuccessFully: 1,
			saveDataFailed: false
		};
	case ActionTypes.SUBMITTED_ASSIGNED_PROJECT:
		return {
			...state,
			submittedProject: action.response
		};
	case ActionTypes.MY_ASSIGNED_PROJECT:
		return {
			...state,
			assignedProjectCount: action.response
		};
	default:
		return state;
	}
};

export default userProfile;
