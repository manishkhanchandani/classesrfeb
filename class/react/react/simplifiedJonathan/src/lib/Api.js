import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import globalSettings from '../Globals';

// import {InitAxios, HandleErrorResponse, HandleFatalError} from '../../lib/Api';

export const InitAxios = ( action, serial ) => {
    let axios = require('axios');
    let params          = new URLSearchParams();
    params.append('k', globalSettings.k);
    params.append('action', action);
    params.append( 'serial', encodeURIComponent(JSON.stringify(serial)) );
    let config                      = globalSettings.config;
    config.headers.Authorization    = window.localStorage.getItem('user') + "__" + window.localStorage.getItem('token');
    return [axios, params, config];
}

export const HandleErrorResponse = ( response ) => {
    let responseMsg = response.data.message;
    var expiredSession  = responseMsg.match(/unable to load session/gi);
    if( expiredSession ) {
        console.log('expired session matched');
        let message = (<div className="alert alert-warning"><p>Session Expired. You have been logged out for security! Reference Request ID: {response.data.req_id}</p></div>);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        browserHistory.push('/logout');
        ReactDOM.render(message, document.getElementById('logout'));
    }
    else{
        let message = (<div className="alert alert-danger"><p>Error: {response.data.message}</p></div>);
        console.log('expiredSession regular expression NOT match');
        browserHistory.push('/cp/error');
        ReactDOM.render(message, document.getElementById('error'));
    }
    return;
}


export const HandleFatalError = ( error ) => {
    console.log('error contains', error);
    // console.log(error.response.data);
    // console.log(error.response.status);
    let message = (<div className="alert alert-danger"><h1>Server Error:</h1></div>);
    browserHistory.push('/cp/error');
    ReactDOM.render(message, document.getElementById('error'));
    return;
}

export const Send = (action, serial, cbFunction) => {
    var [axios, params, config] = InitAxios(action, serial);

    axios.post(globalSettings.apiUri, params, config)
        .then(function (response) {
            //console.log(response);
            console.log('response.data: ', response.data);
            console.log('response.data.content: ', response.data.content);
            // console.log('global authorization contains:', globalSettings.config.headers );

            if (response.data.status === '1') {
                // let message = (<div className="alert alert-success"><p>{response.data.message}</p></div>);
                // return(response.data);
                // cbFunction(response.data);
                console.log("success recorded");
            }
            else{
                HandleErrorResponse(response);
                return;
            }

        })

        .then((responseData)=>{
            // this.props.setApiData(responseData);     // this.setState({resource:responseData});
            cbFunction(responseData);
        })

        .catch(function (error) {
            console.log('error contains', error);
            HandleFatalError(error);
            return;
        });

}



export const duplicateFields = (originalHash, aliasFields) => {
    // loop through hashes
    for(const key in aliasFields) {
        console.log("key contains: ", key);
        console.log("value corresponding to key is: ", aliasFields[key]);
        let orginalValue = originalHash[key];
        let newKey              = aliasFields[key];
        originalHash[newKey]    = orginalValue;
    }
    return originalHash;
}
