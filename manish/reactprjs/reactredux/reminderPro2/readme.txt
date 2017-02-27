create-react-app project1

cd project1

npm install redux react-redux --save

npm start

copy bootstrap from bootstrapcdn.com to index.html page
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css

optionally include following if you have jquery else don't do anything
//https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js


Delete the src folder and recreate the src folder

Create a new file index.js and add following code in it manually (don't copy paste)

----------------------
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>Reminder</div>, document.getElementById('root')
)
----------------------

View the page on browser and you will see Reminder on the page

Create a components folder inside the src folder

Create a new component App.js inside components

Add following code in App.js

----------------------
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline">
          <div className="form-group">
            <input className="form-control" placeholder="I have to ..." />
          </div>
          <button type="button" className="btn btn-success">Add Reminder</button>
        </div>
      </div>
    )
  }
}

export default App;

----------------------

Now import App in index.js as:

import App from './components/App.js';

And change the div to <App />


Let's add redux, where we have one big store

Actions are plain javascript object, they have type property, type will tell what type of action is being performed.., it has payload with some kind of data, 


Lets add a constants.js file inside src folder.
Add following code inside the constants.js file

export const ADD_REMINDER = 'ADD_REMINDER';

Now create a new folder actions inside the src folder

Create a new file index.js inside the actions folder. Add following code in that file

----------------------
import { ADD_REMINDER } from '../constants';

export const addReminder = (text) => {
  const action = {
    type: ADD_REMINDER,
    text
  }
  console.log('action in addReminder: ', action);
  
  return action;
}

----------------------



Now to setup redux which has one store to hold all the states, we do following steps.

Go to index.js and add following code after App code


----------------------

import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>, document.getElementById('root')
)

----------------------

You will get following error now:
Warning: Failed prop type: The prop `store` is marked as required in `Provider`, but its value is `undefined`.
    in Provider (at index.js:8)
printWarning @ warning.js:36
warning @ warning.js:60
checkReactTypeSpec @ checkReactTypeSpec.js:80
validatePropTypes @ ReactElementValidator.js:151
createElement @ ReactElementValidator.js:194
(anonymous) @ index.js:7
__webpack_require__ @ bootstrap 3316c3d…:555
fn @ bootstrap 3316c3d…:86
(anonymous) @ bootstrap 3316c3d…:578
__webpack_require__ @ bootstrap 3316c3d…:555
(anonymous) @ bootstrap 3316c3d…:578
(anonymous) @ bootstrap 3316c3d…:578
warning.js:36Warning: Failed childContext type: The child context `store` is marked as required in `Provider`, but its value is `undefined`.
    in Provider (at index.js:8)
    
    


To fix this, lets create a store in index.js as shown below

----------------------

import { createStore } from 'redux';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)

----------------------

now you will get following error:

Uncaught Error: Expected the reducer to be a function.


Now lets create a reducers folder inside src and create index.js file inside it, and add following code inside it:

----------------------

import { ADD_REMINDER } from '../constants';

const reminder = (action) => {
  return {
    text: action.text,
    id: Math.random()
  }
}

const reminders = (state = [], action) => {
  let reminders = null;
  
  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      console.log('reminders as state: ', reminders);
      return reminders;
      break;
    default:
      return state;
  }
}

export default reminders;

----------------------


Remember constant -> action -> reducer


Now change the src/index.js as


----------------------
import reducer from './reducers';

const store = createStore(reducer);
----------------------

Go to components/App.js and add constructor:
----------------------
constructor(props) {
    super(props);
    
    this.state = {
      text: ''
    }
  }
----------------------
Add another function in same file

----------------------
  addReminder() {
    console.log('this.state', this.state);
  }
 ---------------------- 
Change following with event handlers
----------------------
<input className="form-control" placeholder="I have to ..." onChange={event => this.setState({text: event.target.value})} />
----------------------
and
----------------------
<button type="button" className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button>
----------------------

now connect component to store
add following in App.js
----------------------
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder } from '../actions';
----------------------
And create following function in same file
----------------------
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder}, dispatch);
}
----------------------

And change the export line to
----------------------
export default connect(null, mapDispatchToProps)(App);
----------------------

Change the addReminder function in same file as and run the file in browser and click submit to see the props inside the this.

----------------------
  addReminder() {
    console.log('this', this);
  }
----------------------

you will see in console.log as:
props
  addReminder

Now call action from your addReminder function in App.js

addReminder() {
  this.props.addReminder(this.state.text);
}





