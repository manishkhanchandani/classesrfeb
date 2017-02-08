import React, {Component} from 'react';
import {Row} from 'react-bootstrap';
import ButtonSelectionList from './ButtonSelectionList.js';
import InputTextField from './InputTextField.js';
import WeightHeight from './WeightHeight.js';
import CheckBoxSelection from './CheckBoxSelection.js';
import PersonalInformation from './PersonalInformation.js';
import MultiSelection from './MultiSelection.js';

class QuestionTable extends Component {
    constructor(props) {
        super(props);
        this.selectedAnswered = this.selectedAnswered.bind(this);
    }
    selectedAnswered(fieldName, value) {
        //console.log('QuestionTable.js, selectedAnswered clicked with field: ', fieldName, ' and the value: ', value);
        this.props.updateAnswered(fieldName,value);
    }
    render() {
         //console.log('QuestionsTable.js props in question table is : ', this.props);
         let questionSection = [];
         const components = {
             InputTextField,
             ButtonSelectionList,
             WeightHeight,
             CheckBoxSelection,
             PersonalInformation,
             MultiSelection
         };

        //let curQuestions = this.props.questionList[this.props.questionId].question;
        let curQuestions = this.props.questionList[this.props.selectedQuestionId].question;
         for (var i = 0; i < curQuestions.length; i++) {
             let QuestionCol = components[curQuestions[i].componentName];
             questionSection.push(<QuestionCol key={i} data={curQuestions[i]} selectAnswered={this.selectedAnswered} {...this.props}/>);
         }

        return (
            <Row>
                {questionSection}
            </Row>
        );
    }
}
export default QuestionTable