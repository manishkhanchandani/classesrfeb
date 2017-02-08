import React, {Component} from 'react';
import {Button, Image} from 'react-bootstrap';

class ButtonSelectionList extends Component {

    constructor(props) {
        super(props);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked(value,obj) {
        this.props.selectAnswered(this.props.data.questionName,value);
    }

    isValid(curValue){
        return this.state[this.props.data.questionName] === curValue;
    }
    render() {
        var selectedValue = this.props.answered[this.props.data.questionName];
        var buttonList = [];
        var selectedClass = '';
        for (var i = 0; i < this.props.data.values.length; i++) {
            let curValue = this.props.data.values[i];
            selectedClass = 'btn default btn-block';
            if (curValue.value === selectedValue) {
                selectedClass = 'btn default btn-block hp-selected-btn';
            }
            buttonList.push(<Button key={i} className={selectedClass} bsStyle="primary" bsClass={curValue.className} onClick={this.buttonClicked.bind(this,curValue.value)}>{curValue.label}</Button>);
        }
        return (
            <div className={this.props.data.className +' '+this.props.data.questionName}>
                <Image src={this.props.data.imageUrl} responsive className="hp-image"/>
                <h3 className="question-text" dangerouslySetInnerHTML={{__html: this.props.data.description}}></h3>
                <div className="button-selection">
                    {buttonList}
                </div>
           </div>
        )
    }
}

export default ButtonSelectionList