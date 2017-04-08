import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

import Home from './Home.js';
import SingleLinkedLists from './SingleLinkedLists.js';
import LinkedList from './LinkedList.js';

import DSArray from './DSArray.js';
import DSStacks from './DSStacks.js';

ReactDOM.render(
  (<Router history={browserHistory}>
      <Route path="/" component={App}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="singlelinkedlists" component={SingleLinkedLists} />
         <Route path="linkedlist" component={LinkedList} />
         <Route path="array" component={DSArray} />
         <Route path="stacks" component={DSStacks} />
      </Route>
   </Router>),
  document.getElementById('root')
);
