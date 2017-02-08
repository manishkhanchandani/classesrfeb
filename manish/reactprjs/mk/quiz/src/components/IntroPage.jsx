import React, { Component } from 'react';

import Firebase from 'firebase';
var firebaseRef = Firebase.database().ref('lawQuiz');

class IntroPage extends Component {
  
  fetchSets(sub) {
    console.log('sub: ', sub);
    firebaseRef.child(sub).once('value', function(snapshot) {
      if (!snapshot.exists()) {
        console.log('not found');
        return;
      }
      var sets = snapshot.val();
      console.log('sets: ', sets);
    });
  }
  
    render() {
        console.log(this.props.params);
        if (this.props.params.subject) {
          this.fetchSets(this.props.params.subject);
        }
        return (
            <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h1>MBE California Baby Bar Exam</h1>
                    <ul className="list-group">
                      <li className="list-group-item"><a href="#/Quiz/criminal">Criminal Law</a></li>
                      <li className="list-group-item"><a href="#/Quiz/tort">Torts Law</a></li>
                      <li className="list-group-item"><a href="#/Quiz/contract">Contracts Law</a></li>
                    </ul>
                  </div>
                </div>
            </div>
        )
    }
}
export default IntroPage;
