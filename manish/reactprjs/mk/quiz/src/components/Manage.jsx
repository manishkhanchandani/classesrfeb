import React, { Component } from 'react';

import Firebase from 'firebase';
var firebaseRef = Firebase.database().ref('lawQuiz');

class Manage extends Component {
  
  constructor(props) {
      super(props);
      this.state = {subject: 'criminal', set: '', question: '', choices1: '', choices2: '', choices3: '', choices4: '', correct: '1', comments: ''};
  }

  handleOptionChange(fieldName, changeEvent) {
    var saveState = {};
    saveState[fieldName] = changeEvent.target.value;
    this.setState(saveState);
  }
  
  onSubmit(e) {
    e.preventDefault();
    var obj = {};
    obj.question = this.state.question;
    obj.choices = [];
    obj.choices.push({id: 1, text: this.state.choices1});
    obj.choices.push({id: 2, text: this.state.choices2});
    obj.choices.push({id: 3, text: this.state.choices3});
    obj.choices.push({id: 4, text: this.state.choices4});
    obj.correct = parseInt(this.state.correct, 10);
    obj.comments = this.state.comments;
    obj.subject = this.state.subject;
    obj.set = this.state.set;

    firebaseRef.child(this.state.subject).child('set_'+this.state.set).push(obj);
    
    var saveState = {question: '', choices1: '', choices2: '', choices3: '', choices4: '', correct: 1, comments: ''};
    this.setState(saveState);

  }
  
  render() {
    console.log('state is ', this.state);
    return (
        <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>Manage</h1>
                <form onSubmit={this.onSubmit.bind(this)}>

                  <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <select onChange={this.handleOptionChange.bind(this, 'subject')} id="subject" className="form-control" value={this.state.subject}>
                        <option value="criminal">Criminal</option>
                        <option value="tort">Tort</option>
                        <option value="contract">Contract</option>
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="set">Set</label>
                      <input type="text" className="form-control" id="set" placeholder="Enter set e.g. 1 or 2" value={this.state.set}  onChange={this.handleOptionChange.bind(this, 'set')} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="question">Question</label>
                      <textarea className="form-control" ref="question" rows="5" placeholder="Enter question" value={this.state.question} onChange={this.handleOptionChange.bind(this, 'question')}></textarea>
                  </div>
                  <div className="form-group">
                      <label htmlFor="choices1">Choice 1</label>
                      <textarea className="form-control" ref="choices1" rows="3" placeholder="Enter choice 1" value={this.state.choices1} onChange={this.handleOptionChange.bind(this, 'choices1')}></textarea>
                  </div>
                  <div className="form-group">
                      <label htmlFor="choices2">Choice 2</label>
                      <textarea className="form-control" ref="choices2" rows="3" placeholder="Enter choice 2" value={this.state.choices2} onChange={this.handleOptionChange.bind(this, 'choices2')}></textarea>
                  </div>
                  <div className="form-group">
                      <label htmlFor="choices3">Choice 3</label>
                      <textarea className="form-control" ref="choices3" rows="3" placeholder="Enter choice 3" value={this.state.choices3} onChange={this.handleOptionChange.bind(this, 'choices3')}></textarea>
                  </div>
                  <div className="form-group">
                      <label htmlFor="choices4">Choice 4</label>
                      <textarea className="form-control" ref="choices4" rows="3" placeholder="Enter choice 4" value={this.state.choices4} onChange={this.handleOptionChange.bind(this, 'choices4')}></textarea>
                  </div>
                  <div className="form-group">
                      <label htmlFor="correct">Correct Choice</label>
                      <input type="radio" value="1" name="correct" checked={this.state.correct === '1'} onChange={this.handleOptionChange.bind(this, 'correct')} /> 1
                      <input type="radio" value="2" name="correct" checked={this.state.correct === '2'} onChange={this.handleOptionChange.bind(this, 'correct')} /> 2
                      <input type="radio" value="3" name="correct" checked={this.state.correct === '3'} onChange={this.handleOptionChange.bind(this, 'correct')} /> 3
                      <input type="radio" value="4" name="correct" checked={this.state.correct === '4'} onChange={this.handleOptionChange.bind(this, 'correct')} /> 4
                  </div>
                  <div className="form-group">
                      <label htmlFor="comments">Comments</label>
                      <textarea className="form-control" ref="comments" rows="3" placeholder="Enter comments" value={this.state.comments} onChange={this.handleOptionChange.bind(this, 'comments')}></textarea>
                  </div>
                  <button type="submit" className="btn btn-default">Submit</button>
              </form>

              </div>
            </div>
        </div>
    )
  }
}
export default Manage;
