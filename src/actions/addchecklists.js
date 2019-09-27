import ActionTypes from '../constants/ActionTypes';
import axios from './axios';

function fetchProjectRequest() {
	return {
    type: ActionTypes.FETCH_PROJECT_REQUEST
	};
}

function fetchProjectSuccess(response) {
	return {
    type: ActionTypes.FETCH_PROJECT_SUCCESS,
    response
	};
}

function fetchProjectFailed(error) {
	return {
    type: ActionTypes.FETCH_PROJECT_FAILED,
    error
	};
}

export function getProjects() {
	return (dispatch) => {
		dispatch(fetchProjectRequest());
    return axios.post('/projects.php', {})
    .then((res) => {
        dispatch(fetchProjectSuccess(res.data));
    }).catch(() => {
      dispatch(fetchProjectFailed(true));
    });
	};
}