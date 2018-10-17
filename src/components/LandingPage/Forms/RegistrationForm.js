import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../../actions/Users';
import { login } from '../../../actions/Auth';
import Input from './Input';
import './RegistrationForm.css';
import { required, nonEmpty, length, isTrimmed } from '../../../validators';
const passwordLength = length({ min: 1, max: 72 });

export function RegistrationForm(props) {
  function onSubmit(values) {
    const { username, password, firstName, lastName } = values;
    const user = { username, password, firstName, lastName };
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
        <label htmlFor="username">
          Username
        </label>
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[ nonEmpty ]}
        />
        <label htmlFor="password">
          Password
        </label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[
            nonEmpty,
            required,
            passwordLength,
            isTrimmed,
          ]}
        />
        <button
          className="landing-page-btn-form btn-form"
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
