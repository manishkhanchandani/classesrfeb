import React, { Component } from 'react';
import QuizConstant from '../../constants/QuizConstant.js';
import {Link} from 'react-router-dom';

class QuizList extends Component {
  render() {
    
    return (
      <div>
        <h1>Quiz</h1>
        <ul>
          {
            QuizConstant.list.map((quiz, i) => {
              var linkInfo = '/quiz/'+i;
              return <div key={i}><Link to={linkInfo}>{quiz.name}</Link></div>
            })
          }
        </ul>
      </div>
    );
  }
}

export default QuizList;