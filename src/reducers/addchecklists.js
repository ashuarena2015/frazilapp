import ActionTypes from '../constants/ActionTypes';

const initialState = {
  fetching: false,
  frazilProjects: {}
}

const projects = (state = initialState, action) => {
	switch (action.type) {
    case ActionTypes.FETCH_PROJECT_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case ActionTypes.FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        fetching: false,
        frazilProjects: action.response
      };
    case ActionTypes.FETCH_PROJECT_FAILED:
      return {
        ...state,
        fetching: false,
        gettingProjectsFailed: true
      };
    default:
      return state;
  }
}

export default projects;