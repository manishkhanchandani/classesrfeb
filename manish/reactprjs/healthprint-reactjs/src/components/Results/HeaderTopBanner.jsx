import React, {Component} from 'react';

class HeaderTopBanner extends Component {
  
  render() {
    return(
      <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="row health-results-banner">
                  <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 img-banner-placeholder">
                      <img src="//images.shaklee.com/healthprint/Healthprint-Logo.png" role="presentation" />
                  </div>
                  <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                      <div className="hp-profile-name">
                          <h1 className="summary">{this.props.answered.first_name} {this.props.answered.last_name},</h1>
                          <h4>Your HEALTHPRINT™ Summary and Recommendations</h4>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default HeaderTopBanner