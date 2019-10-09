import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';

export default class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.profileInfo,
			...this.props.otpResponse,
			existingMobile: props.profileInfo.mobile
		};
		this.onChange = this.onChange.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.sendOTP = this.sendOTP.bind(this);
		this.verifyOTP = this.verifyOTP.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.otpResponse !== prevProps.otpResponse) {
			this.setState({
				otpStatus: this.props.otpResponse.status
			});
		}
		if (this.props.verifyOtpResponse !== prevProps.verifyOtpResponse) {
			this.setState({
				verifyOtpStatus: this.props.verifyOtpResponse.status,
			});
		}
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	updateProfile() {
		const { updateProfile } = this.props;
		const { name, address, id } = this.state;
		const payload = {
			id,
			name,
			address
		};
		updateProfile(payload);
	}

	sendOTP() {
		const { mobile } = this.state;
		const { id } = this.props.profileInfo;
		const userData = {
			userId: id,
			mobile
		};
		this.props.sendOTP(userData);
	}

	verifyOTP() {
		const { mobile, otp } = this.state;
		const { id } = this.props.profileInfo;
		const userData = {
			userId: id,
			otp,
			mobile
		};
		this.props.verifyOTP(userData);
	}

	render() {
		const { email, name, mobile, otpStatus, otp, verifyOtpStatus, address, existingMobile } = this.state;
		if (this.props.saveDataSuccessFully === 1) {
			history.push('/profile');
		}

		return (
			<div className="profile__section">
				<div className="container vertical-center-box">
					<div className="panel panel-default transparent-bg-box profile-page">
						<div className="panel-body">
							{!name && (
								<div className="text-center">
									<span className="fa fa-spin fa-spinner fa-3x m-t-rg" />
								</div>
							)}
							<div className="panel_section" style={{ padding: '1rem', borderBottom: '1px solid #e2e2e2', marginBottom: '2rem' }}>
								<div className="form-box m-b-lg">
									<ul>
										<li>
											<span className="label">Full name</span>
											<input name="name" className="form-control" onChange={this.onChange} value={name} />
										</li>
										<li>
											<span className="label">Email (Can't change)</span>
											<input name="email" readOnly className="form-control" value={email} />
										</li>
										<li>
											<span className="label">Address</span>
											<textarea name="address" onChange={this.onChange} className="form-control">{address}</textarea>
										</li>
										{ existingMobile === mobile && (
											<li>
												<div className="text-center m-b-lg">
													<button type="button" className="btn btn-purple-o" onClick={this.updateProfile}>Update profile</button>
                          <Link to="/profile" style={{ marginLeft: '0.5rem' }} className="btn btn-redirect-o">Back to profile</Link>
												</div>
											</li>
										)}
									</ul>
								</div>
							</div>
							<div className="panel_section" style={{ padding: '1rem' }}>
								<div className="form-box m-b-lg">
									<ul>
										{ (otpStatus !== 'success') && (
											<li>
												<span className="label">Mobile</span>
												<input name="mobile" className="form-control" onChange={this.onChange} value={mobile} />
												{mobile.length > 10 ? <small className="text-error">Wrong mobile number</small> : ''}
											</li>
										)}
										{ (existingMobile !== this.state.mobile && this.state.mobile.length === 10 && otpStatus !== 'success' && verifyOtpStatus !== 1) && (
											<li className="text-center">
												<button type="button" className="btn btn-purple-o" onClick={this.sendOTP}>Send OTP</button>
												<button type="button" className="btn btn-ghost-o" style={{ marginLeft: '0.5rem' }} onClick={this.cancelOTP}>Cancel</button>
											</li>
										)}
										{ verifyOtpStatus === 1 && (
											<li>
												<div className="text-success">Mobile number has been updated.</div>
											</li>
										)}
										{ verifyOtpStatus === 0 && (
											<li>
												<div className="text-error">Mobile number has been not updated successfully.</div>
											</li>
										)}
										{ otpStatus === 'success' && (
											<React.Fragment>
												<li>
												  <span className="label">OTP</span>
												  <input name="otp" className="form-control" onChange={this.onChange} value={otp} />
												</li>
											  <li>
												  <button type="button" className="btn btn-purple-o" onClick={this.verifyOTP}>Verify OTP</button>
												  <button type="button" className="btn btn-ghost-o" style={{ marginLeft: '0.5rem' }} onClick={this.cancelOTP}>Cancel</button>
											  </li>
												<li>
													<button type="button" className="btn btn-edit-o" onClick={this.sendOTP}>Resend OTP</button>
												</li>
											</React.Fragment>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
