import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from '../components/nav/NavBar.js';


import Home from '../containers/Home.js';
import SignIn from '../components/auth/SignIn.js';
import SignUp from '../components/auth/SignUp.js';
import Intro from '../components/l1/day1/Intro.js';
import QuizList from '../components/Quiz/QuizList.js';
import QuizListYear from '../components/Quiz/QuizListYear.js';
import QuizListYearSubject from '../components/Quiz/QuizListYearSubject.js';
import QuizListYearSubjectQuiz from '../components/Quiz/QuizListYearSubjectQuiz.js';


class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <NavBar />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                
              </div>
            </div>
            
          
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/l1/day1/intro" component={Intro} />
            <Route exact={true} path="/quiz" component={QuizList} />
            <Route exact={true} path="/quiz/:year" component={QuizListYear} />
            <Route exact={true} path="/quiz/:year/:subject" component={QuizListYearSubject} />
            <Route exact={true} path="/quiz/:year/:subject/:quiz" component={QuizListYearSubjectQuiz} />
      
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />


            <div className="row">
              <div className="col-md-12">
                
              </div>
            </div>
          </div>
      </div>
      </Router>
    );
  }
}

export default App;
