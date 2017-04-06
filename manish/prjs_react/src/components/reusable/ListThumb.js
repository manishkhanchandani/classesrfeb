import React, { Component } from 'react';

import './ListThumb.css';

class ListThumb extends Component {
  
  render() {
    return (
      <li className="result-row">
        <a href="" className="result-image gallery"><img alt="" className="thumb" src="http://www.zeofill.com/facebook_with_black_f.gif" /></a>
        <p className="result-info">
          <span className="icon icon-star" role="button" title="save this post in your favorites list">
              <span className="screen-reader-text">favorite this post</span>
          </span>
          <span className="result-date" title="Thu 30 Mar 09:44:26 AM">Mar 30</span>
          <a href="" className="result-title hdrlnk">Text will come here</a>
          <span className="result-meta">
            <span className="result-hood"> (Stockton, central valley ( Free estimate)</span>
            <span className="result-tags">pic
              <span className="maptag">map</span>
            </span>
            <span className="banish icon icon-trash" role="button">
              <span className="screen-reader-text">hide this posting</span>
            </span>
            <span className="unbanish icon icon-trash red" role="button" aria-hidden="true"></span>
            <a href="#" className="restore-link">
              <span className="restore-narrow-text">restore</span>
              <span className="restore-wide-text">restore this posting</span>
            </a>
          </span>
        </p>
      </li>
    );
  }
}

export default ListThumb;
