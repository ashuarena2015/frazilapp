import { connect } from 'react-redux';
import AddChecklists from './AddChecklists';
import { getProjects, addChecklists, dataReset } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		profileInfo: state.userProfile.profileInfo,
		loginInfo: state.loginInfo,
		frazilProjects: state.projects.frazilProjects,
		saveDataSuccessFully: state.projects.saveDataSuccessFully,
		fetching: state.projects.fetching
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getProjects: () => {
			dispatch(getProjects());
		},
		addChecklists: (payload) => {
			dispatch(addChecklists(payload));
		},
		dataReset: () => {
			dispatch(dataReset());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChecklists);
