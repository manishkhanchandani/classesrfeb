import React, { Component } from 'react';

export default class AdminMainPage extends Component {
    componentDidMount(){
        document.title = "Main Start Page Content";
    }


    render() {
        window.localStorage.setItem('Current_CP', 'admin');

        return (
            <div>
                <div id="mainMenu"></div>
                <h1>Hey this the Admin main index page content</h1>
                {this.props.children}
            </div>
        );
    }
}





