import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import MyReducer from './reducers/MyReducer.js';

const store = createStore(MyReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
