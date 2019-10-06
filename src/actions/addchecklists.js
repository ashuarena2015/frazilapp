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

function fetchStart() {
	return {
		type: ActionTypes.FETCHING_START
	};
}

function fetchStop(response) {
	return {
		type: ActionTypes.FETCHING_STOP,
		response
	};
}

function fetchFailed(error) {
	return {
		type: ActionTypes.FETCHING_FAILED,
		error
	};
}

function fetchMyAssignedProjectSuccess(response) {
	return {
		type: ActionTypes.MY_ASSIGNED_PROJECTS,
		response
	}
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

export function getMyAssignedProjects(id) {
	return (dispatch) => {
		dispatch(fetchProjectRequest());
		return axios.post('/my-projects.php', {
			user_id: id
		})
			.then((res) => {
				dispatch(fetchMyAssignedProjectSuccess(res.data));
			}).catch(() => {
				dispatch(fetchProjectFailed(true));
			});
	};
}

export function saveSuccessfully(response) {
	return {
		type: ActionTypes.SAVE_SUCCESSFULLY,
		response
	};
}

export function saveFailed() {
	return {
		type: ActionTypes.SAVE_FAILED
	};
}

export function addChecklists(payload) {
	return (dispatch) => {
		dispatch(fetchStart());
		return axios.post('/add-checklists.php', {
			project: payload.projectSelected,
			checklists: payload.tags,
			userId: payload.user_id
		})
			.then((res) => {
				if (res.data.success === 1) {
					dispatch(fetchStop());
					dispatch(saveSuccessfully(res.data.success));
				} else {
					dispatch(fetchFailed(true));
				}
			}).catch(() => {
				dispatch(fetchFailed(true));
			});
	};
}

export function editChecklists(payload) {
	return (dispatch) => {
		dispatch(fetchStart());
		return axios.post('/edit-checklists.php', {
			project: payload.projectSelected,
			checklists: payload.tags,
			userId: payload.user_id
		})
			.then((res) => {
				if (res.data.success === 1) {
					dispatch(fetchStop());
					dispatch(saveSuccessfully(res.data.success));
				} else {
					dispatch(fetchFailed(true));
				}
			}).catch(() => {
				dispatch(fetchFailed(true));
			});
	};
}

export function addProject(payload) {
	return (dispatch) => {
		dispatch(fetchStart());
		return axios.post('/add-project.php', {
			project: payload.projectName,
			userId: payload.user_id
		})
			.then((res) => {
				if (res.data.success === 1) {
					dispatch(fetchStop());
					dispatch(saveSuccessfully(res.data.success));
				} else {
					dispatch(fetchFailed(true));
				}
			}).catch(() => {
				dispatch(fetchFailed(true));
			});
	};
}

export function projectChecklists(response) {
	return {
		type: ActionTypes.PROJECT_CHECKLISTS,
		response
	};
}

export function seeChecklists(payload) {
	return (dispatch) => {
		dispatch(fetchStart());
		return axios.post('/see-checklists.php', {
			project: payload.projectSelected,
			userId: payload.user_id
		})
			.then((res) => {
				if (res.data.length) {
					dispatch(fetchStop());
					dispatch(projectChecklists(res.data));
				} else {
					dispatch(fetchFailed(true));
					dispatch(projectChecklists(res.data));
				}
			}).catch(() => {
				dispatch(fetchFailed(true));
			});
	};
}

function dataResetRequest() {
	return {
		type: ActionTypes.DATA_RESET,
	};
}

export function dataReset() {
	return (dispatch) => {
		dispatch(dataResetRequest());
	};
}

export function assignProject(payload) {
	return (dispatch) => {
		dispatch(fetchStart());
		return axios.post('/assign-project.php', {
			assigned_by: payload.assigned_by,
			user_id: payload.user_id,
			project_id: payload.project_id
		})
			.then((res) => {
				if (res.data.success === 1) {
					dispatch(fetchStop());
					dispatch(saveSuccessfully(res.data.success));
				} else {
					dispatch(fetchFailed(true));
				}
			}).catch(() => {
				dispatch(fetchFailed(true));
			});
	};
}

export function importCSVChecklist(payload) {
	return (dispatch) => {
		dispatch(fetchStart());
		return axios.post('/import-checklists.php', {
			checklistFile: payload.checklistFile,
			user_id: payload.user_id,
			project_id: payload.projectSelected
		})
			.then((res) => {
				if (res.data.success === 1) {
					dispatch(fetchStop());
					dispatch(saveSuccessfully(res.data.success));
				} else {
					dispatch(fetchFailed(true));
				}
			}).catch(() => {
				dispatch(fetchFailed(true));
			});
	};
}

export function submitReport(payload) {
	return (dispatch) => {
		dispatch(fetchStart());
		return axios.post('/submit-report.php', {
			remarks: payload.remarks,
			project_photos: payload.project_photos,
			checklistResult: payload.checklistResult,
			project_id: payload.project_id,
			user_id: payload.user_id,
			assigned_by: payload.assigned_by
		})
			.then((res) => {
				if (res.data.success === 1) {
					dispatch(fetchStop());
					dispatch(saveSuccessfully(res.data.success));
				} else {
					dispatch(fetchFailed(true));
					dispatch(saveFailed());
				}
			}).catch(() => {
				dispatch(fetchFailed(true));
			});
	};
}
