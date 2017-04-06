import React, { Component } from 'react';

class Repo extends Component {
  render() {
    return (
      <li className="list-group-item">
        <a href={this.props.repo.html_url}>{this.props.repo.name}</a> : {this.props.repo.description}
      </li>
    );
  }
}

export default Repo;