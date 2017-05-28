import React, { Component } from 'react';
import '../../../css/style.css';

class ShowIntro extends Component {
  render() {
    if (this.props.counter === -1) {
      return (
        <div>
        </div>
      );
    }
    var arr = [];
    for (var i = 0; i <= this.props.counter; i++) {
      arr.push(<div key={i} className="text">{this.props.data[this.props.selected][i]}</div>)
    }
    return (
      <div>
        {arr}
      </div>
    );
  }
}

class FormationContract extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      counter: -1,
      selected: 'ucc',
      data: {
        ucc: [
          '1. The Uniform Commercial Code (UCC) governs contracts for sale of goods',
          '2. Common Law governs all the laws except sale of goods',
          '3. Example of Common law: Agreement of Exchange of Service, Real Property Contracts, etc.',
          '4. Goods are tangible chattels which are movable and identifiable to the contract at the time of formation. To remember: Tangible, Movable and Identifiable.',
          '5. Intangible goods means which are unable to be touched or grasped; not having physical presence.',
          '6. Examples of Intangible goods are: Trademarks, Patented technology, Computer software, Trade Secrets, etc. ',
          '7. Predominant Factor Test, is used when we have goods and services, both in one contract. So here if contract\'s primary purpose is sale of goods or provision of services and then court apply the appropriate law. However, the court may apply the UCC to the goods portion of the contract, and the common law to the remaining terms.'
        ]
      }
    }
  }
  
  changeCounterSel(newCounter, newSelected) {
    this.setState({counter: newCounter, selected: newSelected})
  }
  
  callNext(selected) {
    var counter = this.state.counter;
    if (selected !== this.state.selected) {
      counter = -1;
    }
    counter++;
    if (counter > this.state.data[selected].length - 1) {
      return;
    }
    this.changeCounterSel(counter, selected);
  }
  

  
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Formation of Contracts</h1>
      
        <div className="row">
          <div className="col-md-2 col-xs-2 col-sm-2 col-lg-2">
            <div className="btn-group-vertical">
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('ucc')}>Governing Law</button>
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('validContract')}> Valid Contract</button>
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('offer')}> Offer</button>
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('acceptance')}> Acceptance</button>
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('consideration')}> Consideration</button>
            </div>
          </div>
          <div className="col-md-9 col-xs-9 col-sm-9 col-lg-9">
            <ShowIntro {...this.state}  />
          </div>
        </div>
      
      
      </div>
    );
  }
}

export default FormationContract;