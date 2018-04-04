import React from 'react';
import { Field, reduxForm, focus, } from 'redux-form';
import Input from './Input';
import { login, } from '../../../actions/Auth';
import { required, nonEmpty, } from '../../../validators';
import { hideLoginForm, } from '../../../actions/Users';
import './LoginForm.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <section className="form-error" aria-live="polite">
          {this.props.error}
        </section>
      );
    }
    return (
      <section className="form-wrapper">
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values)
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
          <button className="btn-form" disabled={this.props.pristine || this.props.submitting}>
            Log in
          </button>
          <span className="close js-close" onClick={() => this.props.dispatch(hideLoginForm())}> &times; </span>
        </form>
      </section>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
