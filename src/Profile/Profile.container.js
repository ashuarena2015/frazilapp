import { connect } from 'react-redux';
import Profile from './Profile';
import { getProfileInfo } from '../actions/profile';

function mapStateToProps(state) {
	return {
		loginInfo: state.loginInfo,
		profileInfo: state.userProfile.profileInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getProfileInfo: (payload) => {
			dispatch(getProfileInfo(payload));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
