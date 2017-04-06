import React, { Component } from 'react';
import Profile from './Profile';
import MyStore from '../stores/MyStore.js';

// http://mobile.mkgalaxy.com/react-flux-class-1/
// http://mobile.mkgalaxy.com/react-flux-class-2/

// Case 1: When page loads:
//      constructor is called
//      componentWillMount() is called
//      render()
//      componentDidMount is called.

// Case 2: Whenever prop or state is updated
//      shouldComponentUpdate   (returns either true or false). False cancels update.
//      componentWillUpdate
//      render()
//      componentDidUpdate

// Case 3: When new props are coming into a component
//      componentWillReceiveProps will be called
//      render()

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Manny',
            age: '43',
            gender: 'Male',
            city: 'San Jose',
            state: 'CA',
            country: 'US',
            hobbies: ['chess', 'table tennis']
        }
    }

    componentWillMount(){
        MyStore.on('change', () => {
            this.setState(MyStore.getAll());
        });
    }


    componentWillUnMount(){
        MyStore.removeListener('change');
    }


    render() {
        console.log('i am inside the render function', this.props);
        return(
            <div>
                <h1>My Profile</h1>
                <Profile {...this.state}/>
            </div>
        );
    }

}

// Setting default props to set in App component for App.render component
App.defaultProps = {}

export default App;
