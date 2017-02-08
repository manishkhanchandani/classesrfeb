import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Dropdown from 'react-bootstrap-dropdown';

class MultiSelectDetail extends Component {
    constructor(props) {
        super(props);
        var selectedValue = null;
        //get data from saved state
        var chkFieldValInAnsObj = this.props.answered[this.props.data.questionName];
        if (!chkFieldValInAnsObj) {
          chkFieldValInAnsObj = {};
        }
      
        //update the selected value
        if (chkFieldValInAnsObj[this.props.item.key]) {
          selectedValue = chkFieldValInAnsObj[this.props.item.key];
        }
        this.state = {value: selectedValue};
    }
  
  
  
    handleClick(selectedField) {
      //get object from saved state
      var chkFieldValInAnsObj = this.props.answered[this.props.data.questionName];
      if (!chkFieldValInAnsObj) {
        chkFieldValInAnsObj = {};
      }
      
      chkFieldValInAnsObj[this.props.item.key] = selectedField;
      this.setState({value: selectedField});
      this.props.updateAnswered(this.props.data.questionName, chkFieldValInAnsObj);//update the state.answered field using this function
    }
  
    render() {
        var label = this.props.item.selectedLabel;
        if (this.state.value) {
          label = this.state.value.text;
        }//showing label from saved state
      
        var listOfItems = [];
        if (this.props.data.multiselect_keys) {
          var len = this.props.data.multiselect_keys.length;
          for(let i = 0; i < len;i++) {
              listOfItems.push({text:this.props.data.multiselect_labels[i],value:this.props.data.multiselect_keys[i]});
          }
        }//loop through each keys and values to get a new array
        return (
            <Row>
              <Col xs={6} md={6} lg={6} >
                  <Dropdown
                      title={label}
                      items={listOfItems}
                      onSelect={this.handleClick.bind(this)} />
              </Col>
            </Row>
        )
    }
}

export default MultiSelectDetail
