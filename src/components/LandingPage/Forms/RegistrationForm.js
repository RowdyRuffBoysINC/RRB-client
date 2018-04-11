import React from 'react';
import { Field, reduxForm, focus, } from 'redux-form';
import { registerUser, } from '../../../actions/Users';
import { login, } from '../../../actions/Auth';
import Input from './Input';
import './RegistrationForm.css';
import { required, nonEmpty, matches, length, isTrimmed, } from '../../../validators';
const passwordLength = length({ min: 10, max: 72, });
const matchesPassword = matches('password');

export function RegistrationForm(props) {
  function onSubmit(values) {
    const { username, password, firstName, lastName, } = values;
    const user = { username, password, firstName, lastName, };
    return props
      .dispatch(registerUser(user))
      .then(() => props.dispatch(login(username, password)));
  }

  return (
    <section className="reg-form-wrapper">
      <h1 className="reg-header">
        Get Started
      </h1>
      <form
        className="login-form"
        onSubmit={props.handleSubmit(values =>
          onSubmit(values)
        )}>
        <label htmlFor="firstName">
          First name
        </label>
        <Field
          component={Input}
          type="text"
          name="firstName"
        />
        <label htmlFor="lastName">
          Last name
        </label>
        <Field
          component={Input}
          type="text"
          name="lastName"
        />
        <label htmlFor="username">
          Username
        </label>
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[
            required,
            nonEmpty,
            isTrimmed,
          ]}
        />
        <label htmlFor="password">
          Password
        </label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[
            required,
            passwordLength,
            isTrimmed,
          ]}
        />
        <label htmlFor="passwordConfirm">
          Confirm password
        </label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[
            required,
            nonEmpty,
            matchesPassword,
          ]}
        />
        <button
          className="btn-form"
          type="submit"
          disabled={props.pristine || props.submitting}>
          Register
        </button>
      </form>
    </section>
  );
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0])),
})(RegistrationForm);
