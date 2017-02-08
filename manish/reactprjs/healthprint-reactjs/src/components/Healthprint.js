import React, { Component } from 'react';

import {Row, Col} from 'react-bootstrap';
import Config from '../config/config.json';
import 'font-awesome/css/font-awesome.css';
import QuestionTable from './Questions/QuestionTable.js';

import BottomNavigation from './Includes/BottomNavigation.js';

/**
 * healthprint component
 */
class HealthprintLayout extends Component {
    constructor(props) {
        super(props);
        let curAnswered = Config.answered;
        let curQuestionDefaults = Config.questionDefaults;
        var qid = 0;
      
        //get details from localStorage
        var savedData = localStorage.getItem('answeredQuestions');
        if (savedData) {
          savedData = JSON.parse(savedData);
          console.log('local saved data is ', savedData);
          curAnswered = savedData.answered;
          curQuestionDefaults.template = savedData.template;
          qid = savedData.index;
        }//end if
      
        //if question id is passed from url
        if (this.props.params.qid) {
          qid = parseInt(this.props.params.qid, 10);
        }//end if question
      
        /*//if template is passed from url
        if (this.props.params.template) {
          curQuestionDefaults.template = this.props.params.template;
        }//end if template*/
      
        let {totalQuestions, questionNumbers} = this.templateQuestions(curQuestionDefaults.template);
      
        this.state = {questionId:qid, answered:curAnswered, questionDefaults: curQuestionDefaults, totalQuestions: totalQuestions, questionNumbers: questionNumbers};
        console.log('state: ', this.state);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.updateAnswered = this.updateAnswered.bind(this);
    }
  
    //save to local storage for specific key and value
    saveDataToLocalStorage(key, value) {
      var savedData = localStorage.getItem('answeredQuestions');
      if (savedData) {
        savedData = JSON.parse(savedData);
      } else {
        savedData = {};
      }
      savedData[key] = value;
      localStorage.setItem('answeredQuestions', JSON.stringify(savedData));
    }
  
    validateQuestions() {
      var proceed = true;
      var currentPage = this.getQuestionId(this.state.questionDefaults.template, this.state.questionId);
      //console.log('cur page: ', currentPage, ', ', Config.questionList[currentPage].question);
      //validate the next question
      if (currentPage >= 0) {
        Config.questionList[currentPage].question.forEach((question) => {
          //more validation will come here
          if (!question.questionName) {
            return true;
          }//end if
          
          //console.log('q: ', question.questionName, ', a: ', this.state.answered[question.questionName], ', type: ', typeof this.state.answered[question.questionName])
          var check1 = (typeof this.state.answered[question.questionName] === 'number' && this.state.answered[question.questionName] >= 0);
          var check2 = (typeof this.state.answered[question.questionName] === 'object' && this.state.answered[question.questionName] !== "");
          var check3 = (typeof this.state.answered[question.questionName] === 'string' && this.state.answered[question.questionName] !== "");
          var check = check1 || check2 || check3;
          //console.log(question.questionName, ', check: Num:', check1, ', Obj:', check2, ', Str:', check3, ', ', check);
          if (!check) {
            proceed = false;
          }//end if
        });//end foreach
        
      }//end if
      
      return proceed;
    }
  
    templateQuestions = (template) => {
        var totalQuestions = Config.questionPageChoices[template].length;
        var questionNumbers = Config.questionPageChoices[template];
        return {totalQuestions, questionNumbers};
    };
  
    nextQuestion(event) {
        var validate = this.validateQuestions();
        if (!validate) {
          alert('fill all question');
          return false;
        }
        
        let {totalQuestions} = this.templateQuestions(this.state.questionDefaults.template);
        //console.log('total number of questions: ', totalQuestions);
      
        let curQuestionId = this.state.questionId + 1;
        //proceed to next question
        if ( this.state.questionId >= 0 && this.state.questionId < (totalQuestions - 1)) { //&& this.state.questionId < Config.questionList.length
            let template = 'default';
            let questionDefaults = this.state.questionDefaults;
            if (this.state.answered.age < 14) {
              template = 'child';
            } else if (this.state.answered.gender === 1) {
              template = 'woman';
            }//end if
          
            //change template if it is different from current state
            if (this.state.questionDefaults.template !== template) {
              //save template to state
              questionDefaults.template = template;
              this.setState({questionDefaults: questionDefaults});

              //save template to local storage
              this.saveDataToLocalStorage('template', template);

              //get new question total and question numbers
              let {totalQuestions, questionNumbers} = this.templateQuestions(template);
              //updating the state
              this.setState({totalQuestions: totalQuestions, questionNumbers: questionNumbers});
            }//end if change tempalte
        }
        
        //check if the greater than question then redirect user to result page
        if( curQuestionId > totalQuestions - 1) {
            curQuestionId = totalQuestions - 1;
            console.log('last question is this ', curQuestionId);
            this.props.router.replace('healthprint-results');
        }

        //save state and local storage for index
        this.setState({
            questionId: curQuestionId
        });
        this.saveDataToLocalStorage('index', curQuestionId);
    }
    previousQuestion(event) {
        let curQuestionId = this.state.questionId - 1;
        if ( curQuestionId < 0 ) {
          curQuestionId = 0;
          this.props.router.replace('IntroPage');
        }

      
        this.setState({
                questionId: curQuestionId
            });
        this.saveDataToLocalStorage('index', curQuestionId);
    }

    updateAnswered(answeredName,value) {
        let curAnswered = this.state.answered;
        curAnswered[answeredName] = value;
        this.setState({
            answered: curAnswered
        });
        var savedData = {answered: curAnswered, index: this.state.questionId, template: this.state.questionDefaults.template};
        localStorage.setItem('answeredQuestions', JSON.stringify(savedData));
      
        console.log('local storage saving with key answeredQuestions: ', savedData);
    }
  
    getQuestionId(template, index) {
      //console.log('index is ', index);
      //console.log('template is ', template);
      var list = Config.questionPageChoices;
      //console.log('list is ', list);
      var listOfQuestions = list[template];
      //console.log('list questions is ', listOfQuestions);
      var questionId = listOfQuestions[index];
      return questionId;
    }
    /**
    componentDidMount() {
        fetch("/data/config.json")
            .then(response => response.json())
            .then(json => {
                this.setState({items:json});
            });
    }
    */
    render() {
        console.log('Healthprint.js state ', this.state);
        var questionId = this.getQuestionId(this.state.questionDefaults.template, this.state.questionId);
      
        //var question = Config.questionList[this.state.questionId];
        //console.log('Healthprint.js real question id is ', questionId);
        //console.log('Healthprint.js state is ', this.state);
        //console.log('Healthprint.js template is ', this.state.questionDefaults.template);
        //console.log('Healthprint.js props params: ', this.props.params);
        return (
            <div className="Question-layout">
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <QuestionTable questionId={this.state.questionId} questionList={Config.questionList} selectedQuestionId={questionId} updateAnswered={this.updateAnswered} answered={this.state.answered}/>
                        <BottomNavigation previousQuestion={this.previousQuestion} nextQuestion={this.nextQuestion} {...this.state} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HealthprintLayout;