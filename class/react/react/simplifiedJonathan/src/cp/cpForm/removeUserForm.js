import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import normalizePhone from '../../lib/normalizePhone.js';

const validate = values => {
    const errors = {};
    if(!values.firstName){
        errors.firstName = 'Required';
    }
    if(!values.lastName){
        errors.lastName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    //Prevent adding too many phones

    console.log(values);
    if( values.phones && values.phones.length > 3){
        errors.phones = ['Too many phones'];
        //Give error to all phones in array
        console.log("errors out too many phones called");
        errors.phones._error = 'Too many phones';
    }

    //console.log("validate called");
    //console.log("errors", errors);
    return errors;
};

//function handleSubmit(values) {
    //e.preventDefault();
//    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
//    browserHistory.push('/cp/line_status');
    //var result = 'success';
    //if( result == 'success' ){
    //    AddUser.updateMessage({ type: 'success', message: 'We have received your message and will get in touch shortly. Thanks!' });
    //}
    //else{
    //    AddUser.updateMessage({ type: 'danger', message: 'Sorry, there has been an error. Please try again later or send us an email at info@example.com.' });
    //}
    //browserHistory.push('/cp/add_user');
//}

const doSubmit = values => {
    let formValuesString = `You submitted:\n\n${JSON.stringify(values, null, 2)}`;
    console.log(formValuesString);
    //ReactDOM.render(
    //    <p>My message is here</p>,
    //    document.getElementById('msg')
    //);
    //thisStatusMessage = "Yeah this is the status message returned";
    let message = (
        <div>
            <p>Wow, there is the status message</p>
            <p>{formValuesString}</p>
        </div>
    );
    ReactDOM.render( message,document.getElementById('status'));
    browserHistory.push('/cp/add_user');
};


const renderInput = field => {
    //console.log(field);
    //console.log(field.input.placeholder);
    //var test = Object.assign({}, field);
    //console.log(test);
    return(
      <div>
          <label>{field.placeholder}</label>
          <div>
              <input {...field.input} placeholder={field.placeholder}/>
              {field.meta.error && field.meta.touched && <span>{field.meta.error}</span>}
          </div>
      </div>
    );
};


const renderPhones = ({fields}) => {
    console.log(fields);
    return(
        <ul>
            <li><button type="button" onClick={() => fields.push()}>Add Phone</button></li>
            {
                fields.map( (field, index) =>
                    <li key={index}>
                        <Field name={field} component={renderInput} normalize={normalizePhone} placeholder={`Phone #${index +1}`}/>
                        <button type="button" onClick={() => fields.remove(index)}>Remove</button>
                    </li>
                )
            }
            {
                fields.error && <li className="error">{fields.error}</li>
            }
        </ul>
    );
};


let LoginForm222 = (props) => {
    const { pristine, reset, submitting } = props;

    return (
        <form onSubmit={props.handleSubmit(doSubmit)}>
<Field name="otherName" component={renderInput} placeholder="Other Name" />

            <Field name="firstName" component={renderInput} placeholder="First Name" />

          <div>
            <label>Last Name</label>
            <div>
              <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
            </div>
          </div>

            <Field name="email" component={renderInput} placeholder="Email" />

            <FieldArray name="phones" component={renderPhones} placeholder="Phones"/>


          <div>
            <label>Sex</label>
            <div>
              <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
              <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
            </div>
          </div>
          <div>
            <label>Favorite Color</label>
            <div>
              <Field name="favoriteColor" component="select">
                <option value=""></option>
                <option value="ff0000">Red</option>
                <option value="00ff00">Green</option>
                <option value="0000ff">Blue</option>
              </Field>
            </div>
          </div>
          <div>
            <label htmlFor="employed">Employed</label>
            <div>
              <Field name="employed" id="employed" component="input" type="checkbox"/>
            </div>
          </div>
          <div>
            <label>Notes</label>
            <div>
              <Field name="notes" component="textarea"/>
            </div>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
    )
};

// Decorate SimpleForm with reduxForm()
//export default reduxForm({
//    form: 'simple',  // a unique identifier for this form
//    destroyOnUnmount: false, //preserve data across form unmounts
//    validate
//})(SimpleForm)
//

LoginForm222 = reduxForm({
                            form: 'loginForm2', // a unique identifier for this form
                            destroyOnUnmount: false, //preserve data across form unmounts
                            validate

})(LoginForm222);

//export default LoginForm222;

const selector = formValueSelector('loginForm2'); // <-- same as form name

LoginForm222 = connect(
            state => {
            // can select values individually
            const hasFirstNameValue = selector(state, 'firstName');
            const hasLastNameValue = selector(state, 'lastName');
            // or together as a group
            const { firstName, lastName } = selector(state, 'firstName', 'lastName');
            return {
                hasFirstNameValue,
                hasLastNameValue,
                fullName: `${firstName || ''} ${lastName || ''}`
            }
        }
)(LoginForm222);

export default LoginForm222;


