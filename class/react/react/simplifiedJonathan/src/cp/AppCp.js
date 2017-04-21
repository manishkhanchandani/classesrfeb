import React, { Component } from 'react';
import {connect} from 'react-redux';

import Logout from '../Logout';
import AdminNavBar from './admin/AdminNavBar';
import ExtNavBar from './ext/ExtNavBar';
import AdminHeader from './admin/AdminHeader';
import ExtHeader from './ext/ExtHeader';

import {isBlank} from '../lib/Validator';
import Notifications from './Notifications';
import NavBar from "../NavBar";

function ShowHeader(props){
    const currentCp     = props.currentCp;
    const currentDomain = props.currentDomain;
    const currentRole   = props.currentRole;
    const currentPrivs  = props.currentPrivs;
    const user          = props.user;
    const domains       = props.domains;
    const profile       = props.profile

    if( currentCp === 'admin' ){
        return <AdminHeader currentCp={currentCp} currentDomain={currentDomain} currentRole={currentRole}
                            currentPrivs={currentPrivs} user={user} domains={domains} profile={profile} />;
    }
    else{
        return <ExtHeader currentCp={currentCp} currentDomain={currentDomain} currentRole={currentRole}
                          currentPrivs={currentPrivs} user={user} domains={domains} profile={profile} />;
    }
}


function ShowNavBar(props){
    // currentCP: admin or extension
    const currentCp     = props.currentCp;
    const currentDomain = props.currentDomain;
    const currentRole   = props.currentRole;
    const currentPrivs  = props.currentPrivs;
    if( currentCp === 'admin' ){
        return <AdminNavBar currentCp={currentCp} currentDomain={currentDomain} currentRole={currentRole} currentPrivs={currentPrivs} />;
    }
    else{
        return <ExtNavBar currentCp={currentCp} currentDomain={currentDomain} currentRole={currentRole} currentPrivs={currentPrivs} />;
    }
}

class AppCp extends Component {
    render() {

        console.log('props: ', this.props);

        // window.localStorage.removeItem('Current_Priv');
        const currentDomain   = window.localStorage.getItem('Current_Domain');
        const currentRole     = window.localStorage.getItem('Current_Role');
        let currentPrivs    = JSON.parse( window.localStorage.getItem('Current_Privs') );
        let domains         = JSON.parse( window.localStorage.getItem('Domains') );
        let profile         = JSON.parse( window.localStorage.getItem('Profile') );
        const currentCp       = window.localStorage.getItem('Current_CP');
        const user            = window.localStorage.getItem('user');
        const token           = window.localStorage.getItem('token');

        if( isBlank(user) || isBlank(token) ){
            return (<div><NavBar/><Logout error="Session removed. You have been Logged out. You may login again below." /></div>);
        }
        if( isBlank(currentCp) ){
            return (<div><NavBar/><Logout error="Session missing currentCp. Logged out. Please login." /></div>);
        }

        return (
                <div>
                    <ShowHeader currentCp={currentCp} currentDomain={currentDomain} currentRole={currentRole} currentPrivs={currentPrivs} user={user} domains={domains} profile={profile} />

                    <ShowNavBar currentCp={currentCp} currentDomain={currentDomain} currentRole={currentRole} currentPrivs={currentPrivs} />

                    <Notifications />

                    {this.props.children}
                    <div id="footer">Bottom Footer</div>
                </div>
        );
    }
}


// Getter
const mapStateToProps = (state) => {
    return ( {
            api: state.apiReducer,
        }
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setApiData: (data) => {
            dispatch({
                type: 'SET_API_DATA',
                payload: data
            });
        }
    };
};

AppCp.defaultProps = {
    // clientId: '85ed9b6325343133f7cc',
    // clientSecret: '2be6c435e81399b75348100d909f3ea7a2e226a1'
}


export default connect(mapStateToProps, mapDispatchToProps)(AppCp);
