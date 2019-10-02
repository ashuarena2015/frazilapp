import { connect } from 'react-redux';
import Users from './Users';
import { allUsers } from '../actions/login';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		allUsers: () => {
			dispatch(allUsers());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
