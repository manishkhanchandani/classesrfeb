import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

import {firebaseApp} from './firebase';

import App from './components/App';
import './index.css';

import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Home from './components/Home.js';

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('user has signed in ', user);
    localStorage.setItem('profile', JSON.stringify({email: user.email}));
  } else {
    console.log('user has signed out');
  }
});

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={App}>
         <IndexRoute component={Home} />
       <Route path="home" component={Home} />
       <Route path="signin" component={SignIn} />
       <Route path="signup" component={SignUp} />
      </Route>
   </Router>,
  document.getElementById('root')
);
