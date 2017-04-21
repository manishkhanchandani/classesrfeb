import React, { Component } from 'react';

import {guid} from './MyFunctions.js';

class DisplayList extends Component {

    render() {

      if (!this.props.list) {
        return (<div></div>);
      }
      return (
        <ul>
          {this.props.list.map((value, key) => {
            return <li key={key}>{value.data}</li>
          })}
        </ul>
      );
    }
}

class EmptyList extends Component {
  render() {
    if (this.props.start) {
      return (<div></div>);
    }
    return (
      <strong>
        List is empty
      </strong>
    );
  }
}

class CompleteDataStructures extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  submitForm(e) {
    
  }

  render() {
    console.log('this state: ', this.state);
    const myStyle1 = {
         marginLeft: 15
    };
    return (
      <div>
        <div className="row">
          <div className="col-md-12">

            <h1>Complete Data Structures</h1>
          
            
            <form className="form-inline" onSubmit={this.submitForm.bind(this)}>
                <div className="form-group">
                    <label>Data in List</label>
                    <input type="text" className="form-control" placeholder="Enter data" ref="data" style={myStyle1} />
                </div>
                <br />
                <br />
                <button type="button" className="btn btn-default" style={myStyle1}>Hello</button>
            </form>
            <br /><br />

          </div>
        </div>


      </div>
    );
  }
}

export default CompleteDataStructures;
