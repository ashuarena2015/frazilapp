import ActionTypes from '../constants/ActionTypes';

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

export function checkListAnswered(obj, id) {
	if (obj.length) {
		for (let i = 0; i <= obj.length; i++) {
			if (obj[i].id === id && obj[i].checked && obj[i].answered === 1) {
				return true;
			}
		}
		return false;
	}
}

export function findIdInAnswer(obj, id) {
	if (obj.length) {
		for (let i = 0; i <= obj.length; i++) {
			if (obj[i].id === id) {
				return true;
			}
		}
		return false;
	}
}
