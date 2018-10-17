import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './Forms/LoginForm';
import './Modal.css';

export function Modal(props) {
  const loginStyle = { display: 'show' };
  if (props.showLoginForm) {
    return (
      <section style={loginStyle} className="login-modal">
        <LoginForm />
      </section>
    );
  }
  else {
    return (
      <section />
    );
  }
}

const mapStateToProps = state => ({ showLoginForm: state.landingPageReducer.showLoginForm });

export default connect(mapStateToProps)(Modal);
