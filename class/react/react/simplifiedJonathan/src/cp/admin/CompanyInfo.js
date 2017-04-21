import React, { Component } from 'react';
import {connect} from 'react-redux';

import CompanyInfoForm from './adminForm/CompanyInfoForm';

import PhoneSystemLeftNav from './PhoneSystemLeftNav';

import {setApiData, setLoading} from '../../actions/MyAction';
import {Send, duplicateFields} from '../../lib/Api';

import globalSettings from '../../Globals';
import {InitAxios, HandleErrorResponse, HandleFatalError} from '../../lib/Api';


class CompanyInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: 1,
            data: props.api.data
        };
        // props.info = this.info.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    apiSend(){
        const action = 'get_company_contact';
        const serial = {};
        let [axios, params, config] = InitAxios(action, serial);

        axios.post(globalSettings.apiUri, params, config)
            .then(function (response) {
                console.log('response.data: ', response.data);
                console.log('response.data.content: ', response.data.content);
                if (response.data.status === '1') {
                    return response.data;
                }
                else{
                    HandleErrorResponse(response);
                    return;
                }
            })

            .then((responseData)=>{
                this.props.setApiData(responseData);
                this.setState( { data: responseData } );
            })
            .catch(function (error) {
                HandleFatalError(error);
                return;
            });
    }


    componentDidMount(){
        // console.log("this.props in componentDidMount", this.props);
        document.title = "Company Contact Info";
        this.apiSend();
    }

    render() {
      console.log('state is ', this.state);
        //console.log('company info props: ', this.props);

        var contactInfo = {};
        if( this.props.api.data ){
            if( this.props.api.data.content.Company_Contact ){
                contactInfo = this.props.api.data.content.Company_Contact;
                const aliasFields = { 'First': 'First_Name', 'Last': 'Last_Name', 'Email':'email' };
                contactInfo = duplicateFields(contactInfo, aliasFields);
                //console.log('contactInfo New: ', contactInfo);
            }
        }

        //Use initialValues prop and enableReinitialize="true" to set the initial default values of the form
        let initialValues = contactInfo;
        //console.log('initial values:', initialValues);

        return (
            <div id="page">
                <div id="phoneSystem"></div>
                <div id="status"></div>

                <PhoneSystemLeftNav />

                {/*insert the form with the Redux handler*/}
                <div id="content">
                    <div className="container">
                        <CompanyInfoForm initialValues={initialValues} enableReinitialize="true" />
                    </div>
                </div>
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
            dispatch( setApiData(data) );
        },
        setLoading: (number) => {
            dispatch( setLoading(number) );
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo);
