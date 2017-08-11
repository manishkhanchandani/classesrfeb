import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBMuThgwT9QAsM3bCi4jw1JvZ18e8Zkwws",
  authDomain: "fir-73c05.firebaseapp.com",
  databaseURL: "https://fir-73c05.firebaseio.com",
  storageBucket: "fir-73c05.appspot.com",
  messagingSenderId: "520849287888"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseDatabase = firebase.database();