
//predefined list as an javascript object
var list = {
  1: {
    info: '10',
    link: 2
  },
  2: {
    info: '20',
    link: 3
  },
  3: {
    info: '30',
    link: 4
  },
  4: {
    info: '40',
    link: 5
  },
  5: {
    info: '50',
    link: 10
  },
  10: {
    info: '60',
    link: null
  }
};

//display list
displayList(1);
countNodes(1);
search(1, '40');
search(1, 'some text');

function createNode(passedInfo, passedLink) {
  var temp = {
    info: passedInfo,
    link: passedLink
  };
}

function displayList(startNode)
{
  if (!startNode) {
    console.log('List is empty');
    return;
  }
  console.log('List is : ');
  var p = list[startNode];
  while (p != null) {
    console.log(p.info, ', ', p);
    p = list[p.link];
  }
}

function countNodes(startNode)
{
  var n = 0;
  var p = list[startNode];
  console.log('Count List is : ');
  while (p != null) {
    console.log(p.info, ', ', p);
    p = list[p.link];
    n++
  }
  
  console.log('Number of nodes = ' + n);
}

function search(startNode, searchText) 
{
  var position = 1;
  var p = list[startNode];
  console.log('Search List is : ');
  while (p != null) {
    console.log(p.info, ', ', p);
    if (p.info == searchText) {
      break;
    }
    position++;
    p = list[p.link];
  }
  
  if (!p) {
    console.log(searchText + ' not found in list ');
  } else {
    console.log(searchText + ' found in list ');
  }//end if
  
  
}