import React, { Component } from 'react';
import { browserHistory } from 'react-router';

var marginTop = {
    marginTop: 10
}

export default class NavBar extends Component {
    componentDidMount(){
        document.title = "Add User";
    }

    constructor(props) {
        super(props);
        this.state = {};
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateMessage( message ) {
        this.setState = message;
    }

    showLogin(e) {
        browserHistory.push('/login');
    }

    render() {

        return (

            <nav className="navbar navbar-default">
                <div className="lr-zero">
                    <div className="collapse navbar-collapse lr-zero" id="bs-example-navbar-collapse-1">



                        <ul className="nav navbar-nav lr-zero s22p">

                            <div className="nav navbar-nav">
                                <button type="button" className="btn btn-sm btn-success" style={marginTop} onClick={this.showLogin.bind(this)} >
                                    Login
                                </button>
                            </div>

                        </ul>


                    </div>
                </div>
            </nav>

        );
    }

}

