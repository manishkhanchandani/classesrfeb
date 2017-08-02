import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import SignIn from '../components/auth/SignIn.js';
import SignUp from '../components/auth/SignUp.js';

class Routing2 extends Component {
	render() {
    	return (
			<div>
      
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
			</div>
		);
	}
}

export default Routing2;