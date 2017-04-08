import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import {Provider} from 'react-redux';
import store from './store.js';

import Home from './components/Home.js'
import App from './components/App.js';
import AboutUs from './components/AboutUs.js';
import ContactUs from './components/ContactUs.js';
import Signin from './components/Signin.js';
import Signup from './components/Signup.js';

import {saveUser} from './actions/UserAction.js';

// firebase integration
import {firebaseApp} from './firebase.js';

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('user found with details: ', user);
    store.dispatch(saveUser(user.email, user.uid));
  } else {
    console.log('user is not logged in');
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="aboutus" component={AboutUs} />
        <Route path="contactus" component={ContactUs} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
