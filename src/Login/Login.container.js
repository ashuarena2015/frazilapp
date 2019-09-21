import { connect } from 'react-redux';
import Login from './Login.jsx';
import { getLoginInfo } from '../actions/login'; 

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getLoginInfo: (payload) => {
			dispatch(getLoginInfo(payload));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
