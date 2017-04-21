import React, { Component } from 'react';
import PhoneSystemLeftNav from './PhoneSystemLeftNav';

export default class PhoneSystem extends Component {
    componentDidMount(){
        document.title = "Phone System";
    }

    constructor(props) {
        super(props);
        this.state = {};
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateMessage( message ) {
        this.setState = message;
    }

    render() {
        var status;
        if (this.state.type && this.state.message) {
            var classString = 'alert alert-' + this.state.type;
            status = <div id="status" className={classString} ref="status">
                {this.state.message}
            </div>;
        }
        console.log(status);

        //Use initialValues prop to set the initial default values of the form (or to restore the values from saved data)
        const initialValues = {};


        //var thisStatusMessage = getStatusMessage();
        return (
                <div id="page">
                    <div id="phoneSystem"></div>
                    <div id="status"></div>

                    <PhoneSystemLeftNav />

                    {/*insert the form with the Redux handler*/}
                    <div id="content">
                        <div className="container">
                            my content<br/><br/>
                        </div>
                    </div>
                </div>
        );
    }
}



