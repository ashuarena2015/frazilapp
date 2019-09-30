import { connect } from 'react-redux';
import AddProject from './AddProject';
import { addProject, dataReset } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo,
		profileInfo: state.userProfile.profileInfo,
    frazilProjects: state.projects.frazilProjects,
    saveDataSuccessFully: state.projects.saveDataSuccessFully
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addProject: (payload) => {
			dispatch(addProject(payload));
		},
		dataReset: () => {
			dispatch(dataReset());
		}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
