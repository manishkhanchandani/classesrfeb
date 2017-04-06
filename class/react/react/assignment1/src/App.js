import React, { Component } from 'react';
import './App.css';
import coordinates from './coordinates.json';

class Results extends Component {
  render() {
    if (!this.props.results) {
      return (<div></div>);
    }
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>X</th>
              <th>Y</th>
              <th>Distance</th>

            </tr>
          </thead>
          <tbody>
            {this.props.results.map((value, key) => {
              return <tr key={key}>
                <th scope="row">{key + 1}</th>
                <td>{value.x}</td>
                <td>{value.y}</td>
                <td>{value.distance} units</td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parseCoordinates: null,
      xVal: null,
      yVal: null,
      results: null
    };
  }

  /*
  * parsing the coordinates into one array
  */
  parseCoordinatesFile()
  {
    let arr = [];
    coordinates.map((value, key) => {
      let obj = value.value;
      let objParse = obj.split(',');
      arr.push({x: parseInt(objParse[0], 10), y: parseInt(objParse[1], 10)});
      return true;
    });

    this.setState({parseCoordinates: arr});
    return true;
  }

  //on page load, parse config file
  componentDidMount() {
    this.parseCoordinatesFile();
  }

  //calculate distance between two points
  calcDistance(x1, y1, x2, y2) {
    let a = x1 - x2
    let b = y1 - y2

    let c = Math.sqrt( a*a + b*b );
    return c;
  }

  calcResult(e) {
    e.preventDefault();
    if (!this.state.xVal || !this.state.yVal) {
      alert('please enter x and y coordinates');
      return;
    }
    let xVal = this.state.xVal;
    let yVal = this.state.yVal;

    let coor = this.state.parseCoordinates;

    //duplicating variable to insert distance in it
    let obj = coor;

    coor.map((value, key) => {
      let distance = this.calcDistance(xVal, yVal, value.x, value.y);
      //console.log('distance is ', distance, ' for the x1: ', xVal, ', y1: ', yVal, ', x2: ', value.x, ', y2: ', value.y);
      obj[key].distance = distance;
      return true;
    });

    let newObj = obj.sort((a, b) => {
        return a.distance - b.distance;
    });

    this.setState({results: newObj});
    //console.log(coor);
    //console.log('obj is ', obj);
    //console.log('newObj is ', newObj);
  }

  render() {
    console.log('this state is ', this.state);
    return (
      <div className="container">
        <form onSubmit={this.calcResult.bind(this)}>
            <h1>Enter X and Y coordinates</h1>
            <div className="form-group">
                <label>X Coordinate</label>
                <input type="number" onChange={(event) => {this.setState({xVal: event.target.value})}} className="form-control" id="xVal" placeholder="Enter X Coordinate" />
            </div>
            <div className="form-group">
                <label>Y Coordinate</label>
                <input type="number"onChange={(event) => {this.setState({yVal: event.target.value})}} className="form-control" id="yVal" placeholder="Enter Y Coordinate" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
        </form>

        <Results results={this.state.results} />

      </div>
    );
  }
}


export default App;
