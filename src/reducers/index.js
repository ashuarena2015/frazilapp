import { combineReducers } from 'redux';
import loginInfo from './login';
import userProfile from './profile';

const reducers = combineReducers({
	loginInfo,
	userProfile
});

export default reducers;
