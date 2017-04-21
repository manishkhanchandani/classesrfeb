import React, { Component } from 'react';

export default class Notifications extends Component {
    componentDidMount(){
        document.title = "Line Status";
    }

    render() {
        return(
            <h1 id="notify"></h1>
        );
    }
}
