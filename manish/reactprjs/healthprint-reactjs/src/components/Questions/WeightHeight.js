import React, {Component} from 'react';
import {Row, Col, FormGroup,FormControl,Image} from 'react-bootstrap';
import Dropdown from 'react-bootstrap-dropdown';

class WeightHeight extends Component {
    constructor(props) {
        super(props);
        //get weight and heights
        var weight = this.props.answered['weights'] || "";
        var height_inches = this.props.answered['height_inches'] || "";
        //convert height_inches to ft and in
        var feet = "";
        var inches = "";
        if (height_inches) {
          feet = parseInt(height_inches / 12, 10);
          inches = parseInt((height_inches % 12).toFixed(3), 10);
        }
        //set the state
        this.state = {value:weight,selectHeightIn:inches,selectHeightFt:feet};
    }

    getValidationState() {
        const pattern = /^([1-9]\d|[1-9]\d{2,})$/;
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
       this.props.selectAnswered('weights',e.target.value);
    }


    updateFt(selectHeight) {
        var heights = "";
        this.props.selectAnswered("height_inches", heights);
        var inch = this.state.selectHeightIn;
        if (selectHeight.value.length>0 && inch && inch >= 0) {
          heights= parseInt(selectHeight.value,10) * 12 + parseInt(this.state.selectHeightIn,10);
          this.props.selectAnswered("height_inches", heights);
        }
        this.setState({
            selectHeightFt: selectHeight.value
        });
    }
    updateInches(selectHeight) {
        var heights = "";
        this.props.selectAnswered("height_inches", heights);
        var ft = this.state.selectHeightFt;
        if (selectHeight.value.length> 0 && ft && ft >= 0) {
          heights = parseInt(this.state.selectHeightFt, 10) * 12 + parseInt(selectHeight.value, 10);
          this.props.selectAnswered("height_inches", heights);
        }
        this.setState({
            selectHeightIn: selectHeight.value
        });
    }

    render() {

        let heightFtOptions = [{text:"Height(Ft)",value:''}];
        let heightInOptions=[{text:"Height(In)",value:''}];

        for(let f = 3; f <=7;f++) {
            heightFtOptions.push({text:f+" feet",value:''+f});
        }
        for(let i = 0; i < 12;i++) {
            heightInOptions.push({text:i+" inches",value:''+i});
        }

        //getting ft and in title
        var titleHeightFt = "Height(Ft)";
        var titleHeightIn = "Height(In)";
        var tmpHt = this.state.selectHeightFt;
        var tmpIn = this.state.selectHeightIn;
        if (tmpHt.toString() && this.state.selectHeightFt >= 0) {
          titleHeightFt = this.state.selectHeightFt;
          titleHeightFt = titleHeightFt.toString() + ' feet';
        }
        if (tmpIn.toString() && this.state.selectHeightIn >= 0) {
          titleHeightIn = this.state.selectHeightIn;
          titleHeightIn = titleHeightIn.toString()+ ' inches';
        }
        //ending ft and in title
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
                        placeholder="Weight (in lbs)"
                        onChange={this.handleChange.bind(this)}
                    />
                </FormGroup>
                <Row>
                    <Col xs={6} md={6} lg={6} >
                        <Dropdown
                            title={titleHeightFt}
                            items={heightFtOptions}
                            onSelect={this.updateFt.bind(this)} />
                    </Col>
                    <Col xs={6} md={6} lg={6} >
                        <Dropdown
                            title={titleHeightIn}
                            items={heightInOptions}
                            onSelect={this.updateInches.bind(this)} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default WeightHeight