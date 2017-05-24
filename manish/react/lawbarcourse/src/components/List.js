import React, { Component } from 'react';

import Config from '../includes/config.js';
import Search from './Search.js';

class List extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categories: null
    }
  }
  
  componentDidMount() {
    this.setState({
      categories: Config.categories
    });
  }
  
  render() {
    if (!this.state.categories) {
      return false;
    }
    if (!this.props.match.params.category) {
      return false;
    }
    var category = this.state.categories[this.props.match.params.category];
    if (!category) {
      return false;
    }
    var title = category.name;
    
    
    var subcategory = '';
    if (this.props.match.params.subcategory) {
      subcategory = this.state.categories[this.props.match.params.category].childs[this.props.match.params.subcategory];
      if (!subcategory) {
        return false;
      }
      title += ' : ' + subcategory.name;
    }
    
    return (
      <div>
        <h3>{title}</h3>
        <Search />
      </div>
    );
  }
}

export default List;