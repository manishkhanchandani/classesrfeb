import React, {Component} from 'react';

class HealthPrintDiet extends Component {
  
  render() {
    return(
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div className="section">
            <h1 className="title">Your Healthprint diet score of  <b>70</b> shows you’re on your way.</h1>
            <img className="img-responsive" role="presentation" src="//images.shaklee.com/healthprint/score-diet.png" />
            <div className="score-bar">
                <div className="legend"><span className="score-mover seventyPercent" ><em>70</em></span></div>
                <div className="bar">
                    <div className="scale red"> </div>
                    <div className="scale orange"> </div>
                    <div className="scale yellow"> </div>
                    <div className="scale green"> </div>
                </div>
                <div className="line"> <span className="left">0</span> <span className="right">100</span> </div>
            </div>
            <div className="score-info">
                <p><span>You’re already doing lots of great things to improve your health.  Based on your responses, here are a few more things you can do take your nutritional health to the next level:</span></p>
                <ul>
                    <li>
                        <p>
                            <span >Reducing your intake of unhealthy snacks and fast food is something you can start right away.</span>
                        </p>
                    </li>
                    <li >
                        <p>
                            <span>Try to reduce your intake of sugary drinks</span>
                        </p>
                    </li>
                    <li >
                        <p>
                            <span>You’re well on your way to getting the vegetables your body needs! To perform at your best, make sure you are eating at least 3 servings of vegetables every day.</span>
                        </p>
                    </li>
                </ul>
            </div>
            <div className="read-more-box">
                <span className="learn-more ng-binding">Read More</span>
            </div>
        </div>
      </div>
    );
  }
}

export default HealthPrintDiet