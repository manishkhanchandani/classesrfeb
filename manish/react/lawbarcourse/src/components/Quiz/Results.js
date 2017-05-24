import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Results extends Component {
  
  render() {
    var percent = (this.props.setScore / this.props.totalQuestion * 100);
    var message;
    if (percent > 80) {
     message = 'Awesome Job';
    } else if (percent < 80 && percent > 60) {
     message = 'You Did OK!';
    } else {
     message = 'You Did Horrible!';
    }
    var linkInfo = '/quiz/'+this.props.year+'/'+this.props.subject;
    return(
      <div className="well">
        <h4>You Got {this.props.setScore} out of {this.props.totalQuestion} Correct</h4>
        <h1>{percent}% - {message}</h1>
        <hr />
        <Link to={linkInfo}>All Quiz</Link>
      </div>
    )
  }
}

export default Results