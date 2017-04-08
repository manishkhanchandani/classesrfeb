import React, { Component } from 'react';

import {guid} from './MyFunctions.js';

class DisplayList extends Component {

    render() {

      if (!this.props.list) {
        return (<div></div>);
      }
      return (
        <ul>
          {this.props.list.map((value, key) => {
            return <li key={key}>{value.data}</li>
          })}
        </ul>
      );
    }
}

class EmptyList extends Component {
  render() {
    if (this.props.start) {
      return (<div></div>);
    }
    return (
      <strong>
        List is empty
      </strong>
    );
  }
}

class SingleLinkedLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: null,
      nodes: null,
      displayNodes: null,
      totalNodes: 0
    };
  }

  displayList() {
    var displayArray = [];
    this.setState({totalNodes: displayArray.length});
    if (!this.state.start) {
      console.log('empty list');
      return;
    }
    console.log('displayList: ', this.state.nodes);
    var p = this.state.start;
    while (p) {
      let obj = this.state.nodes[p];
      displayArray.push(obj);

      p = obj.link;
    }
    this.setState({displayNodes: displayArray});
    console.log('end with ', displayArray);

    this.setState({totalNodes: displayArray.length});
  }

  countNodes() {
    if (!this.state.start) {
      console.log('empty list, 0 count');
      return;
    }

    var total = 0;
    var p = this.state.start;
    while (p) {
      total++;
      let obj = this.state.nodes[p];

      p = obj.link;
    }
    return total;
  }

  search(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list, nothing found');
      return;
    }

    if (!this.refs.data.value) {
      console.log('fill the text input before continue');
      return;
    }

    var position = 1;
    var keyword = this.refs.data.value;
    var p = this.state.start;
    var obj = {};
    while (p) {
      obj = this.state.nodes[p];
      if (obj.data === keyword) {
        break;
      }

      position++;
      p = obj.link;
    }

    if (p) {
      console.log('keyword: ', keyword, ' found at position: ', position, ' with content of ', obj);
      return obj;
    } else {
      console.log('keyword: ', keyword, ' not found');
      return null;
    }
  }

  referenceToLastNode(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list, nothing found');
      return;
    }

    var p = this.state.start;
    var obj = this.state.nodes[p];
    while (p) {
      p = obj.link;
      if (p) {
        obj = this.state.nodes[p];
      }
    }

    console.log('last node details are: ', obj);

    return obj;
  }


  referenceToSecondLastNode(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list, nothing found');
      return;
    }

    let count = this.countNodes();
    if (count < 2) {
      console.log('total count is less than 2');
      return;
    }
    var p = this.state.start;
    var obj = {};
    while (p) {
      obj = this.state.nodes[p];
      if (!this.state.nodes[this.state.nodes[obj.link].link]) {
        break;
      }

      p = obj.link;
    }

    console.log('second last node details are: ', obj);
  }

  referenceToNodeWithInfo(e) {
    this.search(e);
  }

  _referenceToNodeWithPosition(k) {
    let count = this.countNodes();

    if (k > count) {
      console.log('position ', k, ', out of range as total count is ', count);
      return;
    }
    var p = this.state.start;
    var obj = this.state.nodes[p];
    var i = 1;
    for (i = 1; i < k && p; i++) {
      p = obj.link;
      obj = this.state.nodes[p];
    }

    console.log('obj at position ', k, ', is ', obj);
    return obj;
  }

  referenceToNodeWithPosition(e) {
      e.preventDefault();
      if (!this.state.start) {
        console.log('empty list, nothing found');
        return;
      }

      if (!this.refs.data.value) {
        console.log('fill the position in text input before continue');
        return;
      }

      var k = parseInt(this.refs.data.value, 10);
      var obj = this._referenceToNodeWithPosition(k);
      return obj;
  }

  referenceToPredecessorNodeWithInfo(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list, nothing found');
      return;
    }

    let count = this.countNodes();
    if (count < 2) {
      console.log('total count is less than 2');
      return;
    }

    if (!this.refs.data.value) {
      console.log('fill the text input before continue');
      return;
    }

    var position = 1;
    var keyword = this.refs.data.value;
    var p = this.state.start;
    var obj = {};
    var found = false;
    while (p) {
      obj = this.state.nodes[p];
      if (this.state.nodes[obj.link].data === keyword) {
        found = true;
        break;
      }

      if (!this.state.nodes[this.state.nodes[obj.link].link]) {
        break;
      }

      position++;
      p = obj.link;
    }

    if (found) {
      console.log('Predecessor to keyword: ', keyword, ' found at position: ', position, ' with content of ', obj);
      return obj;
    } else {
      console.log('Predecessor to keyword: ', keyword, ' not found');
      return null;
    }
  }

  insertInBeginning(e) {
    e.preventDefault();
    if (!this.state.start) {
      this.submitForm(e);
      return;
    }

    if (!this.refs.data.value) {
      console.log('fill the text input before continue');
      return;
    }
    const id = guid();
    const obj = this.state.nodes;
    var tmp = this.state.start;
    //creating new node with link = null in the start
    obj[id] = {};
    obj[id].id = id;
    obj[id].data = this.refs.data.value;
    obj[id].link = tmp;
    this.refs.data.value = '';
    console.log(obj);
    this.setState({nodes: obj, start: id}, () => {
      this.displayList();
    });
  }

  insertAtEnd(e) {
    e.preventDefault();
    if (!this.state.start) {
      this.submitForm(e);
      return;
    }

    if (!this.refs.data.value) {
      console.log('fill the text input before continue');
      return;
    }
    const lastNode = this.referenceToLastNode(e);

    const obj = this.state.nodes;
    const id = guid();
    obj[id] = {};
    obj[id].id = id;
    obj[id].data = this.refs.data.value;
    obj[id].link = null;

    obj[lastNode.id].link = id;

    this.refs.data.value = '';
    console.log(obj);
    this.setState({nodes: obj}, () => {
      this.displayList();
    });
  }

  _insert(rec) {
    var obj = this.state.nodes;
    //creating new node with link = null in the start
    const id = guid();
    obj[id] = {};
    obj[id].id = id;
    obj[id].data = this.refs.text.value;
    obj[id].link = rec.link;

    obj[rec.id].link = id;
    this.refs.text.value = '';
    this.setState({nodes: obj}, () => {
      this.displayList();
    });
  }

  insertAfter(e) {
    //put search keyword in input box and then click insert after
    var rec = this.search(e);

    if (!rec) {
      console.log('item not found');
    }

    this._insert(rec);

    /*var obj = this.state.nodes;
    //creating new node with link = null in the start
    const id = guid();
    obj[id] = {};
    obj[id].id = id;
    obj[id].data = this.refs.text.value;
    obj[id].link = rec.link;

    obj[rec.id].link = id;
    this.refs.text.value = '';
    this.setState({nodes: obj}, () => {
      this.displayList();
    });*/

  }

  insertBefore(e) {

      //put search keyword in input box and then click insert after
      var rec = this.referenceToPredecessorNodeWithInfo(e);

      if (!rec) {
        console.log('item not found');
      }
      this._insert(rec);
      /*var obj = this.state.nodes;
      //creating new node with link = null in the start
      const id = guid();
      obj[id] = {};
      obj[id].id = id;
      obj[id].data = this.refs.text.value;
      obj[id].link = rec.link;

      obj[rec.id].link = id;
      this.refs.text.value = '';
      this.setState({nodes: obj}, () => {
        this.displayList();
      });*/
  }

  insertAtPosition(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list, nothing found');
      return;
    }

    if (!this.refs.data.value) {
      console.log('fill the position in text input before continue');
      return;
    }

    var k = parseInt(this.refs.data.value, 10);
    const rec = this._referenceToNodeWithPosition(k-1);

    this._insert(rec);
  }

  deleteFirstNode(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list, nothing found');
      return;
    }

    var p = this.state.start;
    var obj = this.state.nodes[p];
    var nodes = this.state.nodes;
    delete nodes[p];
    this.setState({start: obj.link, nodes: nodes, displayNodes: []}, () => {
      this.displayList();
    });

  }

  deleteLastNode(e) {
    e.preventDefault();

  }

  deleteOnlyNode(e) {
    e.preventDefault();

  }

  deleteAnyNode(e) {
    e.preventDefault();

  }

  reverseList(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list');
      return;
    }
    console.log('state is ', this.state);

    var p = this.state.start;
    var obj = this.state.nodes[p];
    var newObj = {};
    var next = null;
    var nextObj = null;
    var prev = null;
    var prevObj = null;

    //loop Starts
    while (p) {
      next = obj.link;
      nextObj = this.state.nodes[next];

      obj.link = prev;

      prev = p;
      prevObj = obj;

      newObj[prev] = prevObj;

      p = next;
      obj = nextObj;
    }
    //change start to prev as shown below

    //final result
    console.log('final is ', newObj);
    this.setState({nodes: newObj, start: prev}, () => {
      this.displayList();
    });

    return;

  }

  makeInt(node) {
    for (var y in node) {
      console.log('y is ', y, ', and node is ', node[y]);
      node[y].data = parseInt(node[y].data, 10);
    }
    
    return node;
  }
  
  /*
    Start -> 45 -> 38 -> 59 -> 12 -> 49
    References: p, q, end
      end will be null in first pass
      it will refer last node in second pass
      it will refer second last node in third pass
      stop when end refers to second node
      starting point: p = start, q = p.link; so p will refer to first node and q will refer to second node
      Stop when p.link = end
      And we will compare the data part of p and q, if data part are out of order, we will swap p and q

      Example:
      1. end is null, p refer to first node, q refer to second node, we compare the data value of p and q, since p is 45 and q is 38 so we swap the 2 values, and then p will refer to q and q will refer to next node.
      2. here since 45 is less than 59 so no need of swapping, move p to q and q to next node
      3. here p is 59, q is 12, so we need to swap and then move p to q and q to next node
      4. here p is 59 and q is 49 so we swap and move so now p.link is null and end is null so we stop, this is end of pass 1
      end will be now last node

      Now we will start pass2
      1. p and q will be compared and we swap or move forward,
      2. we will stop when p.link is end,

      Each pass will sort one node from last to first,

      once end reach 2nd node, we will stop the program.
      
      
      PENDING
  */
  BubbleSortExData(e) {
    e.preventDefault();
    if (!this.state.start) {
      console.log('empty list');
      return;
    }
    console.log('state is ', this.state);
    /*var start = 'a1';
    var node = {
      a1: {id: 'a1', data: 45, link: 'a2'},
      a2: {id: 'a2', data: 38, link: 'a3'},
      a3: {id: 'a3', data: 59, link: 'a4'},
      a4: {id: 'a4', data: 12, link: 'a5'},
      a5: {id: 'a5', data: 49, link: null},
    }
    */
    var start = this.state.start;
    var node = this.state.nodes;
    
    //make all values as integer
    node = this.makeInt(node);

    console.log('start is ', start, ' and node is ', node);

    var p, q;
    var end = null;
    var pObj = {}
    var qObj = {};
    var temp;
    var endTemp = [];
    var newNode = node;

    //inner loop starts
    p = start;
    var orignalObj = node[start];
    pObj = node[p];
    
    //once end reach 2nd node, we will stop the program.
    while (end !== orignalObj.link) {
      console.log('start loop');
      node = newNode;
      newNode = {};
      //inner loop starts here
      while (pObj.link !== end) {
        //assign q to second node
        q = pObj.link;
        qObj = node[q];
        
        console.log('p: ', pObj.data, ', q: ', qObj.data);
        //check if first node data is greater than second node, if yes then swap it
        if (pObj.data > qObj.data) {
          //swap
          temp = pObj.data;
          pObj.data = qObj.data;
          qObj.data = temp;
        }

        //assign p node to newNode
        newNode[p] = pObj;
        console.log('p: ', pObj, ', q: ', qObj);

        // set p = q and later q will move to next element when loop will restart
        p = q;
        pObj = node[p];
      }
      //inner loop ends here

      newNode[q] = qObj;
      console.log('new node is ', newNode);

      end = p;
      p = start;
      pObj = node[p];
      console.log('end is ', end);
      
      //taking end item and putting it in new array
      endTemp.unshift(newNode[end]);
    }
    
    endTemp.unshift(pObj);
    
    var endTempObj = {};
    for (var x=0; x < endTemp.length; x++) {
      endTempObj[endTemp[x].id] = endTemp[x];
    }
    
    console.log('endTempObj: ', endTempObj);


/*
        //inner loop starts
        node = newNode;
        newNode = {};
        p = start;
        pObj = node[p];
        while (pObj.link !== end) {
          q = pObj.link;
          qObj = node[q];
          console.log('p: ', pObj.data, ', q: ', qObj.data);
          if (pObj.data > qObj.data) {
            //swap
            temp = pObj.data;
            pObj.data = qObj.data;
            qObj.data = temp;
          }

          newNode[p] = pObj;
          console.log('p: ', pObj, ', q: ', qObj);

          p = q;
          pObj = node[p];
        }

        newNode[q] = qObj;
        console.log('new node is ', newNode);

        //inner loop ends
*/


  }

  BubbleSortExLinks(e) {

  }

  mergeSort() {

  }

  hasCycle() {

  }

  removeCycle() {

  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.start) {
      this.insertAtEnd(e);
      return;
    }

    if (!this.refs.data.value) {
      console.log('fill the text input before continue');
      return;
    }

    const id = guid();
    var obj = this.state.nodes;
    if (!this.state.start) {
      this.setState({start: id});
      obj = {};
    }
    //creating new node with link = null in the start
    obj[id] = {};
    obj[id].id = id;
    obj[id].data = this.refs.data.value;
    obj[id].link = null;
    this.refs.data.value = '';
    console.log(obj);
    this.setState({nodes: obj}, () => {
      this.displayList();
    });
  }

  render() {
    console.log('this state: ', this.state);
    const myStyle1 = {
         marginLeft: 15
    };
    return (
      <div>
        <div className="row">
          <div className="col-md-12">

            <h1>Single Linked list</h1>
            <p>Single Linked list node is made up of 3 parts info part (acutal data) , link part (next node link) and id. Start is the first node, We travel all the node from this node, for empty list start is null. </p>
            <form className="form-inline" onSubmit={this.submitForm.bind(this)}>
                <div className="form-group">
                    <label>Data in List</label>
                    <input type="text" className="form-control" placeholder="Enter data" ref="data" style={myStyle1} />
                </div>
                <button type="button" className="btn btn-default" style={myStyle1} onClick={this.submitForm.bind(this)}>Add in Empty List</button>
                <button type="button" className="btn btn-default" style={myStyle1} onClick={this.insertInBeginning.bind(this)}>Insert At Beginning</button>
                <button type="button" className="btn btn-default" style={myStyle1} onClick={this.insertAtEnd.bind(this)}>Insert At End</button>
            </form>
            <br /><br />

          </div>
        </div>


        <div className="row">
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item"><a href="" onClick={this.submitForm.bind(this)}>Insert in empty list</a> / <a href="" onClick={this.insertInBeginning.bind(this)}>Insert in the beginning of the list</a></li>
              <li className="list-group-item"><a href="" onClick={this.insertAtEnd.bind(this)}>Insert a node at the end of the list</a></li>
              <li className="list-group-item"><input type="text" placeholder="" ref="text" /> <br /><br /><a href="" onClick={this.insertAfter.bind(this)}>Insert a node after a specified node</a><br /><a href="" onClick={this.insertBefore.bind(this)}>Insert a node before a specified node</a> </li>
              <li className="list-group-item"><a href="" onClick={this.insertAtPosition.bind(this)}>Insert a node at a given position</a> (put position in top textbox and content in above text box)</li>

              <li className="list-group-item"><a href="" onClick={this.search.bind(this)}>Search for an element (input value required)</a></li>
              <li className="list-group-item"><a href="" onClick={this.referenceToLastNode.bind(this)}>Reference To Last Node</a></li>
              <li className="list-group-item"><a href="" onClick={this.referenceToSecondLastNode.bind(this)}>Reference To Second Last Node</a></li>
              <li className="list-group-item"><a href="" onClick={this.referenceToPredecessorNodeWithInfo.bind(this)}>Reference To Predessor Node With Info (input value required)</a></li>
              <li className="list-group-item"><a href="" onClick={this.referenceToNodeWithPosition.bind(this)}>Reference To Node At Position (input value of position required)</a></li>


              <li className="list-group-item"><a href="" onClick={this.deleteFirstNode.bind(this)}>Delete first node</a></li>
              <li className="list-group-item"><a href="" onClick={this.deleteOnlyNode.bind(this)}>Delete of the only node</a></li>
              <li className="list-group-item"><a href="" onClick={this.deleteLastNode.bind(this)}>Delete last node</a></li>
              <li className="list-group-item"><a href="" onClick={this.deleteAnyNode.bind(this)}>Delete any node</a></li>
              <li className="list-group-item"><a href="" onClick={this.reverseList.bind(this)}>Reverse the list</a></li>
              <li className="list-group-item"><a href="" onClick={this.BubbleSortExData.bind(this)}>Bubble sort by exchanging data</a></li>
              <li className="list-group-item"><a href="">Bubble sort by exchanging links</a></li>
              <li className="list-group-item"><a href="">Merge Sort</a></li>
              <li className="list-group-item"><a href="">Insert Cycle</a></li>
              <li className="list-group-item"><a href="">Detect Cycle</a></li>
              <li className="list-group-item"><a href="">Remove Cycle</a></li>
            </ul>
          </div>
          <div className="col-md-9">
            <EmptyList start={this.state.start} />
            <p>Total Nodes: {this.state.totalNodes}</p>
            <DisplayList list={this.state.displayNodes} />
          </div>
        </div>

      </div>
    );
  }
}

export default SingleLinkedLists;
