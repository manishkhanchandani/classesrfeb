import React, { Component } from 'react';

export default class Error extends Component {
    componentDidMount(){
        document.title = "Error Encountered";
    }

    render() {
        return (
            <div>
                <div>Error was detected. Contact admin with error code below and how you encountered the error if problem persists.</div>
                <div id="error"></div>
            </div>
        );
    }
}



