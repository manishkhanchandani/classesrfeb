import React, {Component} from 'react';

import HealthPrintDiet from './HealthPrintDiet.jsx';

class HealthAssessment extends Component {
  
  render() {
    return(
      <section id="yourHealthAssessment">
        <div className="row recommendations">
          <HealthPrintDiet {...this.props} />
        </div>
      </section>
    );
  }
}

export default HealthAssessment