import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from '../history';

class SideMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sideMenuOpen: false
		}
		this.openSideMenu = this.openSideMenu.bind(this);
	}

	openSideMenu(){
		this.setState({
			sideMenuOpen: !this.state.sideMenuOpen
		})
	}

	render(){
		const { loginEmail, role, logoutSuccess } = this.props.loginInfo;

		return(
			<div className="header">
				<div id="sidemenu">
				<div className={!this.state.sideMenuOpen ? "menu-opener" : "menu-opener menu-opener-active"} onClick={this.openSideMenu}><span className={!this.state.sideMenuOpen ? "fa fa-bars fa-2x" : "fa fa-arrow-left"}></span></div>
				      <div className={!this.state.sideMenuOpen ? "side-menu side-menu-hide" : "side-menu side-menu-open"}>
				        <ul onClick={this.openSideMenu}>
				            <li><Link to='/profile'>My Profile</Link></li>
				            <li><Link to='/about'>About Us</Link></li>
										{role === 1 && (
											<React.Fragment>
												<li><Link to='/add-checklists'>Add Checklist</Link></li>
												<li><Link to='/add-project'>Add Project</Link></li>
												<li><Link to='/see-checklists'>See Checklists</Link></li>
											</React.Fragment>
										)}
										{loginEmail ? (
											<li><Link onClick={this.props.logout}>Logout</Link></li>
										)
										: <li><Link to="/">Login</Link></li>
										}
				        </ul>
				  	</div>
			  	</div>
		  	</div>

  		)
  	}

}

export default SideMenu;