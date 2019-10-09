import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfileInfo, getSubmittedProject, assignedProject } from '../actions/profile';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo,
		profileInfo: state.userProfile.profileInfo,
		submittedAssignedProject: state.userProfile.submittedAssignedProject,
		assignedProject: state.userProfile.assignedProject
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getProfileInfo: (payload) => {
			dispatch(getProfileInfo(payload));
		},
		getSubmittedProject: (payload) => {
			dispatch(getSubmittedProject(payload));
		},
		assignedProject: (payload) => {
			dispatch(assignedProject(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
