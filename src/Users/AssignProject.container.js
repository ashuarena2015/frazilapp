import { connect } from 'react-redux';
import AssignProject from './AssignProject';
import { getSelectedProfileInfo } from '../actions/profile';
import { getProjects, assignProject, dataReset } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo,
		selectedUserProfile: state.userProfile.selectedUserProfile,
		frazilProjects: state.projects.frazilProjects,
		saveDataSuccessFully: state.projects.saveDataSuccessFully,
		fetching: state.projects.fetching
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getSelectedProfileInfo: (payload) => {
			dispatch(getSelectedProfileInfo(payload));
		},
		getProjects: () => {
			dispatch(getProjects());
		},
		assignProject: (payload) => {
			dispatch(assignProject(payload));
		},
		dataReset: () => {
			dispatch(dataReset());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignProject);
