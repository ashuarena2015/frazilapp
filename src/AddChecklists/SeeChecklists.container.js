import { connect } from 'react-redux';
import SeeChecklists from './SeeChecklists';
import { seeChecklists, getProjects, dataReset } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		profileInfo: state.userProfile.profileInfo,
		loginInfo: state.loginInfo,
		frazilProjects: state.projects.frazilProjects,
		fetching: state.projects.fetching,
		projectChecklists: state.projects.projectChecklists
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
		dataReset: () => {
			dispatch(dataReset());
		}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeChecklists);
