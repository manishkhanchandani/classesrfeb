import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';

import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

import {Provider} from 'react-redux';
import store from './store.js';

import {firebaseApp} from './firebase';
import {logUser} from './actions/UserAction.js';


import Home from './containers/Home.js';
import SignIn from './components/auth/SignIn.js';
import SignUp from './components/auth/SignUp.js';

//firebase auth checking if user is logged in or not
firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('user has signed in: ', user);
    store.dispatch(logUser(user.email, user.uid));
  } else {
    console.log('user is not login');
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
           <IndexRoute component={Home} />
           <Route path="home" component={Home} />
        </Route>
        <Route path="/auth" component={App}>
           <IndexRoute component={SignIn} />
           <Route path="signin" component={SignIn} />
           <Route path="signup" component={SignUp} />
        </Route>
     </Router>
   </Provider>,
  document.getElementById('root')
);

