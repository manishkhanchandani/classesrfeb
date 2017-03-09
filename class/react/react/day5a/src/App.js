import React, { Component } from 'react';

class ProfileContent extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.rec.name}</h3>
        <p>user_id: {this.props.rec.user_id}</p>
        <p>Email: {this.props.rec.email}</p>
        <p>age: {this.props.rec.age}</p>
        <p>gender: {this.props.rec.gender}</p>
      </div>
    );
  }
}

class RepoContent extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.record.id}</h3>
        <p>desc: {this.props.record.desc}</p>
      </div>
    );
  }
}

class App extends Component {
  
  //we have array of data and we have to display that data to the user
  
  constructor(props) {
    super(props);
    
    this.state = {
      profiles: [
        {
          user_id: 1,
          name: 'manny',
          email: 'manishkk74@gmail.com',
          age: 40,
          gender: 'male'
        },
        {
          user_id: 2,
          name: 'Mango',
          email: 'mango@gmail.com',
          age: 25,
          gender: 'male'
        },
        {
          user_id: 3,
          name: 'Mala',
          email: 'mala@gmail.com',
          age: 21,
          gender: 'female'
        }
      ],
      repoList: {
        a1: {
          id: 1,
          desc: 'this is first content'
        },
        a2: {
          id: 2,
          desc: 'this is second content'
        },
        a3: {
          id: 3,
          desc: 'this is third content'
        }
      }
      
    };
  }
  
  render() {
    console.log(this.state.obj2['key3']);
    return (
      <div>
        {this.state.profiles.map((value, i) => 
          <ProfileContent key={i} rec={value} />
        )}
        
        {Object.keys(this.state.repoList).map((i) =>
          <RepoContent key={i} record={this.state.repoList[i]} />
                                             
        )}
      </div>
    );
  }
}


export default App;

