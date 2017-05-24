import React, {Component} from 'react';

class Scorebox extends Component {
  render() {
    return(
      <div>
        Question {this.props.setCurrent + 1} out of {this.props.totalQuestion} <span className="pull-right"><strong>Score: {this.props.setScore}</strong></span>
      </div>
    );
  }
}

export default Scorebox