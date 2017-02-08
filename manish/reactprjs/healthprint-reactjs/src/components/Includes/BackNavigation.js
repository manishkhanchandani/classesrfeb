import React, { Component } from 'react';

class BackNavigation extends Component {
  render() {
    var divClassName = "btn btn-primary hq-nav-btn continue-answered-btn";
    return(
      <div className="col-xs-5 col-sm-3 col-md-3 col-lg-3">
        <button className={divClassName} onClick={() => this.props.previousQuestion()}>
            <i className="glyphicon glyphicon-chevron-left"></i>
            <span>Back</span>
        </button>
      </div>
    );
  }
}


export default BackNavigation;