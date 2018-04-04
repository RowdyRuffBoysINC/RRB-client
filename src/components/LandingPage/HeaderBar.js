import React from 'react';
import { connect, } from 'react-redux';
import { slide as Menu, } from 'react-burger-menu';
import { clearAuth, } from '../../actions/Auth';
import { showLoginForm, } from '../../actions/Users';
import { clearAuthToken, } from '../../local-storage';
import { hideLoginForm, } from '../../actions/Users';
import './HeaderBar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    this.props.dispatch(hideLoginForm());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <p href="#home" onClick={() => this.logOut()}>Logout</p>
      );
    }
    else {
      logOutButton = (
        
        <p className="login-text" onClick={() => this.props.dispatch(showLoginForm())}>Login</p>
      );
    }
    return (
      <Menu right>
        <ul>
          <li>
            <a href="#about">
              About
            </a>
          </li>
          <li>
            <a href="#sign-up">
              Sign Up
            </a>
          </li>
          <li>
            <a href="#home">
              {logOutButton}
            </a>
          </li>
        </ul>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: state.auth.currentUser !== null, });

export default connect(mapStateToProps)(HeaderBar);
