import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css'

class ResultsHeader extends Component {
  
  render() {
    return(
      <div className="container">
        <h1>Health Print Results Pages</h1>
        <div id="views">
          
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.props.hpQuestionResult.email}
          </div>
          <div className="col-md-6">
            <i className="fa fa-print fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3>{this.props.hpQuestionResult.first_name} {this.props.hpQuestionResult.last_name}</h3>
            <p>Your HEALTHPRINT™ Summary and Recommendations</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ResultsHeader