import { connect } from 'react-redux';
import AddChecklists from './AddChecklists';
import { getProjects } from '../actions/addchecklists';

function mapStateToProps(state) {
	return {
		profileInfo: state.profileInfo,
		frazilProjects: state.projects.frazilProjects
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getProjects: () => {
			dispatch(getProjects());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChecklists);
