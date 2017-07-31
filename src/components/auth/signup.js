import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
)

class Signup extends Component {
  handleFormSubmit (formProps) {
    //console.log(formProps);
    //call action here
    this.props.signupUser(formProps);
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opp! </strong>{this.props.errorMessage}
        </div>
      );
    }
  }

  render () {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="email" type="text" component={renderField} label="Email"/>
          <Field name="password" type="password" component={renderField} label="Password"/>
          <Field name="passwordConfirm" type="password" component={renderField} label="Confirm Password"/>
          {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate (formProps) {
  const errors = {};
  if (!formProps.email) {
    errors.email = 'Please enter your email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter your password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter your password confirmation';
  }

  if (formProps.password != formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps (state) {
  return {errorMessage: state.auth.error};
}

Signup = connect(mapStateToProps, actions)(Signup);

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);
