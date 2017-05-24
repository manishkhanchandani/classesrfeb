import React, { Component } from 'react';
import QuizConstant from '../../constants/QuizConstant.js';
import {Link} from 'react-router-dom';

class QuizListYear extends Component {
  render() {
    if (!this.props.match.params.year) {
      return false;
    }
    const year = parseInt(this.props.match.params.year, 10);
    var result = QuizConstant.list[year];
    console.log(result);
    return (
      <div>
        <h1>{result.name}</h1>
        <div><Link to='/quiz'>Back</Link></div>
        <ul>
          {
            result.subjects.map((subject, i) => {
              var linkInfo = '/quiz/'+this.props.match.params.year+'/'+i;
              return <div key={i}><Link to={linkInfo}>{subject.name}</Link></div>
            })
          }
        </ul>
      </div>
    );
  }
}

export default QuizListYear;