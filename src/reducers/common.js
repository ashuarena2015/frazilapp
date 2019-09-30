import ActionTypes from '../constants/ActionTypes';

const initialState = {
  saveDataSuccessfully: ''
}

const commonReducer = (state = initialState, action) => {
	switch (action.type) {
    case ActionTypes.DATA_RESET:
      return {
        ...state,
        saveDataSuccessfully: ''
      };
    default:
      return state;
  }
}

export default commonReducer;