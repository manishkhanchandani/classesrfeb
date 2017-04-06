import React, { Component } from 'react';

import Repo from './Repo.js';

class RepoList extends Component {
  render() {
    return (
      <ul className="list-group">
        {
          this.props.userRepos.map((repo, i) => {
            return <Repo
                   repo={repo}
                   key={i}
                   {...this.props}
                    />
          })
        }
      </ul>
    );
  }
}

export default RepoList;