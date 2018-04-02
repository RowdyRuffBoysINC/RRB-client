import React from 'react';
import {connect} from 'react-redux';
import  LoginForm from './login-form.js';
import './modal.css';

export class Modal extends React.Component {

  render () {
    const loginStyle = {
      display: 'show'
    }
console.log(this.props);
    if (this.props.showLoginForm === true) {
      return (
        <section style={loginStyle} className="login-modal">
        <LoginForm />
        </section>
      );
    }
    else {
      return (
        <div></div>
      )
    }   
  }
}

const mapStateToProps = state => ({
  showLoginForm: state.landingPageReducer.showLoginForm,
});

export default connect(mapStateToProps)(Modal);