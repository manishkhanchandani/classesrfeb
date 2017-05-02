import React, { Component } from 'react';
import {connect} from 'react-redux';

class Landing extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      error: null
    };
  }
  
  submitForm(e) {
    e.preventDefault();
    this.setState({error: null});
    
    let val = this.props.user.email;
    
    if (!val) {
      this.setState({error: 'missing email, please sign in first.'});
      return;
    }
    
    if (!this.refs.accept.checked) {
      this.setState({error: 'please accept terms and conditions'});
      return;
    }
    
  }
  render() {
    let val = this.props.user.email;
    if (!val) val = '';
    
    let error = <span></span>;
    if (this.state.error) {
      error = <div className="alert alert-danger" role="alert">{this.state.error}</div>
    }
    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <h1>Enrollment Form</h1>
          <p>Enter your email address to register your name. Your enrollment is in pending state, You will receive donations once we make you in approved state. You will get a link to subscribe once your account is approved and your donation will start once we get the subscription. You have to pay a yearly subscription fee of $10 / year as one subscriber. If you need double donation then you have to pay $20 / year and if you need 10 times then you have to pay $100 / year. <br /><br />All donations will be divided into equal number of subscriptions. All donations are paid once in a week.<br /><br />So if we have 10,000 subscribers and we get donation of $100,000 a week, then each subscriber will get $10 and if one person has registered as 2 subscriber then he will get $20 that week.</p>
          {error}
          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" ref="email" value={val} placeholder="Enter email" disabled />
          </div>
          <div className="checkbox">
              <label>
                  <input type="checkbox" ref="accept" />I accept <a href="">terms and conditions</a>
              </label>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
      </form>
	
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer,
    my: state.MyReducer
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(Landing);