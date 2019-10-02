import ActionTypes from '../constants/ActionTypes';

const initialState = {
	fetching: false,
	logoutSuccess: true,
	loginEmail: '',
	loginId: '',
	role: '',
};

const loginInfo = (state = initialState, action) => {
	switch (action.type) {
	case ActionTypes.LOGIN_REQUEST:
		return {
			...state,
			fetching: true
		};
	case ActionTypes.LOGIN_SUCCESS: {
		const { email, user_id, role } = action.response[0];
		return {
			...state,
			fetching: false,
			loginEmail: email,
			loginId: user_id,
			role,
			loginFailed: false,
			logoutSuccess: false
		};
	}
	case ActionTypes.LOGIN_FAILED:
		return {
			...state,
			fetching: false,
			loginFailed: true
		};
	case ActionTypes.LOGOUT_SUCCESS:
		return {
			...state,
			loginEmail: '',
			loginId: '',
			role: '',
			logoutSuccess: true
		};
	case ActionTypes.GET_ALL_USERS:
		return {
			...state,
			fetching: false,
			allUsers: action.response
		};
	default:
		return state;
	}
};

export default loginInfo;
