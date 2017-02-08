import React, {Component} from 'react';

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        var first_name = this.props.answered.first_name || "";
        var last_name = this.props.answered.last_name || "";
        var email = this.props.answered.email || "";
        //set the state
        this.state = {first_name:first_name, last_name:last_name, email:email};
    }
    
    handleChange(fieldName, e) {
      var savedData = {};
      savedData[fieldName] = e.target.value;
      this.setState(savedData);
      this.props.updateAnswered(fieldName, e.target.value);
    }
  
    render() {
        return (
            <div className={this.props.data.className +' '+this.props.data.questionName}>
                <h3 className="question-text" dangerouslySetInnerHTML={{__html: this.props.data.description}}></h3>
               <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 hq-first-name hq-error">
                        <input type="text" name="first_name" id="first_name" placeholder="First Name" maxLength="50" onChange={this.handleChange.bind(this, 'first_name')} value={this.state.first_name} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 hq-last-name hq-error">
                        <input type="text" name="last_name" id="last_name" placeholder="Last Name" maxLength="50" onChange={this.handleChange.bind(this, 'last_name')} value={this.state.last_name} />
                    </div>
                </div>
                <div className="row ng-scope">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 hq-email-outer hq-error">
                        <input  className="email" name="email" id="email" type="text" placeholder="Email *" maxLength="150" onChange={this.handleChange.bind(this, 'email')} value={this.state.email} />
                        <i className="glyphicon glyphicon-envelope hq-email"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalInformation