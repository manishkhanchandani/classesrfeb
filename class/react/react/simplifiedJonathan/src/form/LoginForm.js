import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import globalSettings from '../Globals';


// console.log('globalSettings:', globalSettings);

const formStyle = {
    margin: '10px 6px',
};
const inputStyle = {
    width: 70,
    marginRight: 4,
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
                    browserHistory.push('/cp/ext');
                }

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
                    browserHistory.push('/login');
                    ReactDOM.render(message, document.getElementById('login'));
                }
                else{
                    console.log('pushing to /login');
                    browserHistory.push('/login');
                    ReactDOM.render(message, document.getElementById('login'));
                }
                return;
            }

            // Ends SUCCESS Reponse
        })
        .catch(function (error) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            console.log(error);
            browserHistory.push('/login');
            ReactDOM.render('unable to connect to server', document.getElementById('login'));
            return;
        });

};


let LoginForm = (props) => {
    const { pristine, submitting } = props;

    return (
            <form onSubmit={props.handleSubmit(doSubmit)} className="navbar-form navbar-nav lr-zero" style={formStyle}>
                <Field type="text" name="user" component="input" className="form-control input-sm" placeholder="User" style={inputStyle}/>
                <Field type="password" name="pass" component="input" className="form-control input-sm" placeholder="Pass" style={inputStyle}/>
                <button type="submit" className="btn btn-sm btn-success">Login</button>
                <Link to="/forgot_pass" activeClassName="active">
                <button disabled={pristine || submitting} type="button" className="btn btn-xs btn-link">
                Forgot Pass
                </button>
                </Link>
            </form>
    );
};


LoginForm = reduxForm({
    form: 'loginForm', // a unique identifier for this form
    destroyOnUnmount: false, // preserve data across form unmounts
    validate
})(LoginForm);

export default LoginForm;

