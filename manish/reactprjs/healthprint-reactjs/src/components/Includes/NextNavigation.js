import React, { Component } from 'react';

class NextNavigation extends Component {
  render() {
    //changing the label of next button to respective
    var nextBtnLabel = 'Next';
    if ((this.props.totalQuestions - 1) === this.props.questionId) {
      nextBtnLabel = 'Submit';
    }//end if
    //end changing name
    
    var divClassName = "btn btn-primary hq-nav-btn continue-btn continue-answered-btn";
    return(
      <div className="col-xs-5 col-sm-3 col-md-3 col-lg-3">
            <button className={divClassName} onClick={() => this.props.nextQuestion()}>
                <span>{nextBtnLabel}</span>
                <i className="glyphicon glyphicon-chevron-right"></i>
            </button>
        </div>
    );
  }
}


export default NextNavigation;