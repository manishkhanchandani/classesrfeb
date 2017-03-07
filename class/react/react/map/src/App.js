import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
      super(props);
		
      this.state = {
         data: 
         [
            {
               component: 'First...',
               id: 1
            },
            {
               component: 'Second...',
               id: 2
            },
            {
               component: 'Third...',
               id: 3
            }
         ]
      }

   }

  render() {
    return (
      <div>
        <div>
           {this.state.data.map((dynamicComponent, i) => <Content 
              key={i} componentData={dynamicComponent}/>)}
        </div>
      </div>
    );
  }
}

class Content extends Component {
   render() {
      return (
         <div>
            <div>{this.props.componentData.component}</div>
            <div>{this.props.componentData.id}</div>
         </div>
      );
   }
}

export default App;
