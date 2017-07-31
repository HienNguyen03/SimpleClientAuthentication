import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';

import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit ({email, password}) {
    var {dispatch} = this.props;
    console.log('form submit');
    console.log(email, password);
    //need something to do to log user in
    dispatch(actions.signinUser({email, password}));
    console.log('post');
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div>
      );
    }
  }

  render () {
    const {handleSubmit, errorMessage} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control"/>
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" type="password" className="form-control"/>
        </fieldset>

        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps (state) {
  return {errorMessage: state.auth.error};
}

Signin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);
