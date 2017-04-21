import React, { Component } from 'react';
// import { Link } from 'react-router';
import NavItem from '../../lib/navItemES6.js';

// var ulRight = {
//    float: 'right',
//    verticalAlign: 'top',
// };
var dropDownStyle = {
    width: 400
};
// var rightDropStyle = {
//    width: 210
// };


function NavDropDown(props){
    const currentPrivs      = props.currentPrivs;
    const dropDown          = props.dropDown;
    const dropDownItems     = props.dropDownItems;
    //console.log('dropDown current Privs: ', currentPrivs);

    let hasError        = 0;
    var isMapped        = 0;
    var isItemsMapped   = 0;
    const dropList      = dropDown.map((value, key) => {
        isMapped = 1;
        // console.log('key is:', key);
        // console.log('value is: ', value);
        // console.log('dropDown.type: ', dropDown.type);
        // console.log('value.type: ', value.type);

        if( value.type ){
            if( value.type === 'dropDownHeaderArrow' ){
                return(
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" key={key}>
                        {value.text}
                        <span className="caret"></span>
                    </a>
                );
            }
            else if (value.type === 'dropDownUL'){

                const dropListItems    = dropDownItems.map((value2, key2) => {
                    isItemsMapped   = 1;
                    // console.log('key2 is:', key2);
                    // console.log('value2 is: ', value2);

                    if( value2.type === 'dropDownItemLink' ) {
                        if (value2.requires) {
                            // require permission to view
                            const requiredPerm  = value2.requires;
                            if( currentPrivs[requiredPerm] ){
                                return <NavItem to={value2.to} key={key2}>{value2.text}</NavItem>;
                            }
                            else{
                                return false;
                            }
                            // console.log('requiredPerm', requiredPerm);
                            // console.log('required_perm', currentPrivs[requiredPerm]);
                        }
                        else {
                            // does not require permission to view
                            return <NavItem to={value2.to} key={key2}>{value2.text}</NavItem>;
                        }
                    }
                    else if( value2.type === 'dropDownItemHeading' ) {
                        if (value2.requires) {
                            const requiredPerm  = value2.requires;
                            if( currentPrivs[requiredPerm] ){
                                return <li className="faqDrop" key={key2}>{value2.text}</li>;
                            }
                            else{
                                return false;
                            }
                        }
                        else {
                            // does not require permission to view
                            return <li className="faqDrop" key={key2}>{value2.text}</li>;
                        }
                    }
                    else{
                        return false;
                    }
                });

                if( !isItemsMapped ){
                    return false;
                }
                else{
                    return <ul className="dropdown-menu" style={value.style} key={key}>{dropListItems}</ul>;
                }
            }
            else {
                return false;
            }
        }
        else{
            return false;
        }
    });

    if( hasError ){
        return false;
    }

    if( !isMapped ){
        return false;
    }
    else{
        return <ul className="nav navbar-nav lr-zero"><li className="dropdown">{dropList}</li></ul>;
    }
}


export default class ExtNavBar extends Component {
    render() {

        const currentPrivs  = this.props.currentPrivs;

        return(
            <nav className="navbar navbar-default" id="extNavBar">
                <div className="lr-zero">

                    <div className="collapse navbar-collapse lr-zero" id="bs-example-navbar-collapse-1">

                        <ul className="nav navbar-nav s48p">
                            <NavItem to="/cp/permissions" requires="" currentPrivs={currentPrivs}>Permissions</NavItem>

                        </ul>


                    </div>

                </div>
            </nav>

        );
    }
}