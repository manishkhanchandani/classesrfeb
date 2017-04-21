import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import SelectMenu from '../../lib/SelectMenu';

const bannerStyle    = {marginTop: 10, marginLeft: 10};
const rightHeader    = {marginTop: 6, marginLeft: 0};

export default class ExtHeader extends Component {
    callBackFunction(selectedValue, e) {
        console.log("testCallBackFunction called... with OPTION value selected: ", selectedValue);
        window.localStorage.setItem('Current_CP', selectedValue);

        if( selectedValue === 'admin' ){
            console.log('matched admin');
            browserHistory.push('/cp/admin/');
        }
        else if( selectedValue === 'ext' ){
            console.log('matched ext');
            browserHistory.push('/cp/ext/');
        }
        else{
            console.log(`thisss${selectedValue}ok`);
        }

        // ReactDOM.render(message, document.getElementById('login'));
    }


    render() {
        console.log("ExtHeader Props", this.props);
        const domains         = this.props.domains;
        const currentCp       = this.props.currentCp;
        const profile         = this.props.profile;

        let defaultCpOption         = currentCp;
        const cpSelectName          = {name: 'switchCp', defaultClass: 'form-control input-sm'};
        const cpOptionsList         = [
            // {name: '', text: '' },
            {name: 'admin', text: 'Admin' },
            {name: 'ext', text: 'My Extensions' },
        ];
        // loop through hashes
        // for(const key in domains) {
        // console.log("key contains: ", key);
        //    console.log("value corresponding to key is: ", domains[key]);
        // }

        return(
            <div className="panel-body" id="extHeader">
                <div className="row">

                    <div className="col-md-3">
                        <img src="/images/phonebox.gif" style={bannerStyle} alt="PhoneBox" /><br />
                    </div>

                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="switchCp">Switch Control Panel: </label><br />

                            <SelectMenu defaultOption={defaultCpOption} selectName={cpSelectName} optionsList={cpOptionsList} cbFunction={this.callBackFunction.bind(this)} />

                        </div>
                    </div>

                    <div className="col-md-2">
                        <div className="form-group">
                            <label htmlFor="manageDomain">Manage Domain: </label><br />
                            <select name="manageDomain" ref="manageDomain" className="form-control input-sm" id="manageDomain">

                                {
                                    Object.keys(domains).map(function(key) {
                                        if( key ){
                                            return <option key={key} value={key}> PBX: {key} -
                                                Role: {domains[key]} </option>;
                                        }
                                        else {
                                            return <option key={key} value="">No domains in account</option>;
                                        }
                                    })
                                }

                            </select>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="container" style={rightHeader}>
                            <div className="row">
                                <div className="col-md-1">
                                    <p className="smallText">{profile.First}</p>
                                </div>
                                <div className="col-md-2">
                                    <p className="smallText">84906666565 Ext. 1043</p>
                                </div>
                                <div className="col-md-2">
                                    <p className="smallText"> <Link to="/logout"> Log Out </Link></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

