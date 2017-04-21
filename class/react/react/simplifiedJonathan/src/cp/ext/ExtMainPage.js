import React, { Component } from 'react';

export default class ExtMainPage extends Component {
    componentDidMount(){
        document.title = "Main Start Page Content";
    }

    render() {
        window.localStorage.setItem('Current_CP', 'ext');

        return (
            <div>
                <div id="mainMenu"></div>
                <h1>Hey this the Ext main index page content</h1>
                {this.props.children}
            </div>
        );
    }
}



