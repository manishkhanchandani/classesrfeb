import React, { Component } from 'react';

class Nearby extends Component {

  render() {
    if (!this.props.data) {
      return (<div></div>);
    }
    return (
      <ul className="list-group">
      {
        this.props.data.map((value, key) => {
          return <li key={key} className="list-group-item">{value.name} ({value.distance} miles)</li>
        })
      }
      </ul>
    );
  }
}


export default Nearby;
