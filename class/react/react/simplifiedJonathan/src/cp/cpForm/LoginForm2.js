import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import globalSettings from '../../Globals';
// import Logout from '../../Logout';
// console.log('globalSettings:', globalSettings);

const inputStyle = {
    width: 260,
};

const validate = values => {
    const errors = {};
    if (!values.User) {
        errors.User = 'Required';
    }
    if (!values.Pass) {
        errors.Pass = 'Required';
    }
    return errors;
};


const doSubmit = values => {
    let formValuesString = `You submitted:\n\n${JSON.stringify(values, null, 2)}`;
    console.log(formValuesString);
    console.log(values.User);

    let axios = require('axios');
    //require('promise/polyfill-done');

    // Create the Base Post Params
    let params          = new URLSearchParams();
    params.append('k', globalSettings.k);
    params.append('action', 'login');

    // Build the Serial Post URL Query String Parts
    let serial              = {};
    serial.user             = encodeURIComponent(values.user);
    serial.pass             = encodeURIComponent(values.pass);
    params.append( 'serial', encodeURIComponent(JSON.stringify(serial)) );
    let config              = globalSettings.config;

    axios.post(globalSettings.apiUri, params, config)
        .then(function (response) {
            //console.log(response);
            console.log('returned status:');        console.log(response.data);
            console.log('returned json');           console.log(response.data.content);

            if (response.data.status === '1') {
                let message = (<div className="alert alert-success"><p>{response.data.message}</p></div>);
                console.log('settting into local storage:', response.data.ssid);
                window.localStorage.setItem('token', response.data.ssid);
                window.localStorage.setItem('user', values.user);

                const defaultDomain     = response.data.content.Default_Domain;
                const domains           = response.data.content.Domains;
                const currentRole       = response.data.content.Domains[defaultDomain];
                const currentPrivs      = response.data.content.Domain_Priv[defaultDomain];
                const profile           = response.data.content.Profile;

                console.log('default domain is:', defaultDomain);
                console.log('current role is:', currentRole);
                console.log('current privs is:', currentPrivs);

                window.localStorage.setItem('Current_Domain', defaultDomain);
                window.localStorage.setItem('Current_Role', currentRole);
                window.localStorage.setItem('Current_Privs', JSON.stringify(currentPrivs));
                window.localStorage.setItem('Domains', JSON.stringify(domains));
                window.localStorage.setItem('Profile', JSON.stringify(profile));
                window.localStorage.setItem('user', values.user);

                if( currentRole === 'admin' ){
                    window.localStorage.setItem('Current_CP', 'admin');
                    browserHistory.push('/cp/admin/');
                }
                else{
                    window.localStorage.setItem('Current_CP', 'ext');
                    browserHistory.push('/cp/ext/');
                }

                // browserHistory.push('/cp/');
                ReactDOM.render(message, document.getElementById('mainMenu'));
                return;
            }
            else{
                let message = (<div className="alert alert-danger"><p>{response.data.message}</p></div>);
                var expiredSessionMsg   = 'unable to load session';
                let expiredSession      = message.match(expiredSessionMsg);
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');
                //console.log(error);
                if( expiredSession ) {
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                    browserHistory.push('/logout');
                    ReactDOM.render(message, document.getElementById('logout'));
                }
                else{
                    browserHistory.push('/logout');
                    ReactDOM.render(message, document.getElementById('logout'));
                }
                return;
            }

            // Ends SUCCESS Reponse
        })
        .catch(function (error) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            console.log('server error is: ', error);
            let message = (<div className="alert alert-danger"><p>Unable to connect to server</p></div>);
            browserHistory.push('/logout');
            ReactDOM.render(message, document.getElementById('logout'));
            return;
        });

};



let LoginForm2 = (props) => {
    const { submitting } = props;

    return (
        <form className="well form-horizontal" action=" " method="post"  id="contact_form" data-toggle="validator" onSubmit={props.handleSubmit(doSubmit)}>

            <fieldset>
                <legend>Login Your Control Panel</legend>

                <div className="form-group has-feedback">
                    <label className="col-md-2 control-label">UserName</label>
                    <div className="col-md-5 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <Field component="input" name="user" placeholder="Username" className="form-control"  type="text" style={inputStyle} required />
                        </div>
                    </div>
                    <div className="help-block with-errors"></div>
                </div>

                <div className="form-group has-feedback">
                    <label className="col-md-2 control-label" >Password</label>
                    <div className="col-md-5 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                            <Field component="input" name="pass" placeholder="Password" className="form-control"  type="password" style={inputStyle} required />
                        </div>
                    </div>
                    <div className="help-block with-errors"></div>
                </div>

                <div className="form-group">
                    <label className="col-md-2 control-label"></label>
                    <div className="col-md-5">
                        <button type="submit" disabled={submitting} className="btn btn-success" >Login <span className="glyphicon glyphicon-send"/></button>
                    </div>
                </div>

            </fieldset>

        </form>
    )
};


LoginForm2 = reduxForm({
    form: 'loginForm2', // a unique identifier for this form
    destroyOnUnmount: false, // preserve data across form unmounts
    validate
})(LoginForm2);


export default LoginForm2;

