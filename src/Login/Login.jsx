import React, { Component } from 'react';
import history from '../history';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginEmail: '',
			loginPassword: '',
			showSignupForm: false,
			showForgotPasswordForm: false,
			loginCookieExist: localStorage.getItem('loginEmail')
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getLoginInfo = this.getLoginInfo.bind(this);
	}

	componentDidMount() {
		const { loginCookieExist } = this.state;
		if (loginCookieExist) {
			this.props.getLoginByCookies(loginCookieExist);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.loginInfo.loginEmail !== this.props.loginInfo.loginEmail) {
			history.replace('/profile');
		}
	}

	getLoginInfo() {
		const { loginEmail, loginPassword } = this.state;
		const loginData = {
			loginEmail,
			loginPassword
		};
		this.props.getLoginInfo(loginData);
	}

	handleSubmit(event) {
		const { name: fieldName, value } = event.target;
		this.setState({
			[fieldName]: value
		});
	}

	render() {
		const { showSignupForm, showForgotPasswordForm, loginCookieExist } = this.state;
		const { fetching } = this.props.loginInfo;
		return (
			!loginCookieExist && (
				<React.Fragment>
					<div className="panel">
						<div className="panel-body">
							<h3>Login by using your email only</h3>
							<div className="form-group m-b-rg">
								<label>Email</label>
								<input type="text" id="loginEmail" name="loginEmail" value={this.state.loginEmail} onChange={this.handleSubmit} className="form-control" />
							</div>
							<div className="form-group m-b-rg">
								<label>Password</label>
								<input type="password" id="loginPassword" name="loginPassword" value={this.state.loginPassword} onChange={this.handleSubmit} className="form-control" />
							</div>
							<button type="button" onClick={this.getLoginInfo} className="btn btn-login btn-block">
								{ fetching && <span className="fa fa-spin fa-spinner" /> } Submit
							</button>
							<div className="group-anchor m-t-rg text-center">
								<a href="javascript:void(0)" onClick="">Signup here</a>
								<a href="javascript:void(0)" onClick="">Forgot password?</a>
							</div>
						</div>
					</div>

					{/* New User, Register here */}

					{ showSignupForm && (
						<div className="panel">
							<div className="panel-body">
								<h3>New user, register here</h3>
								<div className="form-group m-b-rg">
									<label>Name</label>
									<input type="text" id="userNameReg" className="form-control" />
								</div>
								<div className="form-group m-b-rg">
									<label>Email</label>
									<input type="text" id="userEmailReg" className="form-control" />
								</div>
								<div className="form-group m-b-rg">
									<label>Password</label>
									<input type="password" id="userPassReg" className="form-control" />
								</div>
								<button type="button" onClick="" className="btn btn-login btn-block"><span className="fa fa-spin fa-spinner" /> Submit</button>
								<div className="group-anchor m-t-rg text-center">
									<a href="javascript:void(0)" onClick="">Login here</a>
									<a href="javascript:void(0)" onClick="">Forgot password?</a>
								</div>
							</div>
						</div>
					)
					}

					{/* Forgot Passowrd */}

					{ showForgotPasswordForm && (
						<div className="panel">
							<div className="panel-body">
								<h3>Forgot password?</h3>
								<div className="form-group m-b-rg">
									<label>Email</label>
									<input type="text" id="userEmailForPass" className="form-control" />
								</div>
								<div className="form-group m-b-rg">
									<label>Mobile (Registered)</label>
									<input type="text" id="userMobForPass" className="form-control" />
								</div>
								<button type="button" onClick="" className="btn btn-login btn-block"><span className="fa fa-spin fa-spinner" /> Submit</button>
								<div className="group-anchor m-t-rg text-center">
									<a href="javascript:void(0)" onClick="">Login here</a>
									<a href="javascript:void(0)" onClick="">Forgot password?</a>
								</div>
							</div>
						</div>
					)
					}
				</React.Fragment>
			)
		);
	}
}

export default Login;
