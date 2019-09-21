import ActionTypes from '../constants/ActionTypes';

const initialState = {
  fetching: false
}

const loginInfo = (state = initialState, action) => {
	switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case ActionTypes.LOGIN_SUCCESS:
      const { email, user_id } = action.response[0]
      return {
        ...state,
        fetching: false,
        loginEmail: email,
        loginId: user_id,
        loginFailed: false
      };
    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        fetching: false,
        loginFailed: true
      };
    default:
      return state;
  }
}

export default loginInfo;