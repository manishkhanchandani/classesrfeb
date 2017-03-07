import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

class App extends Component {
   render() {
      return (
         <div>
            <ul>
               <li><Link to="/home">Home</Link></li>
               <li><Link to="/about">About</Link></li>
               <li><Link to="/contact">Contact</Link></li>
               <li><Link to="/xxx">xx</Link></li>
            </ul>
				
           {this.props.children}
         </div>
      )
   }
}


class Home extends Component {
   render() {
      return (
         <div>
            <h1>Home...</h1>
         </div>
      )
   }
}

class About extends Component {
   render() {
      return (
         <div>
            <h1>About...</h1>
         </div>
      )
   }
}


class Contact extends Component {
   render() {
      return (
         <div>
            <h1>Contact...</h1>
         </div>
      )
   }
}

class PageNotFound extends Component {
   render() {
      return (
         <div>
            <h1>Page Not Found...</h1>
         </div>
      )
   }
}


ReactDOM.render(
  (
   <Router history={browserHistory}>
      <Route path="/" component={App}>
         <IndexRoute component={Home} />
         <Route path="home" component={Home} />
         <Route path="about" component={About} />
         <Route path="contact" component={Contact} />
         <Route path="*" component={PageNotFound} />
      </Route>
   </Router>
	
),
  document.getElementById('root')
);
