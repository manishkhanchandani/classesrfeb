import React, { Component } from 'react';

class Search extends Component {
  
  onSubmitMe(e) {
    e.preventDefault();
    
    let q = this.refs.artist.value;
    
    if (!q) {
      alert('please put artist name');
      return;
    }
    
    this.props.onChangeQuery(q);
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmitMe.bind(this)} >
        <label>Search Artist</label>
        <input type="text" ref="artist" className="form-control" />
        <br />
      </form>
    );
  }
}

export default Search;