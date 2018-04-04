import React from 'react';
import { connect, } from 'react-redux';
import { slide as Menu, } from 'react-burger-menu';
import { clearAuth, } from '../../actions/Auth';
import { showLoginForm, } from '../../actions/Users';
import { clearAuthToken, } from '../../local-storage';
import { hideLoginForm, } from '../../actions/Users';
import './HeaderBar.css';

export function HeaderBar (props) {
  function logOut() {
    props.dispatch(clearAuth());
    props.dispatch(hideLoginForm());
    clearAuthToken();
  }


  // Only render the log out button if we are logged in
  let logOutButton;
  if (props.loggedIn) {
    logOutButton = (
      <p href="#home" onClick={() => logOut()}>Logout</p>
    );
  }
  else {
    logOutButton = (
      // <Link to="/register">SIGN IN</Link>
      <p className="login-text" onClick={() => props.dispatch(showLoginForm())}>Login</p>
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

const mapStateToProps = state => ({ loggedIn: state.auth.currentUser !== null, });

export default connect(mapStateToProps)(HeaderBar);
