import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router';

import Home from './Home.js';
import SingleLinkedLists from './SingleLinkedLists.js';
import LinkedList from './LinkedList.js';

import CompleteDataStructures from './CompleteDataStructures.js';

ReactDOM.render(
  (<Router history={browserHistory}>
      <Route path="/" component={App}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="singlelinkedlists" component={SingleLinkedLists} />
         <Route path="linkedlist" component={LinkedList} />
         <Route path="complete" component={CompleteDataStructures} />
      </Route>
   </Router>),
  document.getElementById('root')
);
