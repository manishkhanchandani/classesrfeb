import React, { Component } from 'react';


class NewContent extends Component {
  
  //when component receives new props
  componentWillReceiveProps(newProps) {    
    console.log('Component WILL RECIEVE PROPS 2!', this.props);
    console.log('new props 2: ', newProps);
  }
  
  render() {
    console.log('props are ', this.props);
    return (
      <div>
        <div>New number is {this.props.number}</div>
      </div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
         data: 0
      }

    this.setNewNumber = this.setNewNumber.bind(this)
    console.log('inside constructor', this.props);
  }
  
  setNewNumber() {
      this.setState({data: this.state.data + 1})
   }
  
  //immediately before initial rendering
  componentWillMount() {
      console.log('Component WILL MOUNT!', this.props);
   }

  //immediately after initial rendering
   componentDidMount() {
      console.log('Component DID MOUNT!', this.props);
   }

  //when component receives new props
  componentWillReceiveProps(newProps) {    
    console.log('Component WILL RECIEVE PROPS!', this.props);
    console.log('new props: ', newProps);
  }

  //Before rendering, after receiving new props or state
  shouldComponentUpdate(newProps, newState) {
    console.log('Component Should UPDATE!', this.props);
    console.log('newProps: ', newProps);
    console.log('newState: ', newState);
    return true;
  }

  //Before rendering, after receiving new props or state
   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!', this.props);
   }

  //After component's updates are flushed to DOM
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!', this.props);
   }

  //Immediately before removing component from DOM
   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!', this.props);
   }
  
  
  render() {
    console.log('inside: render', this.state);
    return (
      <div>
        <div>
            <button onClick={this.setNewNumber}>INCREMENT</button>
            <NewContent number={this.state.data} />
         </div>
        
      </div>
    );
  }
}

App.defaultProps = {
    prop1: 1,
    prop2: 2
};

export default App;