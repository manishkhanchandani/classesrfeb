import React, { Component } from 'react';
import Login from './Login';
import globalSettings from './Globals';

export default class Logout extends Component {
    componentDidMount(){
        document.title = "Logout";
    }

    render() {
        // Todo call logout
        const user      = window.localStorage.getItem('user');
        let apiMessages = [];

        let config              = globalSettings.config;
        config.headers.Authorization    = window.localStorage.getItem('user') + "__" + window.localStorage.getItem('token');

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('Current_Domain');
        window.localStorage.removeItem('Current_Role');
        window.localStorage.removeItem('Current_Priv');
        window.localStorage.removeItem('Current_CP');
        window.localStorage.removeItem('Domains');
        window.localStorage.removeItem('Profile');

        // Logout on Server
        let axios = require('axios');
        let params          = new URLSearchParams();
        params.append('k', globalSettings.k);
        params.append('action', 'logout');
        // Build the Serial Post URL Query String Parts
        let serial              = {};
        serial.user             = encodeURIComponent(user);
        params.append( 'serial', encodeURIComponent(JSON.stringify(serial)) );

        axios.post(globalSettings.apiUri, params, config)
            .then(function (response) {
                //console.log(response);
                console.log('returned status:');        console.log(response.data);
                console.log('returned json');           console.log(response.data.content);

                if (response.data.status === '1') {
                    apiMessages.push(<div className="alert alert-success" key="1"><p>server: {response.data.message}</p></div>);
                }
                else{
                    apiMessages.push(<div className="alert alert-danger" key="2"><p>server unable to load: {response.data.message}</p></div>);
                    // var expiredSessionMsg   = 'unable to load session';
                    // let expiredSession      = message.match(expiredSessionMsg);
                    //console.log(error);
                    console.log('error response: ', response);
                }
                // Ends SUCCESS Reponse
            })
            .catch(function (error) {
                console.log('server connect error caught: ', error);
                apiMessages.push(<div className="alert alert-danger" key="3"><p>server: fatal error encountered</p></div>);
            });

        let errors = [];
        if(this.props.error){
            errors.push(<div className="alert alert-danger" key="4">{this.props.error}</div>);
        }
        let messages = [];
        if(this.props.message){
            messages.push(<div className="alert alert-info" key="5">{this.props.message}</div>);
        }
        let success = [];
        if(this.props.success){
            messages.push(<div className="alert alert-success" key="6">{this.props.success}</div>);
        }

        return (
            <div>
                <div id="logout"></div>
                <div>{errors}{messages}{success}{apiMessages}</div>
                <Login />
            </div>
        );
    }
}


