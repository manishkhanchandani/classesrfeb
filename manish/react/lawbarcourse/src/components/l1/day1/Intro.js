import React, { Component } from 'react';
import '../../../css/style.css';

class ShowIntro extends Component {
  render() {
    if (this.props.counter === -1) {
      return (
        <div>
          <h3>California Baby Bar Exam</h3>
          <p>We have to study three subjects for baby bar, they are Contracts, Criminal, Torts</p>
          <p>We will also learn how to write an Essay and how to give Multiple Choice Questions</p>
          <p>This course is 30 Day intensive course on California Baby Bar Examination.</p>
          <p>For these 30 days, just remember what I say, forget about what your professors have taught you.</p>
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

class Intro extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      counter: -1,
      selected: 'contracts',
      data: {
        contracts: [
          'A. Formation',
          ' - Defenses to Formation',
          'B. Third Party Rights',
          ' - Third Party Beneficiary',
          ' - Assignment',
          ' - Delegation',
          'C. Conditions to Performance',
          'D. Discharge of Defendant’s Duty to Perform',
          'E. Breach',
          'F. Remedies'
        ],
        criminal: [
          'A. Formation like actus reus, mens rea, etc.',
          'B. Homicide and Murder i.e. Crime against Person',
          'C. Solicitation, Attempt, Conspiracy i.e. Inchoate Crimes',
          'D. Burglary and Arson i.e. crime against Habitation',
          'E. Larceny, False Pretenses, Embezzlement, Robbery, Receiving Stolen Property',
          'F. Forgery, Uttering, Extortion, i.e. crime against Property Interests',
          'G. Miscellaneous Crimes',
          'H. Defenses and Justifications'
        ],
        torts: [
          'A. Intentional Torts like assault, battery, etc.',
          'B. Defenses to Intentional Torts',
          'C. Negligence',
          'D. Products Liability',
          'F. Strict Liability',
          'G. Vicarious Liability',
          'H. Defamation',
          'I. Invasion of Privacy',
          'J. Damages',
          'K. Other Miscellaneous Concepts'
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
        <h1>Introduction to First Year Law</h1>
      
        <div className="row">
          <div className="col-md-3 col-xs-3 col-sm-3 col-lg-3">
            <div className="btn-group-vertical">
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('contracts')}>Contracts</button>
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('torts')}>Torts</button>
              <button type="button" className="btn btn-primary" onClick={() => this.callNext('criminal')}>Criminal</button>
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

export default Intro;