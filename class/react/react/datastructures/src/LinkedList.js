import React, { Component } from 'react';
import { Link  } from 'react-router'

class LinkedList extends Component {
  render() {
    return (
      <div>
        Linked list

        <ul>
          <li><Link to="singlelinkedlists">Single Linked List</Link></li>
          <li>Double Linked List</li>
          <li>Circular Linked List</li>
          <li>Linked List With Header Node</li>
        </ul>
      </div>
    );
  }
}

export default LinkedList;
