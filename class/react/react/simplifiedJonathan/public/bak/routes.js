import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import MainPage from './MainPage';
import Login from './Login';
import Logout from './Logout';

import AppCp from './cp/AppCp';
import Error from './cp/Error';

import ExtMainPage from './cp/ext/ExtMainPage';

import AdminMainPage from './cp/admin/AdminMainPage';
import PhoneSystem from './cp/admin/PhoneSystem';
import CompanyInfo from './cp/admin/CompanyInfo';

var theRoutes = (
    <Router history={browserHistory}>

        <Route path="/" component={App}>
            <IndexRoute component={MainPage}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
        </Route>


        <Route path="/cp/admin/" component={AppCp}>
            <IndexRoute component={AdminMainPage}/>
            <Route path="phone_system" component={PhoneSystem}/>
            <Route path="company_info" component={CompanyInfo}/>
        </Route>

        <Route path="/cp/ext/" component={AppCp}>
            <IndexRoute component={ExtMainPage}/>
        </Route>

        <Route path="/cp/" component={AppCp}>
            <IndexRoute component={MainPage}/>
            <Route path="/cp/error" component={Error}/>
        </Route>

    </Router>
);


const MenuRouter = React.createClass({
    render: function() {
        return (
            theRoutes
        );
    }
});

module.exports = MenuRouter;

