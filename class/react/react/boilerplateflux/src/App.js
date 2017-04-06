import React, { Component } from 'react';
import MyStore from './MyStore.js';
import MyAction from './MyAction.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sampleVariable: MyStore.getSampleVariable()
    }
  }

  componentWillMount() {
    MyStore.on('change', () => {
      this.setState({sampleVariable: MyStore.getSampleVariable()})
    })
  }

  componentWillUnmount() {
    MyStore.removeListerner('change');
  }

  changeVariableBtn(val) {
    MyAction.changeValue(val);
  }

  changeVariableGetBtn(val) {
    MyAction.changeValueGet(val);
  }

  changeVariablePostBtn(val) {
    MyAction.changeValuePost(val);
  }

  changeVariablePostJsonBtn(val) {
    MyAction.changeValuePostJson(val);
  }


  render() {
    return (
      <div>
        <h1>BoilerPlate Sample Application</h1>
        <button onClick={this.changeVariableBtn.bind(this, 'Apple')}>Change Variable</button>
        <br /><br />
        <button onClick={this.changeVariableGetBtn.bind(this, 'Mango')}>Change Variable Using Get</button>
        <br /><br />
        <button onClick={this.changeVariablePostBtn.bind(this, 'Banana')}>Change Variable Using Post</button>
        <br /><br />
        <button onClick={this.changeVariablePostJsonBtn.bind(this, 'HoneyDew')}>Change Variable Using Post Json</button>
        <br /><br />
        <p>Value of variable is {this.state.sampleVariable}</p>
      </div>
    );
  }
}

export default App;
