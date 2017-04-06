import React, { Component } from 'react';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      contactList: null
    }
  }
  getFetchData() {
    let url = "https://api.myjson.com/bins/1bt2t";

		fetch(url, {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('j is ', j);
      this.setState({contactList: j.contactList});
      
    }).catch((err) => {
      console.log('error is ', err);
    });
  }
  
  componentDidMount() {
    this.getFetchData();
  }
  
  render() {
    console.log('state is ', this.state);
    
    if (!this.state.contactList) {
        return (<div>Loadin...</div>);
    }
    return (
      <div>
        <h1>My Contact List </h1>
        <ul>
          {
            this.state.contactList.map((value, key) => {
              return <li key={key}>{value.name}, {value.id}, {value.phone}
                    <img src={value.img} alt="contact" />
                  </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
