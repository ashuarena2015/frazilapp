import { combineReducers } from 'redux';
import loginInfo from './login';
import userProfile from './profile';
import projects from './addchecklists';

const reducers = combineReducers({
	loginInfo,
	userProfile,
	projects
});

export default reducers;
