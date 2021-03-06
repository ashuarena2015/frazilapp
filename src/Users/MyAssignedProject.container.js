import { connect } from 'react-redux';
import MyAssignedProject from './MyAssignedProject';
import { getMyAssignedProjects, dataReset, getMySubmitReports } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo,
		profileInfo: state.userProfile.profileInfo,
		frazilProjects: state.projects.frazilProjects,
		fetching: state.projects.fetching,
		myAssignedProject: state.projects.myAssignedProject
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getMyAssignedProjects: (id) => {
			dispatch(getMyAssignedProjects(id));
		},
		dataReset: () => {
			dispatch(dataReset());
		},
		getMySubmitReports: (id) => {
			dispatch(getMySubmitReports(id));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignedProject);
