import React, { Component } from 'react';
import NavItem from './lib/navItemES6.js';
import LoginForm2 from './cp/cpForm/LoginForm2';


export default class Login extends Component {
    componentDidMount(){
        document.title = "Login";
    }

    render() {
        return (
            <div>

                <div id="login">
                </div>

                <div id="leftNavBar">
                    <div id="innerNavBar">

                        <div className="sidebar-nav">
                            <ul className="nav nav-list">
                                <li className="nav-header">Login Options: </li>
                                <NavItem to="/reset_pass">
                                    <i className="glyphicon glyphicon-user"></i> Reset Pass
                                </NavItem>

                                <li><a href="#"><i className="glyphicon glyphicon-comment"></i> Contact Us</a></li>

                            </ul>
                        </div>

                    </div>
                </div>

                {/*insert the form with the Redux handler*/}
                <div id="content">
                    <LoginForm2 />
                </div>

            </div>
        );
    }
}
