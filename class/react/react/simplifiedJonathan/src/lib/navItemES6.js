import React, { Component } from 'react';
import { Link } from 'react-router';

class NavItem extends Component {

    render() {
        const requires      = this.props.requires;
        const currentPrivs  = this.props.currentPrivs;
        const related       = this.props.related;
        let isActive = this.context.router.isActive(this.props.to, true);
        let className = isActive ? "active" : "";

        // console.log('checking', this.props.to);
        if( related ){
            let currentPath = window.location.pathname;
            console.log('current path: ', currentPath);
            if(related[currentPath]){
                console.log('current path found as related to: ', this.props.to);
                className = 'active';
            }
        }
        //console.log('pathname:', this.state.location.pathname);

        if( requires ){
            if( currentPrivs[requires] ){
                return (
                    <li className={className}>
                        <Link to={this.props.to} children={this.props.children} />
                    </li>
                );
            }
            else{
                return false;
            }
        }
        else{
            return (
                <li className={className}>
                    <Link to={this.props.to} children={this.props.children} />
                </li>
            );
        }

    }
}

// <Link {...this.props}/>

NavItem.contextTypes = {
    router: React.PropTypes.object
};

export default NavItem;

