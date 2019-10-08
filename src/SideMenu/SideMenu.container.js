import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import { logout } from '../actions/login';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {
			localStorage.removeItem('loginEmail');
			dispatch(logout());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
