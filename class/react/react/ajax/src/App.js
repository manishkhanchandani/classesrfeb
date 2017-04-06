import React, { Component } from 'react';

class App extends Component {
  
  getRequest() {
    console.log('i am in get request');
    
    const url = 'http://api.mkgalaxy.com/api.php?action=nearby&lat=37.3393857&lng=-121.8949555';
    console.log('url is ', url);
    
    fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  postRequestUrlEncoded() {
    console.log('i am in post request urlencoded');
    
    const url = 'http://api.mkgalaxy.com/api.php?action=samplePost';
    console.log('url is ', url);
    
    fetch(url, {
      method: 'POST',
      body: 'name=manny&age=43&gender=male',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j2 is ', j);
      }).catch((err) => {
        console.log('error is ', err);
      });
  }
  
  postRequestJson() {
    console.log('i am in post request json format');
    
    const url = 'http://api.mkgalaxy.com/api.php?action=samplePostJson';
    console.log('url is ', url);
    
    const obj = {
      name: 'manny',
      age: 43,
      gender: 'male'
    }
    
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify(obj)
    }).then((response) => {
        return response.json();
      }).then((j) => {
        console.log('j3 is ', j);
      }).catch((err) => {
        console.log('error is ', err);
      });
  }
  
  render() {
    return (
      <div >
        <h1>Ajax Request</h1><br /><br />
        <button onClick={this.getRequest.bind(this)}>Get Request</button><br /><br />
        <button onClick={this.postRequestUrlEncoded.bind(this)}>Post Request Using URLEncoded Format</button><br /><br />
        <button onClick={this.postRequestJson.bind(this)}>Post Request Using JSON Format</button>
      </div>
    );
  }
}

export default App;
