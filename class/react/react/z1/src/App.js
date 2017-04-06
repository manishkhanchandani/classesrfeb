import React, { Component } from 'react';
import MyStore from './MyStore.js';
import MyAction from './MyAction.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form1: MyStore.getForm1()
    }
  }

  componentWillMount() {
    MyStore.on('change', () => {
      this.setState({form1: MyStore.getForm1()})
    })
  }

  componentWillUnmount() {
    MyStore.removeListerner('change');
  }


  submitForm(e) {
    e.preventDefault();

    var data = {
      name: this.refs.name.value,
      email: this.refs.email.value
    };

    MyAction.submitForm1(data);
  }

  render() {
    return (
      <div>
        <h1>My Form Application</h1>
          <h3>Form 1</h3>
            <form onSubmit={this.submitForm.bind(this)}>
              <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" className="form-control" id="email" ref="email" placeholder="Enter email" />
              </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" ref="name" placeholder="Enter name" />
                </div>
              <button type="submit" className="btn btn-default">Submit</button>
          </form>

          <br />

          <p>My Value is {this.state.form1.name}</p>
                  <p>My Email is {this.state.form1.email}</p>
      </div>
    );
  }
}

export default App;
