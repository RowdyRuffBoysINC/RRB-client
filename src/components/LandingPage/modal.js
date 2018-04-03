import React from 'react';
import { connect, } from 'react-redux';
import LoginForm from './Forms/LoginForm';
import './modal.css';

export class Modal extends React.Component {
  render() {
    const loginStyle = { display: 'show', };
    if (this.props.showLoginForm) {
      return (
        <section style={loginStyle} className="login-modal">
          <LoginForm />
        </section>
      );
    }
    else {
      return (
        <div />
      );
    }
  }
}

const mapStateToProps = state => ({ showLoginForm: state.landingPageReducer.showLoginForm, });

export default connect(mapStateToProps)(Modal);
