import React, { Component } from 'react';

class Repo extends Component {
  render() {
    return (
      <li><b>{this.props.repo.name}</b> {this.props.repo.description}<br /><br /></li>
    );
  }
}

export default Repo;
