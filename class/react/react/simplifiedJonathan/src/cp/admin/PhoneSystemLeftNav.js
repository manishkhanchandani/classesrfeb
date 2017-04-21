import React, { Component } from 'react';
import NavItem from '../../lib/navItemES6.js';


export default class PhoneSystemLeftNav extends Component {

    render() {
        return (
                <div id="leftNavBar">
                    <div id="innerNavBar">

                        <div className="sidebar-nav">
                            <ul className="nav nav-list">
                                <li className="nav-header">Phone System Options:</li>
                                <NavItem to="/cp/admin/company_info">
                                    <i className="glyphicon glyphicon-file"></i> Company Info
                                </NavItem>

                                <NavItem to="/cp/admin/phone_numbers">
                                    <i className="glyphicon glyphicon-earphone"></i> Phone Numbers
                                </NavItem>

                                <NavItem to="/cp/admin/receptionists">
                                    <i className="glyphicon glyphicon-headphones"></i> Auto Receptionist
                                </NavItem>

                                <NavItem to="/cp/admin/queues">
                                    <i className="glyphicon glyphicon-user"></i> Group(s) / Queues
                                </NavItem>

                                <NavItem to="/cp/admin/phone_devices">
                                    <i className="glyphicon glyphicon-phone-alt"></i> Phones & Devices
                                </NavItem>

                            </ul>
                        </div>

                    </div>
                </div>
        );
    }
}



