import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';


const validate = values => {
    const errors = {};
    if (!values.Email) {
        errors.Email = 'Required';
    }
    if (!values.Last_Name) {
        errors.Last_Name = 'Required';
    }
    return errors;
};

const doSubmit = values => {
    let formValuesString = `You submitted:\n\n${JSON.stringify(values, null, 2)}`;
    console.log(formValuesString);

    let message = (
        <div>
            <p>Wow, there is the status message</p>
            <p>{formValuesString}</p>
        </div>
    );
    ReactDOM.render( message,document.getElementById('status'));
    browserHistory.push('/cp/add_user');
};

function FormRow(props){
    const input         = props.input;

    let componentType   = 'input';
    if( input.component ){ componentType   = input.component; }

    let labelClass      = 'col-md-2 control-label';
    if( input.labelWidth ){
        labelClass      = `col-md-${input.labelWidth} control-label`;
    }

    let isRequired       = '';
    if( input.required ){ isRequired = 'required'; }

    let helpText = '';
    if( input.helpText ){ helpText = input.helpText; }

    let placeHolder       = input.text;
    if( input.placeHolder ){ placeHolder = input.placeHolder; }

    let icon            = [];
    let iconElement     = "glyphicon " + input.icon;

    if( input.icon ){
        icon.push(<i className={iconElement} key="1"></i>);
    }
    else{
        if( input.type === 'textarea' ){
            icon.push(<i className="glyphicon glyphicon-pencil" key="2"></i>);
        }
    }


    if( input.type === 'text' ){

        return(
            <div className="form-group has-feedback">
                <label className={labelClass}>{input.text}</label>
                <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                        <span className="input-group-addon">{icon}</span>
                        <Field component={componentType} name={input.name} placeholder={placeHolder} className="form-control"  type={input.type} data-error={input.dataError} required={isRequired} />
                    </div>
                </div>
                <div className="help-block with-errors">{helpText}</div>
            </div>
        );
    }
    else if( input.type === 'select' ){
        const optionsList   = props.optionsList;
        if( props.radioList ){
            console.log('error detected. You used input.type=select when it is supposed to be a type=radio');
        }
        let Options         = [];
        optionsList.map((value, key) => {
            Options.push(<option value={value.name} key={key}>{value.text}</option>);
        });

        return(
            <div className="form-group">
                <label className={labelClass}>{input.text}</label>
                <div className="col-md-4 selectContainer">
                    <div className="input-group">
                        <span className="input-group-addon">{icon}</span>
                        <Field component={input.type} name={input.name} className="form-control selectpicker" >
                            {Options}
                        </Field>
                    </div>
                </div>
            </div>
        );
    }
    else if( input.type === 'radio' ) {
        const radioList         = props.radioList;
        var Radios              = [];
        radioList.map((value, key) => {
            Radios.push(
                <div className="radio" key={key}>
                    <label>
                        <input type={input.type} name={input.name} value={value.value} /> {value.text}
                    </label>
                </div>
            );
        });

        return(
            <div className="form-group">
                <label className={labelClass}>{input.text}</label>
                <div className="col-md-4">
                    {Radios}
                </div>
            </div>
        );
    }
    else if( input.type === 'textarea' ){
        return(
                <div className="form-group">
                    <label className={labelClass}>{input.text}</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon">{icon}</span>
                            <Field component={input.type} className="form-control" name={input.name} placeholder={placeHolder}></Field>
                        </div>
                    </div>
                </div>
        );
    }

    return false;
}


let CompanyInfoForm = (props) => {
    const { submitting } = props;

    const inputFirstName = {type:'text', text:'First Name', name:'First', placeHolder:'First Name', icon:'glyphicon-user', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''};
    const inputLastName = {type:'text', text:'Last Name', name:'Last', placeHolder:'Last Name', icon:'glyphicon-user', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''};
    const inputEmail = {type:'text', text:'E-Mail', name:'Email', icon:'glyphicon-envelope', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''};
    const inputPhone = {type:'text', text:'Phone', name:'Phone', placeHolder: '84906666595', icon:'glyphicon-earphone', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''};
    const inputAddress = {type:'text', text:'Address', name:'Address', icon:'glyphicon-home', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''};
    const inputCity = {type:'text', text:'City', name:'City', icon:'glyphicon-home', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''}

    const inputState = {type:'select', text:'State', name:'State', icon:'glyphicon-list', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''}
    const stateOptions = [{name:'', text:'Choose a state:'}, {name:'California', text:'California'}, {name:'New York', text:'New York'}];

    const inputZipCode = {type:'text', text:'Zip Code', name:'Zip_Code', icon:'glyphicon-home', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''}

    const inputWebSite = {type:'text', text:'Website', name:'Web_Site', placeHolder:'Website or domain name', icon:'glyphicon-globe', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''}

    const inputRadioQuestion    = {type:'radio', text:'Is this a radio question?', name:'Radio_Question', labelWidth:3, required:0, helpText:'', 'dataError':'', pattern:''}
    const radioQuestionRadios = [{value:'Yes', text:'Yes'}, {value:'No', text:'No'}];

    const inputMemo = {type:'textarea', text:'Memo Description', placeHolder:'Optional Memo', name:'Memo', labelWidth:2, required:0, helpText:'', 'dataError':'', pattern:''};

    return (
        <form className="well form-horizontal" action=" " method="post"  id="contact_form" data-toggle="validator" onSubmit={props.handleSubmit(doSubmit)}>

            <fieldset>
                <legend>Update Company Contact Info</legend>

                <FormRow input={inputFirstName} />
                <FormRow input={inputLastName} />
                <FormRow input={inputEmail} />
                <FormRow input={inputPhone} />
                <FormRow input={inputAddress} />
                <FormRow input={inputCity} />
                <FormRow input={inputZipCode} />
                <FormRow input={inputState} optionsList={stateOptions}/>
                <FormRow input={inputWebSite} />
                <FormRow input={inputRadioQuestion} radioList={radioQuestionRadios}/>
                <FormRow input={inputMemo}/>

                <div className="form-group">
                    <label className="col-md-2 control-label"></label>
                    <div className="col-md-4">
                        <button type="submit" disabled={submitting} className="btn btn-success" >Update Company Contact Info <span className="glyphicon glyphicon-send"/></button>
                    </div>
                </div>

            </fieldset>

        </form>
    )
};


CompanyInfoForm = reduxForm({
                            form: 'companyInfoForm', // a unique identifier for this form
                            destroyOnUnmount: false, //preserve data across form unmounts
                            validate
})(CompanyInfoForm);

export default CompanyInfoForm;

