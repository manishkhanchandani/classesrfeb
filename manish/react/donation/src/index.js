import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/App';


import {Provider} from 'react-redux';
import store from './store.js';

import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from './MyFirebase.js';
import FirebaseConstant from './constants/FirebaseConstant.js';

import {logUser} from './actions/UserAction.js';
import {ipDetails} from './actions/MyAction.js';



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
  }
});

//on page load
store.dispatch(ipDetails());

ReactDOM.render(
  <Provider store={store}>
    <App />
   </Provider>,
  document.getElementById('root')
);
