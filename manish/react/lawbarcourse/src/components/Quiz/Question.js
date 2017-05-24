import React, {Component} from 'react';
import {connect} from 'react-redux';
import {QuestionAction} from '../../actions/QuizAction.js';
import Scorebox from './Scorebox.js';

class Question extends Component {
  
  onChange(e) {
    e.preventDefault();
    const {question} = this.props;
    
    var setCurrent = this.props.quizReducer.setCurrent;
    var setScore = this.props.quizReducer.setScore;

    
    let selected = e.target.value; //whatever current radio box value
    if (selected === question.correct) {
      setScore = setScore + 1;
    }
    
    setCurrent = setCurrent + 1;
    this.props.callQuestionAction(setCurrent, setScore);
  }
  
  render() {
    const {question} = this.props;
    console.log('props are ', this.props);
    var scorebox;
    if (this.props.quizReducer.setCurrent > this.props.totalQuestion) {
      
    } else {
      scorebox = <Scorebox {...this.props.quizReducer} question={question} totalQuestion={this.props.totalQuestion} />;
    }
    return(
      <div className="well">
        {scorebox}
        <h3>{question.text}</h3>
        <hr />
        <ul className="list-group">
          {question.choices.map(choice => {
            return(
              <li className="list-group-item" key={choice.id}>
                {choice.id}. <input type="radio" onChange={this.onChange.bind(this)} name={question.id} value={choice.id} /> {choice.text}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quizReducer: state.QuizReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    callQuestionAction: (setCurrent, setScore) => {
      dispatch(QuestionAction(setCurrent, setScore));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Question);