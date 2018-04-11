import React from 'react';
import { Field, reduxForm, focus, } from 'redux-form';
import Input from './Input';
import { login, } from '../../../actions/Auth';
import { required, nonEmpty, } from '../../../validators';
import { hideLoginForm, } from '../../../actions/Users';
import { action as toggleMenu, } from 'redux-burger-menu';
import createStore from '../../../store';
import './LoginForm.css';

export function LoginForm(props) {
  function onSubmit(values) {
    createStore.dispatch(toggleMenu(false));
    return props.dispatch(login(values.username, values.password));
  }

  let error;
  if (props.error) {
    error = (
      <section className="form-error" aria-live="polite">
        {props.error}
      </section>
    );
  }

  return (
    <section className="form-wrapper">
      <span className="close js-close" onClick={() => props.dispatch(hideLoginForm())}> &times; </span>
      <form
        className="login-form"
        onSubmit={props.handleSubmit(values =>
          onSubmit(values)
        )} >
        {error}
        <label className="labelInput" htmlFor="username">Username</label>
        <Field
          autoFocus
          component={Input}
          type="text"
          name="username"
          id="username-login"
          validate={[ required, nonEmpty, ]}
        />
        <label className="labelInput" htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="password"
          id="password"
          validate={[ required, nonEmpty, ]}
        />
        <button className="btn-form" disabled={props.pristine || props.submitting}>
          Log in
        </button>
      </form>
    </section>
  );
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
