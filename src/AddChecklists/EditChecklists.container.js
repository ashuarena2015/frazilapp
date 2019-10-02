import { connect } from 'react-redux';
import EditChecklists from './EditChecklists';
import { seeChecklists, getProjects, dataReset, editChecklists } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		profileInfo: state.userProfile.profileInfo,
		loginInfo: state.loginInfo,
		frazilProjects: state.projects.frazilProjects,
		fetching: state.projects.fetching,
		projectChecklists: state.projects.projectChecklists,
		saveDataSuccessFully: state.projects.saveDataSuccessFully
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getProjects: () => {
			dispatch(getProjects());
		},
		seeChecklists: (payload) => {
			dispatch(seeChecklists(payload));
		},
		editChecklists: (payload) => {
			dispatch(editChecklists(payload));
		},
		dataReset: () => {
			dispatch(dataReset());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChecklists);
