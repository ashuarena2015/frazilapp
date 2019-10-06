import { connect } from 'react-redux';
import ProjectInspection from './ProjectInspection';
import { seeChecklists, dataReset, submitReport } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		profileInfo: state.userProfile.profileInfo,
		loginInfo: state.loginInfo,
		frazilProjects: state.projects.frazilProjects,
		fetching: state.projects.fetching,
		projectChecklists: state.projects.projectChecklists,
		saveDataSuccessFully: state.projects.saveDataSuccessFully,
		saveDataFailed: state.projects.saveDataFailed,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		seeChecklists: (payload) => {
			dispatch(seeChecklists(payload));
		},
		dataReset: () => {
			dispatch(dataReset());
		},
		submitReport: (payload) => {
			dispatch(submitReport(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInspection);
