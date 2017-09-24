Phase I Started
1. Create new app
2. Install necessary modules
3. Create folder structures
4. Create Basic File Content



create-react-app donation

npm install redux redux-logger react-redux redux-thunk redux-promise-middleware react-google-autocomplete firebase react-router-dom --save

npm install react-google-autocomplete --save

npm install firebase --save

npm install react-router-dom --save

npm install react-router --save


Folder Structure Creation

  index.js
  store.js
  firebase.js
  containers
    App.js
  components
    Home.js
  actions
    MyAction.js
  reducers
    MyReducer.js
  constants
    MyConstant.js
    

Add Following in index.html file
<link rel='stylesheet' href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" type="text/css">
   
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvXqWIcqyTVRgjXsVjDbdORcNaXHVjtOw&libraries=places"></script>

Create firebase.js file with following code in it:

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


Add following Code in containers/App.js

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <div>Navigation will come here</div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Header</h2>
            </div>
          </div>
          {this.props.children}
          <div className="row">
            <div className="col-md-12">
              <h2>Footer</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


Add following code in components/Home.js

import React, { Component } from 'react';
import {connect} from 'react-redux';

import {sample} from '../actions/MyAction.js';


class Home extends Component {
  render() {
    return (
      <div>
        Home
        <br />
        <button onClick={() => this.props.callSampleAction()}>Call Action</button>
        <br />
        Data is {this.props.myReducer.data}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myReducer: state.MyReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    callSampleAction: () => {
      dispatch(sample());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);



Add Following code in index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

import {Provider} from 'react-redux';
import store from './store.js';

//import {firebaseApp} from './firebase';

import Home from './components/Home.js';


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App}>
           <IndexRoute component={Home} />
           <Route path="home" component={Home} />
        </Route>
     </Router>
   </Provider>,
  document.getElementById('root')
);




Create store.js file and add following code:

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import MyReducer from './reducers/MyReducer';

const store = createStore(combineReducers({MyReducer}), {}, applyMiddleware(createLogger(), thunk, promise()));

export default store;


Update App.js with following code to accept redux
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <div>Navigation will come here</div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Header</h2>
            </div>
          </div>
          {this.props.children}
          <div className="row">
            <div className="col-md-12">
              <h2>Footer</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


add following content in actions/MyAction.js
//import {sample} from '../actions/MyAction.js';

export const sample = () => {
  return {
    type: 'SAMPLE',
    payload: 10
  }
}


Add following code in MyReducer.js
const MyReducer = (state = {
  data: null
}, action) => {

  switch(action.type) {
    case 'SAMPLE':
      state = {
        ...state,
        data: action.payload
      }
      break;
    default:
      break;
  }

  return state;
};

export default MyReducer;



Phase I completed
  
  
Phase II stared
Steps to be done:
1. Create Navigation
2. Create SignIn & Signup, and SignOut Components
3. Create Firebase Module in Firebase website and get the configuration
4. Create Route for sigin and sign up
5. Create Html and JS for signin, signup and SignOut Components
6. Make sure you tie everything to redux




Phase II completed


Phase III stared
Steps to be done:




Phase III completed