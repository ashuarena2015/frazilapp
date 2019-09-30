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
