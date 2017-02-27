import React, { Component } from 'react';

class Search extends Component {
  onSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    console.log('username is ', this.refs.username.value);
  }
  
  render() {
    return (
         <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" ref="username" placeholder="Enter username" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
        </form>
    );
  }
}
      
export default Search;