import React from 'react';
import { Field, reduxForm, focus, } from 'redux-form';
import Input from './Input';
import { login, } from '../../../actions/Auth';
import { required, nonEmpty, } from '../../../validators';
import { hideLoginForm, } from '../../../actions/Users';
import './LoginForm.css';

export function LoginForm(props) {
  function onSubmit(values) {
    return props.dispatch(login(values.username, values.password));
  }

  let error;
  if (props.error) {
    error = (
      <div className="form-error" aria-live="polite">
        {props.error}
      </div>
    );
  }
  return (
    <div className="form-wrapper">
      <form
        className="login-form"
        onSubmit={props.handleSubmit(values =>
          onSubmit(values)
        )}>
        {error}
        <label className="labelInput" htmlFor="username">Username</label>
        <Field
          component={Input}
          type="text"
          name="username"
          id="username"
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
        <span className="close js-close" onClick={() => props.dispatch(hideLoginForm())}> &times; </span>
      </form>
    </div>
  );

}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
