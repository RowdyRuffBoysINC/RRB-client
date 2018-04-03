import React from 'react';
import { connect, } from 'react-redux';
import { slide as Menu, } from 'react-burger-menu';
import { clearAuth, } from '../actions/auth';
import { showLoginForm, } from '../actions/users';
import { clearAuthToken, } from '../local-storage';
import { hideLoginForm, } from '../actions/users';
import './header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    this.props.dispatch(hideLoginForm());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logInOrOutButton;
    if (this.props.loggedIn) {
      logInOrOutButton = (
        <a href="#home" onClick={() => this.logOut()}>Logout</a>
      );
    }
    else {
      logInOrOutButton = (
        <a className="login-text" href="#home" onClick={() => this.props.dispatch(showLoginForm())}>Login</a>
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
            {logInOrOutButton}
          </li>
        </ul>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: state.auth.currentUser !== null, });

export default connect(mapStateToProps)(HeaderBar);
