import React from 'react';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';

import { clearAuth, } from '../actions/auth';
import { clearAuthToken, } from '../local-storage';
import LoginForm from './login-form';
import './header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <a href="#" onClick={() => this.logOut()}>LOG OUT</a>
      );
    }
    else {
      logOutButton = (
        <Link to="/register">SIGN IN</Link>
      );
    }
    return (
      <nav id="site-nav">
        <header className="logo">
          <h1>
            RRB Collab App
          </h1>
        </header>
        <a href="#about">
          About
        </a>
        <a href="#github">
          Github
        </a>
        <a href="#sign-up">
          Sign Up
        </a>
        <a href="#">
          {logOutButton}
        </a>

      </nav>
    );
  }
}

const mapStateToProps = state => ({ loggedIn: state.auth.currentUser !== null, });

export default connect(mapStateToProps)(HeaderBar);
