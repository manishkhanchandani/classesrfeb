import React, { Component } from 'react';

import '../css/main.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <div id="headerwrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h1>Make your landing page<br/>
                look really good.</h1>
                <form className="form-inline" role="form">
                  <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
                  </div>
                  <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
                </form>					
              </div>
              <div className="col-lg-6">
                <img className="img-responsive" src="assets/img/ipad-hand.png" alt="" />
              </div>

            </div>
          </div>
        </div>


        <div className="container">
          <div className="row mt centered">
            <div className="col-lg-6 col-lg-offset-3">
              <h1>Recieve or Give Donations</h1>
            </div>
          </div>

          <div className="row mt centered">
            <div className="col-lg-4">
              <img src="assets/img/ser01.png" width="180" alt="" />
              <h4>1 - Register</h4>
              <p>Once you register with us, you will receive weekly donations from our website. You can pay $10, or $20 or $500 per year to become paid registered member.</p>
            </div>

            <div className="col-lg-4">
              <img src="assets/img/ser02.png" width="180" alt="" />
              <h4>2 - Receive Donations</h4>
              <p>Those who give donations to our website will be distributed to all our paid registered users. If we have 10 registered users and if we get donation of $110, then we keep $10 (10%) as an admin fee and $100 will be donated to all registered users so each user will get $10. This process will continue every week till end of the year when you have to renew your subscriptions to receive donations again.</p>

            </div>

            <div className="col-lg-4">
              <img src="assets/img/ser03.png" width="180" alt="" />
              <h4>3 - Paid Registered Members</h4>
              <p>There is yearly subscription to become a paid registered member. If you pay $10 / year, you will become paid registered member and you will get x amount of donation. If you pay $20 / year, you will become double paid member and you will receive 2x amount of donation each week. If you pay $30 / year, you will receive 3x amount of donation each week.</p>

            </div>
          </div>
        </div>

        <div className="container">
          <hr />
          <div className="row centered">
            <div className="col-lg-6 col-lg-offset-3">
              <form className="form-inline" role="form">
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
                </div>
                <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
              </form>					
            </div>
            <div className="col-lg-3"></div>
          </div>
          <hr />
        </div>

        <div className="container">
          <div className="row mt centered">
            <div className="col-lg-6 col-lg-offset-3">
              <h1>Donation is for Everyone.</h1>
              <h3>We have limited seats and it opens for few days till we get n number of users. And then it gets closed. Fill your email and click subscribe. We will send you an email when we get position open for you. And then you can pay subscription fee through the link provided to you in the email.</h3>
            </div>
          </div>

          <div className="row mt centered">
            <div className="col-lg-6 col-lg-offset-3">
              <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                  <div className="item active">
                    <img src="assets/img/p01.png" alt="" />
                  </div>
                  <div className="item">
                    <img src="assets/img/p02.png" alt="" />
                  </div>
                  <div className="item">
                    <img src="assets/img/p03.png" alt="" />
                  </div>
                </div>
              </div>			
            </div>
          </div>
        </div>

        <div className="container">
          <hr />
          <div className="row centered">
            <div className="col-lg-6 col-lg-offset-3">
              <form className="form-inline" role="form">
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
                </div>
                <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
              </form>					
            </div>
            <div className="col-lg-3"></div>
          </div>
          <hr />
        </div>

        <div className="container">
          <div className="row mt centered">
            <div className="col-lg-6 col-lg-offset-3">
              <h1>Our Awesome Team.<br/>Design Lovers.</h1>
              <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
            </div>
          </div>

          <div className="row mt centered">
            <div className="col-lg-4">
              <img className="img-circle" src="assets/img/pic1.jpg" width="140" alt="" />
              <h4>Michael Robson</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
              <p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
            </div>

            <div className="col-lg-4">
              <img className="img-circle" src="assets/img/pic2.jpg" width="140" alt="" />
              <h4>Pete Ford</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
              <p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
            </div>

            <div className="col-lg-4">
              <img className="img-circle" src="assets/img/pic3.jpg" width="140" alt="" />
              <h4>Angelica Finning</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
              <p><i className="glyphicon glyphicon-send"></i> <i className="glyphicon glyphicon-phone"></i> <i className="glyphicon glyphicon-globe"></i></p>
            </div>
          </div>
        </div>

        <div className="container">
          <hr />
          <div className="row centered">
            <div className="col-lg-6 col-lg-offset-3">
              <form className="form-inline" role="form">
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email address" />
                </div>
                <button type="submit" className="btn btn-warning btn-lg">Invite Me!</button>
              </form>					
            </div>
            <div className="col-lg-3"></div>
          </div>
          <hr />
          <p className="centered">Created by BlackTie.co - Attribution License 3.0 - 2013</p>
        </div>
	
      </div>
    );
  }
}

export default Landing;