/**
 * Created by dchitaur on 11/28/16.
 */

import React, { Component } from 'react';
import RemoteData from '../datalayer/data-request.jsx';
import ResultsHeader from './Results/Header.jsx';

class HealthprintResults extends Component {
  constructor(props) {
    super(props);
    var savedData = localStorage.getItem('answeredQuestions');
    var answered = null;
    if (savedData) {
      savedData = JSON.parse(savedData);
      answered = savedData.answered
    }
    
    console.log('result page: ', answered);
    this.state = {
      hpQuestionResult: {},
      hpRecomendationResult: {},
      hpContentResult: {},
      answered: answered
    }
  }
  
  getHPContentResult(data) {
    var _this = this;
    RemoteData.get('data/content.json', function(r) {
      _this.setState({hpContentResult: r});
    });
  }//end getHPRecommendationResult
  
  getHPRecommendationResult(data) {
    var _this = this;
    RemoteData.get('data/recommendation.json', function(r) {
      _this.setState({hpRecomendationResult: r});
      _this.getHPContentResult(r);
    });
  }//end getHPRecommendationResult
  
  getHPQuestionResult() {
    var _this = this;
    RemoteData.get('data/questions.json', function(r) {
      _this.setState({hpQuestionResult: r});
      _this.getHPRecommendationResult(r);
    });
  }//end getHPQuestions
  
  
  //call the getUserData function 
  componentDidMount() {
    this.getHPQuestionResult();
  }
  
  //render
  render() {
      console.log('state on result page: ', this.state);
      return (
          <div>
            <ResultsHeader {...this.state} />
          </div>
      )
  }
}

HealthprintResults.defaultProps = {
  healthProfileId: '123'
};

export default HealthprintResults;
