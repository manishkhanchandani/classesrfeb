import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css';

import HeaderTopEmail from './HeaderTopEmail.jsx';
import HeaderTopBanner from './HeaderTopBanner.jsx';
import HealthAssessment from './HealthAssessment.jsx';

class ResultsHeader extends Component {
  
  render() {
    return(
      <div className="container">
        <h1>Health Print Results Pages</h1>
        
        <div id="views">
          <div id="personalized-health" className="personalized-results">
            <HeaderTopEmail {...this.props} />
            <HeaderTopBanner {...this.props} />
            <HealthAssessment {...this.props} />
          </div>
        </div>
        
      </div>
    );
  }
}

export default ResultsHeader