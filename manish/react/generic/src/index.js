import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';

import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

import {Provider} from 'react-redux';
import store from './store.js';

import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from './MyFirebase.js';
import FirebaseConstant from './constants/FirebaseConstant.js';

import {logUser} from './actions/UserAction.js';
import {ipDetails} from './actions/MyAction.js';


import Home from './containers/Home.js';
import SignIn from './components/auth/SignIn.js';
import SignUp from './components/auth/SignUp.js';
import List from './components/List.js';


//firebase auth checking if user is logged in or not
firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    let userId = user.uid;
    
    firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId).once('value').then((snapshot) => {
      if (!snapshot.exists()) {
        return;
      }

      //create
      let userData = snapshot.val();
      firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId + '/loggedIn').set(firebase.database.ServerValue.TIMESTAMP);
      
      store.dispatch(logUser(user.email, user.uid, userData.displayName));
      firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId + '/loggedIn').onDisconnect().set(0);

    });
  } else {
    console.log('user is not login');
  }
});

//on page load
store.dispatch(ipDetails());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
           <IndexRoute component={Home} />
           <Route path="home" component={Home} />
           <Route path="category/:category/:subcategory" component={List} />
           <Route path="category/:category" component={List} />
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

