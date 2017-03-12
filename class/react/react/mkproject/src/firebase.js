import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU",
  authDomain: "mkgxy-3d7ce.firebaseapp.com",
  databaseURL: "https://mkgxy-3d7ce.firebaseio.com",
  storageBucket: "mkgxy-3d7ce.appspot.com",
  messagingSenderId: "938795223362"
};

const firebaseApp = firebase.initializeApp(config);

exports.firebaseApp = firebaseApp;
exports.firebase = firebase;