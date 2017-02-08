import React, {Component} from 'react';
import {FormGroup,FormControl,Image} from 'react-bootstrap';

class InputTextField extends Component {
    constructor(props) {
        super(props);
        var selectedValue = this.props.answered[this.props.data.questionName];
        this.state = {value:selectedValue};
        this.handleChange = this.handleChange.bind(this);
    }

    getValidationState() {
        const pattern = /^([1-9]\d|[1-9]\d{1,})$/;
        const length = this.state.value.length;
        if (pattern.test(this.state.value) && (length <=3)){
            return 'success';
        }
        else if(length >3){
            //this.props.selectAnswered('weights',this.state.value);
        }
        else if (length > 0) return 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
        this.props.selectAnswered(this.props.data.questionName,e.target.value);
    }

    render() {
        return (
            <div className={this.props.data.className +' '+this.props.data.questionName}>
                <Image src={this.props.data.imageUrl} responsive className="hp-image"/>
                <h3 className="question-text" dangerouslySetInnerHTML={{__html: this.props.data.description}}></h3>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Your Age (Years)"
                        onChange={this.handleChange}
                    />
                </FormGroup>
            </div>
        )
    }
}


export default InputTextField