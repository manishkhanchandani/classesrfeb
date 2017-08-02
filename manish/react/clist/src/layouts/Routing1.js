import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Home from '../containers/Home.js';
import List from '../components/List.js';
import New from '../components/New.js';

class Routing1 extends Component {
	render() {
    	return (
			<div>
			<Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/create" component={New} />
            <Route exact={true} path="/category/:category/:subcategory/lat_:lat/lng_:lng/k_:keyword" component={List} />
            <Route exact={true} path="/category/:category/:subcategory/k_:keyword" component={List} />
            <Route exact={true} path="/category/:category/:subcategory/lat_:lat/lng_:lng" component={List} />
            <Route exact={true} path="/category/:category/:subcategory" component={List} />
      
			</div>
		);
	}
}

export default Routing1;