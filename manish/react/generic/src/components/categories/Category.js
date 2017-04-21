import React, { Component } from 'react';
import './Category.css';
import Config from '../../includes/config.js';
import { Link  } from 'react-router';
//http://bootsnipp.com/snippets/drxj

class Category extends Component {
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
    console.log('state is ', this.state);
    if (!this.state.categories) {
      return false;
    }
    
    var categories = this.state.categories;
    return (
      <div className="row"> 	

        {
          Object.keys(categories).map((value, key) => {
            return <div key={value} className="col-lg-3 col-md-4 col-sm-6 col-xs-12 list-category text-primary">
              <h3 className="title">
                  {categories[value].name}
              </h3>
              <div className="list-group">
                {
                  Object.keys(categories[value].childs).map((value2, key2) => {
                    let myLink = 'category/' + value + '/' + value2;
                    return <Link to={myLink} key={value2} className="list-group-item"><div className="truncate pull-left">{categories[value].childs[value2].name}</div></Link>
                  })
                }
              </div>
            </div>
          })
        }
        

      </div>
    );
  }
}

export default Category;