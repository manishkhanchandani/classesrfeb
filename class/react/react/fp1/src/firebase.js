import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDwQhx_fwJQOZhuC2x6-2P-o-pre9ZzBVQ",
  authDomain: "fir-2-b264a.firebaseapp.com",
  databaseURL: "https://fir-2-b264a.firebaseio.com",
  projectId: "fir-2-b264a",
  storageBucket: "fir-2-b264a.appspot.com",
  messagingSenderId: "630579864255"
};

export const firebaseApp = firebase.initializeApp(config);

export const firebaseDatabase = firebase.database();
