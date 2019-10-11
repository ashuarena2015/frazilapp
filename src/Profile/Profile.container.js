import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfileInfo, getSubmittedProject, getAssignedProject } from '../actions/profile';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo,
		profileInfo: state.userProfile.profileInfo,
		submittedAssignedProject: state.userProfile.submittedAssignedProject,
		assignedProjectCount: state.userProfile.assignedProjectCount
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
		getAssignedProject: (payload) => {
			dispatch(getAssignedProject(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
