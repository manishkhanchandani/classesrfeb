import React, { Component } from 'react';
import {connect} from 'react-redux';
import QuizConstant from '../../constants/QuizConstant.js';

import Question from './Question.js';
import Results from './Results.js';

import {Link} from 'react-router-dom';

class QuizListYearSubjectQuiz extends Component {
  render() {
    if (!this.props.match.params.year) {
      return <div>No Year</div>;
    }
    if (!this.props.match.params.subject) {
      return <div>No Subject</div>;
    }
    if (!this.props.match.params.quiz) {
      return <div>No Quiz</div>;
    }
    console.log('props are: ', this.props);
    const year = parseInt(this.props.match.params.year, 10);
    const subject = parseInt(this.props.match.params.subject, 10);
    const quiz = parseInt(this.props.match.params.quiz, 10);
    console.log('year: ', year, ', subject: ', subject, ', quiz: ', quiz);
    var result = QuizConstant.list[year].subjects[subject].quiz[quiz];
    var scorebox;
    var linkTo = '/quiz/' + year + '/' + subject;
   
    if (this.props.quizReducer.setCurrent >= result.questions.length) {
      scorebox = <Results setScore={this.props.quizReducer.setScore} totalQuestion={result.questions.length} year={year} subject={subject} quiz={quiz} />;
    }
    
    return (
      <div>
        <h1>{result.name}</h1>
        <div><Link to={linkTo}>Back</Link></div>
        {scorebox}
        <div>
          <div>
            {
              result.questions.map((question, i) => {
                if (i !== this.props.quizReducer.setCurrent) {
                  return false;
                }
                return <div key={i}>
                  <Question question={question} year={year} subject={subject} quiz={quiz}  totalQuestion={result.questions.length} />
                  </div>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizReducer: state.QuizReducer
  }
};

export default connect(mapStateToProps)(QuizListYearSubjectQuiz);