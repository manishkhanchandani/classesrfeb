import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      query: ''
    };
  }
  
  changeQuery(e) {
    this.setState({query: e.target.value});
  }
  
  search(e) {
    e.preventDefault();
    console.log(this.state);
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12">
          <form onSubmit={this.search.bind(this)}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search for..." value={this.state.query} onChange={this.changeQuery.bind(this)} />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="submit" onClick={this.search.bind(this)}>Go!</button>
            </span>
          </div>
          </form>
        </div>
        <div className="profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="gallery">
          Gallery
        </div>
      </div>
    );
  }
}

export default App;
