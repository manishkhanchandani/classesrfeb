import React, { Component } from 'react';

class TowersOfHanoi extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      inputVal: 0,
      stack:[]
    };
  }
  
  hanoi (n, beg, aux, end) {
    //console.log('current: n is ', n, ', beg is ', beg, ', aux is ', aux, ', end is ', end);
    if (n <= 0) {
      return;
    }
    
    this.hanoi(n - 1, beg, end, aux);
    const str = 'move disc, ', n, ' from ', beg, ' to ', end;
    var obj = this.state.stack;

    console.log(str);
    this.hanoi(n - 1, aux, beg, end);
  }
  
  render() {
    return (
      <div>
        <h1>TowersOfHanoi</h1>
        <p>Number: <input type="text" onChange={(e) => this.setState({inputVal: parseInt(e.target.value, 10), beg: parseInt(e.target.value, 10), aux: 0, end: 0})} /></p>
        <button onClick={() => this.hanoi(this.state.inputVal, 'src', 'aux', 'dst')}>Submit</button>
      </div>
    );
  }
}

export default TowersOfHanoi;