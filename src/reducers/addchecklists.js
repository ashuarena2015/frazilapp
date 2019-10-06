import ActionTypes from '../constants/ActionTypes';

const initialState = {
	fetching: false,
	frazilProjects: {},
	saveDataSuccessFully: '',
};

const projects = (state = initialState, action) => {
	switch (action.type) {
	case ActionTypes.FETCHING_START:
		return {
			...state,
			fetching: true,
		};
	case ActionTypes.FETCHING_STOP:
		return {
			...state,
			fetching: false
		};
	case ActionTypes.FETCHING_FAILED:
		return {
			...state,
			fetching: false
		};
	case ActionTypes.FETCH_PROJECT_REQUEST:
		return {
			...state,
			fetching: true,
			projectChecklists: ''
		};
	case ActionTypes.FETCH_PROJECT_SUCCESS:
		return {
			...state,
			fetching: false,
			frazilProjects: action.response,
		};
	case ActionTypes.FETCH_PROJECT_FAILED:
		return {
			...state,
			fetching: false,
			gettingProjectsFailed: true
		};
	case ActionTypes.SAVE_SUCCESSFULLY:
		return {
			...state,
			fetching: false,
			saveDataSuccessFully: 1,
			saveDataFailed: false
		};
	case ActionTypes.SAVE_FAILED:
		return {
			...state,
			fetching: false,
			saveDataFailed: true
		};
	case ActionTypes.PROJECT_CHECKLISTS:
		return {
			...state,
			fetching: false,
			projectChecklists: action.response
		};
	case ActionTypes.DATA_RESET:
		return {
			...state,
			saveDataSuccessFully: ''
		};
	case ActionTypes.MY_ASSIGNED_PROJECTS:
		return {
			...state,
			myAssignedProject: action.response,
			fetching: false
		};
	default:
		return state;
	}
};

export default projects;
