import React, { Component } from 'react';

import Repo from './Repo.js';

class RepoList extends Component {

  
  render() {
    console.log('props are ', this.props.userRepos);
    if (!this.props.userRepos) {
      return (<div></div>);
    }
    return (
      <ul>
        {
          this.props.userRepos.map((repo, i) => {
            return <Repo key={i} repo={repo} />
          })
        }
      </ul>
    );
  }
}

export default RepoList;