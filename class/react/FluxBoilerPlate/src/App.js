import React, { Component } from 'react';

import MyAction from './MyAction.js';

import MyStore from './MyStore.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sampleVariable: MyStore.getSampleVariable()
    }
  }

  //this place to update the state
  componentWillMount() {
    MyStore.on('change', () => {
      this.setState({sampleVariable: MyStore.getSampleVariable()});
    });
  }

  componentWillUnmount() {
    MyStore.removeListener('change');
  }

  render() {
    return (
      <div>
        <h1>App Default</h1>
        <button onClick={() => {MyAction.changeValue('Goga')}}>Simple Call</button>
        <br />
        <button onClick={() => {MyAction.changeValueGet('Goga1')}}>Simple Get Call</button>
        <br />
        <button onClick={() => {MyAction.changeValuePost('Goga2')}}>Simple Post Call</button>
        <br />
        <button onClick={() => {MyAction.changeValuePostJson('Goga3')}}>Simple Post Json Call</button>
        <br />

        <p>My Value is {this.state.sampleVariable}</p>
      </div>
    );
  }
}

export default App;
