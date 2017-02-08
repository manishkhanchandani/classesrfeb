import React, {Component} from 'react';

class CheckboxDetail extends Component {
    constructor(props) {
        super(props);
        var chkFieldValInAnsArr = this.props.answered[this.props.data.questionName];
        var selectedValue = null;
        if (chkFieldValInAnsArr && chkFieldValInAnsArr.length > 0) {
          for (var i = 0; i < chkFieldValInAnsArr.length; i++) { //loop through each to select the checkbox
            if (chkFieldValInAnsArr[i] === this.props.item.key) {
              selectedValue = true;
            }
          }
        }//end if
        this.state = {value: selectedValue};
    }
  
    handleClick(e) {
      //check if answered is having current key
      var i;
      var chkFieldValInAnsArr = this.props.answered[this.props.data.questionName];
      var chkFieldValInAnsObj = {};
      //convert array to obj
      if (chkFieldValInAnsArr && chkFieldValInAnsArr.length > 0) { //check if answered is already having the array
        for (i = 0; i < chkFieldValInAnsArr.length; i++) { //loop through each and save it in object
          chkFieldValInAnsObj[chkFieldValInAnsArr[i]] = true; //make field = true
        }
      }//end if
      
      chkFieldValInAnsObj[e.target.name] = e.target.checked;//add the checked state in current object
      this.setState({value: e.target.checked});//update the current checked state
      
      //create array to save (obj to array)
      if (chkFieldValInAnsObj) {
        chkFieldValInAnsArr = [];//resetting the array
        for (i in chkFieldValInAnsObj) { //looping the object to put it in 
          if (chkFieldValInAnsObj.hasOwnProperty(i)) { //this is to prevent lint warning
            if (chkFieldValInAnsObj[i]) { //if the value is true, then only add it in array
              chkFieldValInAnsArr.push(i); //add the value in array for saving it in future data
            }//end if
          }//end if
        }//end for
      }//end if
      
      this.props.updateAnswered(this.props.data.questionName, chkFieldValInAnsArr);//update the state.answered field using this function
    }
  
    render() {
        var name = this.props.item.key;
        var id = this.props.item.key;
        var checkedString = '';
        if (this.state.value) {
          checkedString = 'checked';
        }
        return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
              <div className="checkbox-selection-option">
                  <input type="checkbox" name={name} id={id} value={this.props.item.key} onChange={this.handleClick.bind(this)} checked={checkedString} />
                  <label> </label>
                  <span className="chkSpan"> {this.props.item.label}</span>
              </div>
            </div>
        )
    }
}

export default CheckboxDetail
