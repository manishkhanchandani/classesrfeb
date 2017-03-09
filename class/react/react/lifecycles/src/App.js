import React, { Component } from 'react';


class NewContent extends Component {
  
  componentWillReceiveProps(newProps) {
    console.log('old props: ', this.props);
    console.log('componentWillReceiveProps method: ', newProps);
  }
  
  render() {
    console.log('i am inside new Content');
    return (
      <div>
        New Number is {this.props.number}
      </div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    
    console.log('i am in the contructor');
    
    this.state = {
      data: 0 //initialize it with zero
    }
  }
  
  setNumberInDatabase() {
    setNewNumber();
    call ajax
    response
  }
  
  setNewNumber() {
    this.setState({data: this.state.data + 1});
  }
  
  //this function is called before initial rendering
  componentWillMount() {
    console.log('i am inside the componentWillMount function');
  }
  
  //this method is called after inital rendering, this is very important method, here ajax request are called.
  componentDidMount() {
    console.log('i am inside the componentDidMount function');
    //call some ajax requests
  }
  
  componentWillReceiveProps(newProps) {
    console.log('i am inside componentWillReceiveProps method: ');
    //console.log('new props are ', newProps);
  }
  
  //before rendering, after receiving new props or state
  shouldComponentUpdate(newProps, newState) {
    console.log('i am inside shouldComponentUpdate method');
    //console.log('new props are ', newProps);
    //console.log('new state are ', newState);
    
    return true;
  }

  //Before rendering, after receiving new props or state
  componentWillUpdate(nextProps, nextState) {
    console.log('i am inside component will update method');
    //console.log('next props are ', nextProps);
    //console.log('next state are ', nextState);
  }
  
  //after render, when updates are flushed to DOM
  componentDidUpdate(prevProps, prevState) {
    console.log('i am inside component did update');
    //console.log('prevProps are ', prevProps);
    //console.log('prevState are ', prevState);
  }
  
  //immediately before removing the component from DOM
  componentWillUnmount() {
    console.log('Component will un mount is called');
  }
  
  
  
  render() {
    console.log('i am inside the render function');
    
    return (
      <div>
        <h1>React LifeCycle</h1>
        <button onClick={this.setNewNumber.bind(this)}>Increment</button>
        <NewContent number={this.state.data} />
      </div>
    );
  }
}

export default App;
