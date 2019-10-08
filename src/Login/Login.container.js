import { connect } from 'react-redux';
import Login from './Login';
import { getLoginInfo, getLoginByCookies } from '../actions/login';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getLoginInfo: (payload) => {
			dispatch(getLoginInfo(payload));
		},
		getLoginByCookies: (loginByCookie) => {
			dispatch(getLoginByCookies(loginByCookie));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
