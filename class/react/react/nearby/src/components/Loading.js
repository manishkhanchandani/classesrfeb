import React, { Component } from 'react';

class Loading extends Component {
  render() {
    if (!this.props.loading) {
      return false;
    }
    return (
      <div>
        <img src="http://www.pdfonline.com/convert-pdf-to-html/images/loadinganimation.gif" alt="Loading..." />
      </div>
    );
  }
}

export default Loading;