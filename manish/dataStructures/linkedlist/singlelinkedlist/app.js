
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
  var p = startNode;
  while (p != null) {
    n++;
    p = p.link;
  }
  
  console.log('Number of nodes = ' + n);
}

function search(startNode) 
{
  var position = 1;
  var p = startNode;
  while (p != null) {
    if (p.info === x) {
      break;
    }
    
    position++;
    p = p.link;
  }//end while
  
  if (p === null) {
    console.log(x + ' not found in list ');
  } else {
    console.log(x + ' found in list ');
  }//end if
  
  
}