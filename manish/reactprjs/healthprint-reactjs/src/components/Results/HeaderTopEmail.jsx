import React, {Component} from 'react';

class HeaderTopEmail extends Component {
  
  render() {
    return(
      <div className="row health-results-above-banner">
        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 email-address">
            {this.props.answered.email}
        </div>
        <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 text-right resultTopLinks">
            <a href="">RETAKE YOUR ASSESSMENT</a>
            <a href=""><i className="fa fa-print fa-2x" aria-hidden="true"></i></a><a href=""><i className="fa fa-envelope-o fa-2x" aria-hidden="true"></i></a>
        </div>
      </div>
    );
  }
}

export default HeaderTopEmail