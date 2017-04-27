<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>

<script>
  /*
function fibonacci(n) {
    if (n <= 1) return n;
    var fib = [];
    fib[0] = 0;
    fib[1] = 1;
    
    for (var i = 2; i <= n; i++) {
        var x = fib[i-2];
        var y = fib[i-1];
        var z = x + y;
        fib[i] = z;
    }
    
    return fib[n];
}

var a = fibonacci(10);

  
function mergedArray(a, b) {
    //sorting the a and b
    a = a.sort();
    
    b = b.sort();
    //merging
    var tempArray = [];
    
    while (a.length || b.length) {
    
        if (typeof a[0] === 'undefined') {
            tempArray.push(b[0]); 
            b.splice(0, 1);
            console.log('b is ', b);
        } else if (typeof b[0] === 'undefined') {
            tempArray.push(a[0]); 
            a.splice(0, 1);
            console.log('a is ', a);
        } else if (a[0] < b[0]) {
            tempArray.push(a[0]); //taking small number and pushing it to temp array
            a.splice(0, 1);
            console.log('a is ', a);
        } else if (a[0] > b[0]) {
            tempArray.push(b[0]); 
            b.splice(0, 1);
            console.log('b is ', b);
        }
    }
    
    return tempArray;
    
}

var result = mergedArray([3, 1 ,5], [2, 6, 4]);
*/

  function compareMe(obj1, obj2) {
    var a = Object.getOwnPropertyNames(obj1);
    var b = Object.getOwnPropertyNames(obj2);
    
    for (var i in a) {
        var key = a[i];
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    
    return true;
}

var o1 = {
    name: 'value',
    lastname: 'value2'
};
var o2 = {
    name: 'value',
    lastname: 'value2'
};
var res = compareMe(o1, o2);

console.log(res);
  </script>
</head>

<body>
</body>
</html>