import React, { Component } from 'react';

class Search extends Component {
  
  onSubmitMe(e) {
    e.preventDefault(); //to avoid page refresh
    
    let username = this.refs.username.value;
    
    if (!username) {
      alert('please enter the username');
      return;
    }
    
    this.props.onFormSubmit(username);
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmitMe.bind(this)}>
        <label>Search Github Users</label>
        <input type="text" ref="username" className="form-control" />
        <br />
      </form>
    );
  }
}

export default Search;