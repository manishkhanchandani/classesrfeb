import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';


import {Provider} from 'react-redux';
import store from './store.js';

import * as firebase from 'firebase';
import {firebaseApp, firebaseDatabase} from './MyFirebase.js';
import FirebaseConstant from './constants/FirebaseConstant.js';


//firebase auth checking if user is logged in or not
firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    let userId = user.uid;
    
    firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId).once('value').then((snapshot) => {
      if (!snapshot.exists()) {
        return;
      }

      //let userData = snapshot.val();
      firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId + '/loggedIn').set(firebase.database.ServerValue.TIMESTAMP);
      
      /*store.dispatch(logUser(user.email, user.uid, userData.displayName));
      firebaseDatabase.ref(FirebaseConstant.basePath + '/users/' + userId + '/loggedIn').onDisconnect().set(0);*/

    });
  } else {
    console.log('user is logged out');
  }
});



ReactDOM.render(
   <Provider store={store}>
    <App />
   </Provider>, document.getElementById('root'));
registerServiceWorker();
