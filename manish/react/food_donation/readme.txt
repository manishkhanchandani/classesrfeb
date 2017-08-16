create-react-app food_donation


npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd food_donation
  npm start


Run
npm install redux redux-logger react-redux redux-thunk redux-promise-middleware react-google-autocomplete firebase react-router-dom --save



Change in package.json

"redux-promise-middleware": "4.2.1",

run

npm install 


Folder Structure Creation

  index.js
  store.js
  MyFirebase.js
  components
    Home.js
    App.js
  actions
    MyAction.js
  reducers
    MyReducer.js
  constants
    MyConstant.js
    FirebaseConstant.js
    
    

Add Following in index.html file
<link rel='stylesheet' href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" type="text/css">
   
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvXqWIcqyTVRgjXsVjDbdORcNaXHVjtOw&libraries=places"></script>


Create MyFirebase.js file with following code in it:

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



File: constants/MyConstant.js

const MyConstant = {
  LOCATION: 'LOCATION',
  KEYWORD: 'KEYWORD',
  IPDETAILS: 'IPDETAILS',
  saveData: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  },
  getData: (key) => {
    let obj = localStorage.getItem(key);
    if (obj) {
      obj = JSON.parse(obj);
    }

    return obj;
  }
}

export default MyConstant;



File: constants/FirebaseConstant.js

const FirebaseConstant = {
  basePath: '/foodDonation'
}

export default FirebaseConstant;

File: actions/MyAction.js

//import {sample} from '../actions/MyAction.js';

import MyConstant from '../constants/MyConstant.js';

export const sample = () => {
  return {
    type: 'SAMPLE',
    payload: 10
  }
}

File: reducers/MyReducer.js

const MyReducer = (state = {
  data: null
}, action) => {

  switch(action.type) {
    case 'SAMPLE':
      state = {
        ...state,
        data: action.payload
      };
      break;
    default:
      break;
  }

  return state;
};

export default MyReducer;




file: store.js
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import MyReducer from './reducers/MyReducer';

const store = createStore(combineReducers({MyReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;























