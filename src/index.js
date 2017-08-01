import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import {AUTH_USER} from './actions/types';
import Feature from './components/feature';
import reducers from './reducers';
import RequireAuth from './components/auth/require_auth';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Welcome from './components/welcome';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If user has token, considering user signed in
if (token) {
  //update application state
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="signin" component={Signin}></Route>
        <Route path="signout" component={Signout}/>
        <Route path="signup" component={Signup} />
        <Route path="feature" component={RequireAuth(Feature)}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
