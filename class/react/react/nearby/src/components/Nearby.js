import React, { Component } from 'react';

class Nearby extends Component {
  render() {
    
    if (!this.props.nearbyCities) {
      return false;
    }
    return (
      <div>
        <ul className="list-group">
        {this.props.nearbyCities.map((value, key) => {
         return <li key={key} className="list-group-item">{value.name} ({value.distance} miles)</li>
        })}
        </ul>
      </div>
    );
  }
}

export default Nearby;
