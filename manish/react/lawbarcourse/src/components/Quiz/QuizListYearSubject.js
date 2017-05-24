import React, { Component } from 'react';
import QuizConstant from '../../constants/QuizConstant.js';
import {connect} from 'react-redux';
import {ResetAction} from '../../actions/QuizAction.js';
import {Link} from 'react-router-dom';

class QuizListYearSubject extends Component {
  
  componentDidMount() {
    this.props.callResetAction();
  }
  render() {
    if (!this.props.match.params.year) {
      return false;
    }
    if (!this.props.match.params.subject) {
      return false;
    }
    const year = parseInt(this.props.match.params.year, 10);
    const subject = parseInt(this.props.match.params.subject, 10);
    console.log('year: ', year, ', subject: ', subject);
    var result = QuizConstant.list[year].subjects[subject];
    console.log(result);
    var linkTo = '/quiz/' + this.props.match.params.year;
    return (
      <div>
        <h1>{result.name}</h1>
        <div><Link to={linkTo}>Back</Link></div>
        <ul>
          {
            result.quiz.map((quiz, i) => {
              var linkInfo = '/quiz/'+year+'/'+subject+'/'+i;
              return <div key={i}><Link to={linkInfo}>{quiz.name}</Link></div>
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizReducer: state.QuizReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    callResetAction: () => {
      dispatch(ResetAction());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuizListYearSubject);