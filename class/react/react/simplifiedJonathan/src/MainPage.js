import React, { Component } from 'react';

export default class MainPage extends Component {
    componentDidMount(){
        document.title = "Main Start Page Content";
    }

    render() {
        return (
            <div>
                <h1>Hey this the main index page content</h1>
            </div>
        );
    }
}


