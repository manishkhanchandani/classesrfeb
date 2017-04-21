import React, { Component } from 'react';

import Config from '../includes/config.js';

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
    if (!this.props.params.category) {
      return false;
    }
    var category = this.state.categories[this.props.params.category];
    if (!category) {
      return false;
    }
    console.log('category: ', category);
    var title = category.name;
    
    
    var subcategory = '';
    if (this.props.params.subcategory) {
      subcategory = this.state.categories[this.props.params.category].childs[this.props.params.subcategory];
      if (!subcategory) {
        return false;
      }
      title += ' : ' + subcategory.name;
    }
    
    console.log('subcategory: ', subcategory);
    console.log('List props are: ', this.props);
    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  }
}

export default List;