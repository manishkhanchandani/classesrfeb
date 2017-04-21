import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';

// let $ = require('min-jquery');

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



let AddUserForm = (props) => {
    const { submitting } = props;

    return (
        <form className="well form-horizontal" action=" " method="post"  id="contact_form" data-toggle="validator" onSubmit={props.handleSubmit(doSubmit)}>

            <fieldset>
                <legend>Contact Us Today!</legend>

                <div className="form-group has-feedback">
                    <label className="col-md-4 control-label">First Name</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <Field component="input" name="first_name" placeholder="First Name" className="form-control"  type="text" pattern="^[A-Za-z\-]{2,}$" data-error="Two characters minimum. Characters allowed are A to Z." required />
                        </div>
                    </div>
                    <div className="help-block with-errors"></div>
                </div>

                <div className="form-group has-feedback">
                    <label className="col-md-4 control-label" >Last Name</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                            <Field component="input" name="last_name" placeholder="Last Name" className="form-control"  type="text" required />
                        </div>
                    </div>
                    <div className="help-block with-errors"></div>
                </div>


                <div className="form-group has-feedback">
                    <label className="col-md-4 control-label">E-Mail</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                            <Field component="input" name="email" placeholder="E-Mail Address" className="form-control"  type="email" data-error="email address is invalid" required />
                        </div>
                    </div>
                    <div className="help-block with-errors"></div>
                </div>


                <div className="form-group">
                    <label className="col-md-4 control-label">Phone #</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
                            <Field component="input" name="phone" placeholder="(845)555-1212" className="form-control" type="text" />
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-4 control-label">Address</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                            <Field component="input" name="address" placeholder="Address" className="form-control" type="text" />
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-4 control-label">City</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                            <Field component="input" name="city" placeholder="city" className="form-control"  type="text" />
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-4 control-label">State</label>
                    <div className="col-md-4 selectContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
                            <Field component="select" name="state" className="form-control selectpicker" >
                                <option value=" " >Please select your state</option>
                                <option>Alabama</option>
                                <option>Alaska</option>
                                <option >Arizona</option>
                                <option >Arkansas</option>
                                <option >California</option>
                                <option >Colorado</option>
                                <option >Connecticut</option>
                                <option >Delaware</option>
                                <option >District of Columbia</option>
                                <option> Florida</option>
                                <option >Georgia</option>
                                <option >Hawaii</option>
                                <option >daho</option>
                                <option >Illinois</option>
                                <option >Indiana</option>
                                <option >Iowa</option>
                                <option> Kansas</option>
                                <option >Kentucky</option>
                                <option >Louisiana</option>
                                <option>Maine</option>
                                <option >Maryland</option>
                                <option> Mass</option>
                                <option >Michigan</option>
                                <option >Minnesota</option>
                                <option>Mississippi</option>
                                <option>Missouri</option>
                                <option>Montana</option>
                                <option>Nebraska</option>
                                <option>Nevada</option>
                                <option>New Hampshire</option>
                                <option>New Jersey</option>
                                <option>New Mexico</option>
                                <option>New York</option>
                                <option>North Carolina</option>
                                <option>North Dakota</option>
                                <option>Ohio</option>
                                <option>Oklahoma</option>
                                <option>Oregon</option>
                                <option>Pennsylvania</option>
                                <option>Rhode Island</option>
                                <option>South Carolina</option>
                                <option>South Dakota</option>
                                <option>Tennessee</option>
                                <option>Texas</option>
                                <option> Uttah</option>
                                <option>Vermont</option>
                                <option>Virginia</option>
                                <option >Washington</option>
                                <option >West Virginia</option>
                                <option>Wisconsin</option>
                                <option >Wyoming</option>
                            </Field>
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-4 control-label">Zip Code</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                            <Field component="input" name="zip" placeholder="Zip Code" className="form-control"  type="text" />
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-4 control-label">Website or domain name</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-globe"></i></span>
                            <Field component="input" name="website" placeholder="Website or domain name" className="form-control" type="text" />
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-4 control-label">Do you have hosting?</label>
                    <div className="col-md-4">
                        <div className="radio">
                            <label>
                                <input type="radio" name="hosting" value="yes" /> Yes
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <Field component="input" type="radio" name="hosting" value="no" /> No
                            </label>
                        </div>
                    </div>
                </div>



                <div className="form-group">
                    <label className="col-md-4 control-label">Project Description</label>
                    <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-pencil"></i></span>
                            <Field component="textarea" className="form-control" name="comment" placeholder="Project Description"></Field>
                        </div>
                    </div>
                </div>


                <div className="alert alert-success" role="alert" id="success_message">Success <i className="glyphicon glyphicon-thumbs-up"></i> Thanks for contacting us, we will get back to you shortly.</div>


                <div className="form-group">
                    <label className="col-md-4 control-label"></label>
                    <div className="col-md-4">
                        <button type="submit" disabled={submitting} className="btn btn-warning" >Send <span className="glyphicon glyphicon-send"/></button>
                    </div>
                </div>

            </fieldset>


        </form>
    )
};



AddUserForm = reduxForm({
                            form: 'addUserForm', // a unique identifier for this form
                            destroyOnUnmount: false, //preserve data across form unmounts
})(AddUserForm);

export default AddUserForm;
