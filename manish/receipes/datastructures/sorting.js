// JavaScript Document

/* BUBBLE SORT */

function BubbleSort(array) {
  this.arr = array;
}

BubbleSort.prototype.less = function(value1, value2) {
  return value1 < value2;
}

BubbleSort.prototype.more = function (value1, value2) {
  return value1 > value2;
}

BubbleSort.prototype.sort = function() {
  console.log('whole array list is ', this.arr);
  
  var size = this.arr.length;
  var i;
  var j;
  var temp;
  
  if (this.more(this.arr[0], this.arr[1])) {
    temp = this.arr[0];
    this.arr[0] = this.arr[1];
    this.arr[1] = temp;
  }
  
  console.log('new array list is ', this.arr);
   
}

function callBubbleSort() {
  var array = [9, 1, 3];
  var bs = new BubbleSort(array);
  bs.sort();
}

