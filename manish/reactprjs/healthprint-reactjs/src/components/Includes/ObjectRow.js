import React, { Component } from 'react';

class ObjectRow extends Component {
  render() {
    var divClassName = "";
    if (this.props.i === this.props.qid) {
      divClassName = "active";
    }
    
    return(
      <li className={divClassName}>
          <span className="sr-only"></span>
      </li>
    );
  }
}


export default ObjectRow;