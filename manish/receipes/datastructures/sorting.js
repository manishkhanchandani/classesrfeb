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
  
  for (i = 0; i < size - 1; i++) {
    console.log(i, ' is i, and size - 1 is ', (size - 1), ' size - i - 1 is ', (size - i - 1));
    for (j = 0; j < size - i - 1; j++) {

      if (this.more(this.arr[j], this.arr[j+1])) {
        temp = this.arr[j];
        this.arr[j] = this.arr[j + 1];
        this.arr[j + 1] = temp;
      }
      console.log('new array list is ', this.arr);

    }
    
  }
  console.log('final array list is ', this.arr);
}

BubbleSort.prototype.sort2 = function() {
  console.log('whole array list is ', this.arr);
  
  var size = this.arr.length;
  var i;
  var j;
  var temp;
  var swapped = 1;
  
  for (i = 0; i < (size - 1) && swapped === 1; i++) {
    swapped = 0;
    
    for (j = 0; j < (size - i - 1); j++) {
      if (this.more(this.arr[j], this.arr[j + 1])) {
        console.log('swapped is 1, swapped positions are : ', j, ' and ', (j+1));
        console.log('swapped is 1, swapped numbers are : ', this.arr[j], ' and ', this.arr[j + 1]);
        temp = this.arr[j];
        this.arr[j] = this.arr[j + 1];
        this.arr[j + 1] = temp;
        swapped = 1;
        console.log('new array list is ', this.arr);
      }
      
    }
  }
  console.log('final array list is ', this.arr);
}

function callBubbleSort() {
  var array = [25, 1, 3, 2, 10, 4, 20, 6, 11, 8];
  var bs = new BubbleSort(array);
  bs.sort2();
}

