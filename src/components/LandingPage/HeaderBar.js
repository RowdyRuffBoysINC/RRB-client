import React from 'react';
import { connect, } from 'react-redux';

import Menu from './Menu';
import { clearAuth, } from '../../actions/Auth';
import { showLoginForm, } from '../../actions/Users';
import { clearAuthToken, } from '../../local-storage';
import { hideLoginForm, } from '../../actions/Users';
import { action as toggleMenu, } from 'redux-burger-menu';
import createStore from '../../store';
import './HeaderBar.css';

export function HeaderBar(props) {
  function logOut() {
    createStore.dispatch(toggleMenu(false));
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
      <p className="login-text" onClick={() => props.dispatch(showLoginForm())}>Login</p>
    );
  }
  let styles;
  if (props.loggedIn) {
    styles = { bmBurgerBars: { background: 'rgb(244,153,115)', }, };
  }
  else {
    styles = { bmBurgerBars: { background: 'rgb(46,94,102)', }, };
  }

  return (
    <Menu styles={styles} right >
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
