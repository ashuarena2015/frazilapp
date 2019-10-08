import ActionTypes from '../constants/ActionTypes';
import axios from './axios';
import history from '../history';

function loginRequest() {
	return {
		type: ActionTypes.LOGIN_REQUEST,
	};
}

function loginSuccess(response) {
	return {
		type: ActionTypes.LOGIN_SUCCESS,
		response
	};
}

function loginFailed() {
	return {
		type: ActionTypes.LOGIN_FAILED,
	};
}

export function getLoginInfo(userData) {
	return (dispatch) => {
		dispatch(loginRequest());
		return axios.post('/login.php', {
			email: userData.loginEmail,
			password: userData.loginPassword,
		})
			.then((res) => {
				if (res.data[0].email) {
					dispatch(loginSuccess(res.data));
				} else {
					dispatch(loginFailed(true));
				}
			}).catch(() => {
				dispatch(loginFailed(true));
			});
	};
}

export function getLoginByCookies(loginEmail) {
	return (dispatch) => {
		dispatch(loginRequest());
		return axios.post('/login.php', {
			email: loginEmail,
			loginByCookie: 1,
		})
			.then((res) => {
				if (res.data[0].email) {
					dispatch(loginSuccess(res.data));
				} else {
					dispatch(loginFailed(true));
				}
			}).catch(() => {
				dispatch(loginFailed(true));
			});
	};
}

function logoutSuccess() {
	return {
		type: ActionTypes.LOGOUT_SUCCESS,
	};
}

export function logout() {
	return (dispatch) => {
		dispatch(logoutSuccess());
		history.push('/login');
	};
}

function getAllUsers(response) {
	return {
		type: ActionTypes.GET_ALL_USERS,
		response
	};
}

export function allUsers() {
	return (dispatch) => {
		dispatch(loginRequest());
		return axios.post('/users.php', {})
			.then((res) => {
				if (res.data[0].email) {
					dispatch(getAllUsers(res.data));
				} else {
					dispatch(loginFailed(true));
				}
			}).catch(() => {
				dispatch(loginFailed(true));
			});
	};
}
