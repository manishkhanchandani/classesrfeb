import React, { Component } from 'react';
import ObjectRow from './ObjectRow.js';

class MiddleNavigation extends Component {
  render() {
    var qid = this.props.questionId;
    return(
      <div className="col-xs-2 col-sm-6 col-md-6 col-lg-6">
        <ol className="carousel-indicators hq-indicators">
            {this.props.questionNumbers.map(function(object, i){
                return <ObjectRow obj={object} i={i} key={i} qid={qid} />;
            })}
         </ol>
      </div>
    );
  }
}


export default MiddleNavigation;