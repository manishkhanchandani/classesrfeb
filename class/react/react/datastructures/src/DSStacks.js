import React, { Component } from 'react';

class DSStacks extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      stack: [],
      maxstack: 8,
      top: 0
    }
  }
  
  traverse(e) {
    
  }
  
  push() {
    var top = this.state.top;
    var maxstack = this.state.maxstack;
    var stack = this.state.stack;
    var item = parseInt(this.refs.item.value, 10);
    
    if (top >= maxstack) {
      console.log('OVERFLOW');
      return;
    }
    
    top += 1;
    stack[top] = item;
    this.setState({top: top, stack: stack});
    return;
  }
  
  
  
  pop() {
    var top = this.state.top;
    var stack = this.state.stack;
    if (top === 0) {
      console.log('UNDERFLOW');
      return;
    }
    delete stack[top];
    top -= 1;
    this.setState({top: top, stack: stack});
    return;
  }
  
  render() {
    console.log('state is ', this.state);
    return (
      <div>
        <h1>DSStacks</h1>
        <input type="text" ref="item" />
        <button type="button" className="btn btn-default" onClick={this.push.bind(this)}>Push</button>
        <button type="button" className="btn btn-default" onClick={this.pop.bind(this)}>Pop</button>
        <p>Top is {this.state.top}</p>
        <ul>
          {this.state.stack.map((value, key) => {
           return <li key={key}>{value}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default DSStacks;
