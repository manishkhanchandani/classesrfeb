https://github.com/khan4019/front-end-Interview-Questions#javascript-algorithm-beginners-level
http://www.thatjsdude.com/interview/js2.html#truthyVsEqality
http://www.thatjsdude.com/interview/css.html


JavaScript: Basics and Tricky Questions

21+ questions and answers (for intermediate)

What are the differences between null and undefined?
    The difference between undefined and null is minimal, but there is a difference. A variable whose value is undefined has never been initialized. A variable whose value is null was explicitly given a value of null , which means that the variable was explicitly set to have no value.
    
    Answer: JavaScript has two distinct values for nothing, null and undefined.

      undefined

      undefined means, value of the variable is not defined. JavaScript has a global variable undefined whose value is "undefined" and typeof undefined is also "undefined". Remember, undefined is not a constant or a keyword. undefined is a type with exactly one value: undefined. Assigning a new value to it does not change the value of the type undefined.

      8 Ways to get Undefined:
      A declared variable without assigning any value to it.
      Implicit returns of functions due to missing return statements.
      return statements that do not explicitly return anything.
      Lookups of non-existent properties in an object.
      Function parameters that have not passed.
      Anything that has been set to the value of undefined.
      Any expression in the form of void(expression)
      The value of the global variable undefined
      null

      null means empty or non-existent value which is used by programmers to indicate “no value”. null is a primitive value and you can assign null to any variable. null is not an object, it is a primitive value. For example, you cannot add properties to it. Sometimes people wrongly assume that it is an object, because typeof null returns "object".

      Btw, null == undefined ref: history of typeof null
  
  
What are the differences between == and ===?
    JavaScript has both strict and type-converting equality comparison. For strict equality the objects being compared must have the same type and:

    Two strings are strictly equal when they have the same sequence of characters, same length, and same characters in corresponding positions.
    Two numbers are strictly equal when they are numerically equal (have the same number value). NaN is not equal to anything, including NaN. Positive and negative zeros are equal to one another.
    Two Boolean operands are strictly equal if both are true or both are false.
    Two objects are strictly equal if they refer to the same Object.
    Null and Undefined types are == (but not ===). [I.e. (Null==Undefined) is true but (Null===Undefined) is false]


    Answer: The simplest way of saying that, == will not check types and === will check whether both sides are of same type. So, == is tolerant. But under the hood it converts to its convenient type to have both in same type and then do the comparison.

      === compares the types and values. Hence, if both sides are not same type, answer is always false. For example, if you are comparing two strings, they must have identical character sets. For other primitives (number, boolean) must share the same value.

      Rule for implicit coercion: Comparison by using == does implicit type conversion under the hood. And rules for implicit coercion are as follows-

      If both operands are same type use ===
      undefined == null
      If one operands is string another is number, convert string to number
      If one is boolean and another is non-boolean, convert boolean to number and then perform comparison
      While comparing a string or number to an object, try to convert the object to a primitive type and then try to compare
      Be careful while comparing objects, identifiers must reference the same objects or same array.


      var a = {a: 1};
      var b = {a: 1};
      a == b //false
      a === b //false

      var c = a;
      a == c//true
      a === c //true

      Special note: NaN, null and undefined will never === another type. NaN does not even === itself.

How would you compare two objects in JavaScript?
  JSON.stringify(obj1) === JSON.stringify(obj2)
  or
  
  function isEqual(a, b) {
      var aProps = Object.getOwnPropertyNames(a),
          bProps = Object.getOwnPropertyNames(b);

      if (aProps.length != bProps.length) {
          return false;
      }

      for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];

          if (a[propName] !== b[propName]) {
              return false;
          }
      }
      return true;
  }


11+ true false related questions that will trick you.
  Question: Is 'false' is false?

  Answer: No. Because, it's a string with length greater than 0. Only empty string is false.

  Question: Is ' ' is false?

  Answer: No. Because, it's not an empty string. There is a white space in it.

  Question: What about {}?

  Answer: true. It's an object. An object without any property is an object can't be falsy.

  Question: Tell me about []?

  Answer: This is also truthy. It's an array object (array is child of object) is truthy.

  Question: You talked bout '' to be falsy. What about new String('')?

  Answer: Though you are passing empty string to the string constructor, it is creating an String object. More precisely a instance of String object. It becomes an object. Hence, it is not false. so, it is truthy.

  Question: Tell me about new Boolean(false)

  Answer: truthy. As it creates an instance of the Boolean object which is an object. Object is truthy.

  Question: Boolean(function(){})

  Answer: true if you pass a truthy value to Boolean, it will be true.

  Question: Boolean(/foo/)

  Answer: true

  Question: true%1

  Answer: 0. When you are trying to find reminder of true, true becomes 1 and reminder of 1 while dividing by 1 is 0. you will get same result if you doe false%1

  Question: ''%1

  Answer: 0


As [] is true, [] == true should also be true. right?

  Answer: You are right about first part, [], empty array is an object and object is always truthy. Hence, if you use if([]){console.log('its true')} you will see the log.

  However, special case about == (double equal) is that it will do some implicit coercion.

  Since left and right side of the equality are two different types, JavaScript can't compare them directly . Hence, under the hood, JavaScript will convert them to compare. first right side of the equality will be cooereced to a number and number of true would be 1.

  After that, JavaScript implementation will try to convert [] by usingtoPrimitive (of JavaScript implementation). since [].valueOf is not primitive will use toString and will get ""

  Now you are comparing "" == 1 and still left and right is not same type. Hence left side will be converted again to a number and empty string will be 0.

  Finally, they are of same type, you are comparing 0 === 1 which will be false.


How could you write a method on instance of a date which will give you next day?
  Answer: I have to declare a method on the prototype of Date object. To get access to the current value of the instance of the date, i will use this


  Date.prototype.nextDay = function(){
    var currentDate = this.getDate();
    return new Date(this.setDate(currentDate +1));
  }

  var date = new Date(); 
  date; //Fri May 16 2014 20:47:14 GMT-0500 (Central Daylight Time)
  date.nextDay();//Sat May 17 2014 20:47:14 GMT-0500 (Central Daylight Time)


If you want to use an arbitrary object as value of this, how will you do that?
  Answer: There are at least three different ways to doing this by using bind, call and apply. For example, I have a method named deductMontlyFee in the object monica and by default value of this would be monica inside the method.


  var monica = {
    name: 'Monica Geller',
    total: 400,
    deductMontlyFee: function(fee){
       this.total = this.total - fee;
       return this.name + ' remaining balance is '+ this.total; 
    }
  }

  If I bind the deductMontlyFee of monica with another object rachel and pass rachel as first parameter of the bind function, rachel would be the value of this.


  var rachel = {name: 'Rachel Green', total: 1500};
  var rachelFeeDeductor = monica.deductMonthlyFee.bind(rachel, 200);

  rachelFeeDeductor(); //"Rachel Green remaining balance is 1300"
  rachelFeeDeductor(); //"Rachel Green remaining balance is 1100"

  bind allows you to borrow a method and set the value of this without calling the function. It simply returns an exact copy of the function with new value of this. You can reuse the same function with new value of this without harming the old one.


  var ross = {name:'Ross Geller', total:250};
  var rossFeeDeductor = monica.deductMonthlyFee.bind(ross, 25);
  rossFeeDeductor(); //"Ross Geller remaining balance is 225"
  rossFeeDeductor(); //"Ross Geller remaining balance is 200"

  rachelFeeDeductor(); //"Rachel Green remaining balance is 900"
        
Question: If an older browser dont have bind function, how will you shim it

  Answer: Look at the code below and use your brain.


  Function.prototype.bind = Function.prototype.bind || function(context){
    var self = this;
    return function(){
      return self.apply(context, arguments);
    };
  }

Write a simple function to tell whether 2 is passed as parameter or not?
  Basics: arguments is a local variable, available inside all functions that provides a collection of all the arguments passed to the function. arguments is not an array rather an array like object. It has length but doesn't have the methods like forEach, indexOf, etc.

  Answer: First convert arguments to an array by calling slice method on an array and pass arguments. After that simply use indexOf.


  function isTwoPassed(){
    var args = Array.prototype.slice.call(arguments);
    return args.indexOf(2) != -1;
  }

  isTwoPassed(1,4) //false
  isTowPassed(5,3,1,2) //true
        
        Danger: Don't name any argument as "arguments" or dont create any local variable named as "arguments", this will override build in arguments object.




How could you use Math.max to find the max value in an array?
  Answer: Use apply on Math.max and pass the array as apply takes an array of arguments. Since we are not reading anything from this or using it at all. We can simply pass null as first parameter.


  function getMax(arr){
    return Math.max.apply(null, arr);  
  }

  Extra: call and apply, both takes the value of this as first parameter. However, call takes a collection of arguments after first parameter whereas apply use an array of arguments as second parameter.

  Tip: If you have weaker memory like me, you can remember apply starts with "a" and array starts with "a"


What the heck is this in JavaScript?
  Answer: At the time of execution of every function, JavaScript engine sets a property to the function called this which refer to the current execution context. this is always refer to an object and depends on how function is called. There are 7 different cases where the value of this varies.

      In the global context or inside a function this refers to the window object.
      Inside IIFE (immediate invoking function) if you use "use strict", value of this is undefined. To pass access window inside IIFE with "use strict", you have to pass this.
      While executing a function in the context of an object, the object becomes the value of this
      Inside a setTimeout function, the value of this is the window object.
      If you use a constructor (by using new keyword) to create an object, the value of this will refer to the newly created object.
      You can set the value of this to any arbitrary object by passing the object as the first parameter of bind, call or apply
      For dom event handler, value of this would be the element that fired the event

21 quick questions that will trick you.
  Question: What is typeof []

  Answer: Object. Actually Array is derived from Object. If you want to check array use Array.isArray(arr)

  Question: What is typeof arguments

  Answer: Object. arguments are array like but not array. it has length, can access by index but can't push pop, etc.

  Question: What is 2+true

  Answer: 3. The plus operator between a number and a boolean or two boolean will convert boolean to number. Hence, true converts to 1 and you get result of 2+1

  Question: What is '6'+9

  Answer: 69. If one of the operands of the plus (+) operator is string it will convert other number or boolean to string and perform a concatenation. For the same reason, "2"+true will return "2true"

  Question: What is the value of 4+3+2+"1"

  Answer: 91 . The addition starts from the left, 4+3 results 7 and 7+2 is 9. So far, the plus operator is performing addition as both the operands are number. After that 9 + "1" where one of the operands is string and plus operator will perform concatenation.

  Question: What is the value of "1"+2+4

  Answer: "124". For this one "1" + 2 will produce "12" and "12"+4 will generates "124".

  Question: What is the value of -'34'+10

  Answer: -24. minus(-) in front of a string is an unary operator that will convert the string to a number and will make it negative. Hence, -'34' becomes, -34 and then plus (+) will perform simple addition as both the operands are number.

  Question: What is the value of +'dude'

  Answer: NaN. The plus (+) operator in front of a string is an unary operator that will try to convert the string to number. Here, JavaScript will fail to convert the "dude" to a number and will produce NaN.

  Question: If you have var y = 1, x = y = typeof x; What is the value of x?

  Answer: "undefined"

  Question: for var a = (2, 3, 5); what is the value of a?

  Answer: 5. The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand. ref: MDN

  Question: for var a = (1, 5 - 1) * 2 what is the value of a?

  Answer: 8

  Question: What is the value of !'bang'

  Answer: false. ! is NOT. If you put ! in front of truthy values, it will return false. Using !! (double bang) is a tricky way to check anything truthy or falsy by avoiding implicit type conversion of == comparison.

  Question: What is the value of parseFloat('12.3.4')

  Answer: 12.3

  Question: What is the value of Math.max([2,3,4,5]);

  Answer: NaN

  Question: 3 instanceof Number

  Answer: false

  Question:null == undefined

  Answer: true

  Question:What is the value of !!function(){};

  Answer: true

  Question: What is the value of typeof bar

  Answer: "undefined"

  Question: What is the value of typeof null

  Answer: "object"

  Question: If var a = 2, b =3 what would be value of a && b

  Answer: 3

  Question: What would be consoled var foo = 'outside'; function logIt(){console.log(foo); var foo = 'inside';} logIt();

  Answer: undefined

  Question: What is -5%2

  Answer:-1. the result of remainder always get the symbol of first operand

  Question: Why .1+.2 != .3

  Answer:

  Question: 42..toString()

  Anwser: "42"

  Question: 4.2..toString

  Anwser: //SyntaxError: Unexpected token .

  Question:42 . toString()

  Anwser: "42"

  Question: typeof(NaN)

  Anwser:"number"

  Question: 2 in [1,2]

  Anwser: false. Because "in" returns whether a particular property/index available in the Object. In this case object has index 0 and 1 but don't have 2. Hence you get false.


12. log prefix
How could you set a prefix before everything you log? for example, if you log('my message') it will log: "(app) my message"
  Answer: Just get the arguments, convert it to an array and unshift whatever prefix you want to set. Finally, use apply to pass all the arguments to console.


  function log(){
    var args = Array.prototype.slice.call(arguments);
    args.unshift('(app)');
    console.log.apply(console, args);
  }

  log('my message'); //(app) my message
  log('my message', 'your message'); //(app) my message your message 
        
13. Scope and hoisting
What will you see in the console for the following example?
    var a = 1; 
    function b() { 
        a = 10; 
        return; 
        function a() {} 
    } 
    b(); 
    console.log(a);          

    Answer: 1

    Explanation:

    function declaration function a(){} is hoisted first and it behaves like var a = function () {};. Hence in local scope variable a is created.
    If you have two variables with same name (one in global another in local), local variable always get precedence over global variable.
    When you set a = 10;, you are setting the local variable a , not the global one. Hence, the value of global variable remain same and you get, 1 in the log. ref: js hoisting/scope
    Extra: If you didnt have a function named as "a", you will see 10 in the log.

14. Closures Inside Loops

  Question: Look at the code below, you have a for loop if you have setTimeout inside it. If log the loop counter inside setTimeout, what will be logged?


  for(var i = 0; i < 10; i++) {
      setTimeout(function() {
        console.log(i);  
      }, 10);
  }
  Answer: The above will not output the numbers 0 through 9, but will simply print the number 10 ten times.

  Explanation: The console log is inside the anonymous function of setTimeout and setTimeout is executed when current call stack is over. So, the loop finishes and before setTimeout get the chance to execute. However, anonymous functions keep a reference to i by creating a closure. Since, the loop is already finished, the value i has been set to 10. When setTimeout use the value of i by reference, it gets the value of i as 10. Hence, you see 10 ten times.

  Solution: You can fix it by avoiding closure. Just create a IIFE (Immediately Invoked Function Expression), it will create its own scope and you can pass i to the function. In that case i will be a local variable (will not refer to i in the closure) and value of the i in every loop will be preserved.


  for(var i = 0; i < 10; i++) {
      setTimeout((function(i) {
        console.log(i);
      })(i), 10)
  }
  Alternative Solution: Look at the code below and use your brain (if any).


  for(var i = 0; i < 10; i++) {
    setTimeout(console.log.bind(console, i), 10);



15. delete can delete but
Question: Look at the code below, I have a property in a object and I am creating a new object where I am setting it to a new value. If I delete that property what will i get if I try to access that property?


var myObject = {
    price: 20.99,
    get_price : function() {
        return this.price;
    }
};
var customObject = Object.create(myObject);
customObject.price = 19.99;

delete customObject.price;
console.log(customObject.get_price());
        
Answer: You will see 20.99

Explanation: This is very interesting question. When you create object.create(myObject) you are creating new object where the myObject will be the parent of the newly created object. Hence the price property will be at the parent.

When you are assigning some value to customObject.price, you are creating a new property on the child. This means, when you delete customObject.price it deletes the price property in the customObject (in the child). However, when you call the method getprice, first it looks for this.price in the child since the customObject doesn't have price property, JavaScript executor walks through the prototype chain towards the parent. Since customObject was inherited from myObject and myObject has a price property, the get_price method returns the price from parent. Hence, you are getting 20.99


16. Pass by value or by reference
Question: Does JavaScript pass parameter by value or by reference?

Answer: Primitive type (string, number, etc.) are passed by value and objects are passed by reference. If you change a property of the passed object, the change will be affected. However, you assign a new object to the passed object, the changes will not be reflected.


var num = 10,
    name = "Addy Osmani",
    obj1 = {
      value: "first value"
    },
    obj2 = {
     value: "second value"
    },
    obj3 = obj2;
 
function change(num, name, obj1, obj2) {
    num = num * 10;
    name = "Paul Irish";
    obj1 = obj2;
    obj2.value = "new value";
}
 
change(num, name, obj1, obj2);
 
console.log(num); // 10
console.log(name);// "Addy Osmani"
console.log(obj1.value);//"first value"
console.log(obj2.valuee);//"new value"
console.log(obj3.valuee);//"new value"        
     
ref: Snook: passing by value or reference

17. memoization
Question: How could you implement cache to save calculation time for a recursive fibonacci function?

Answer: You could use poor man's memoization with a global variable. If fibonacci is already calculated it is served from the global memo array otherwise it is calculated.


var memo = [];

function _fibonacci(n) {
   if(memo[n]){    
    return memo[n];
   }
   else if (n < 2){
     return 1;
   }else{
     fibonacci(n-2) + fibonacci(n-1);
   }
}
        
Better Implementation: implement memoization in JavaScript

18. Cache function execution
Question: How could you cache execution of any function?

Answer: You could have a method where you will pass a function and it will internally maintain a cache object where calculated value will be cached. When you will call the function with same argument, the cached value will be served.


function cacheFn(fn) {
    var cache={};
    
    return function(arg){
        if (cache[arg]){
           return cache[arg];
        }
        else{
           cache[arg] = fn(arg);
            return cache[arg];
        }
    }
}
        
Question: What if you are passing more than one argument?

Answer: First we have to use arguments to get all the parameters passed to the function and then we can generate key for the cache object. Generating key for the cache object could be tricky and one solution could be just get the all the parameters and concatenate those. Look at the code below.


return function(){
  var args = arguments;  
  var key = [].slice.call(args).join('');
  if(cache[key]){
      return cache[key];
  }
  else{
      cache[key] = fn.apply(thi, args);
      return cache[key];
  }
}
        
19. JQuery style chaining
Question: If you need to implement the following chaining with call back, how will you implement it?


function slow(callback) {
    setTimeout(function(){
        if (Math.random() > 0.5) {
            return callback("Error 417",null)
        }
        callback(null, {id:123})
    },500);
}

function exec(fn){
//write your code here
}

exec(slow).done(function(data){
    console.log(data);
}).fail(function(err){
    console.log("Error: " + err);
})
        
Too much sleepy now. will try to put it up tomorrow.


var obj = {   // every method returns obj---------v
    first: function() { console.log('first');   return obj; },
    second: function() { console.log('second'); return obj; },
    third: function() { console.log('third');   return obj; }
}

obj.first().second().third();
        
ref: jquery like chaining or jquery like chaining

20. Animation
Question: How could you implement moveLeft animation?

Answer: Use setInterval that will place the element to the left position by some pixels in every 10ms. Hence, you will see the element moving towards the desired position. When you call setInterval, it returns a timeId. After reaching the desired location, you have to clear the time interval so that function will not be called again and again in every 10ms.


function moveLeft(elem, distance) {
  var left = 0;

  function frame() {
    left++;
    elem.style.left = left + 'px';

    if (left == distance)
      clearInterval(timeId)
  }

  var timeId = setInterval(frame, 10); // draw every 10ms
}
        
21. Currying
Question: How would you implement currying for any functions?

What is curring: Curring is partial invocation of a function. Currying means first few arguments of a function is pre-processed and a function is returned. The returning function can add more arguments to the curried function. It's like if you have given one or two spice to the curry and cooked little bit, still you can add further spice to it. A simple example will look like-


function addBase(base){
  return function(num){
    return base + num;
  }
}

var addTen = addBase(10);
addTen(5); //15
addTen(80); //90
addTen(-5); //5
        
Explanation: You are creating a closure that return a function. When you are curring with a new number, new number is added to the base you have provided.

Answer: You can add a curry method to the prototype of Function. If now parameters is passed to curry, you simply return the current function. If you have provided arguments to curry there are two steps

Step-1: Concatenate old arguments (provided while creating curry), with new arguments (added after cooking little bit) by using args.concat(toArray(arguments))
Step-2: Pass all the arguments to the function by using apply.
Extra: Just be careful to retain the value of this.

Function.prototype.curry = function() {
    if (arguments.length<1) {
        return this; //nothing to curry. return function
    }
    var self = this;
    var args = toArray(arguments);
    return function() {
        return self.apply(this, args.concat(toArray(arguments)));
    }
}

function toArray(args) {
    return Array.prototype.slice.call(args);
}
        
To use it: Just pass the argument to the function.curry method and a function will be returned. Use returned function for further currying


function converter = function(factor, symbol, input){
  return input * factor + symbol;
}

var milesToKm = converter.curry(1.62, 'km');
mileToKm(3); //result here

var kgToLb = converter.curry(2.2, 'lb');
kgToLb(3); //result here 
        

Deleted Questions
In JavaScript isNaN(undefined) returns true. how could you fix it? Answer: use function isReallyNaN (x){return x!==x;}
What are differences between host object and native object? read answer here
Why extending build in JavaScript object is a bad idea? Answer: google it
How will you get query string in a browsers URL? detail answer or window.location.search;
Why does nearly every object have a toString method?
Why Everything in JavaScript acts like an object, with the only two exceptions being null and undefined?
How would you perform inheritance in JavaScript?
How would you apply asynchronous call without any help of library
What is the difference between slice, substr, substring?






JS: Answer for Basics and Tricky Questions

css: Basics and Tricky Questions

21+ questions and answers

1. float
Question: What does float do?

Answer: float pushes an element to the sides of a page with text wrapped around it. you can create entire page or a smaller area by using float. if size of a floated element changes, text around it will re-flow to accommodate the changes. You can have float left, right, none or inherit.

if you set, 'float: left;' for an image, it will move to the left until the margin, padding or border of another block-level element is reached. The normal flow will wrap around on the right side.

show example
If interviewer wants to ask one question about css, that would be most likely about float.

extra: read the positioning constraints in W3.org: floating elements.

ref: css-tricks: float, float 101
2. clear
Question: How can you clear sides of a floating element?

Answer: If you clear a slide of an element, floating elements will not be accepted on that side. With 'clear' set to 'left', an element will be moved below any floating element on the left side. clear is used to stop wrap of an element around a floating element.

show example
Question: How can you fix, "floated points don't add up to the height of a parent"?

Answer: You can use clear: both in an empty div <div style="clear: both;"></div>, you can use overflow hidden or scroll and you can float the parent as well.

What the heck? Sorry. if you didn't get the question or answer, please read "Techniques for clearing floats" in css-tricks: all about floats

ref: W3.org: clear

3. rapid fire
Question: Does css properties are case sensitive?

Answer: no.

Question: Why css selectors mixed up with cases don't apply the styles?

Answer: because, html ID and classes are case sensitive.

Question: Does margin-top or margin-bottom has effect on inline element?

Answer: no.

Question: Does padding-top or padding-bottom has effect on inline element?

Answer: no.

Question: Does padding-left or padding-right or margin-left or margin-right has effect on inline element?

Answer: yes.

Question: If you have a <p> element with font-size: 10rem, will the text be responsive when the user resizes / drags the browser window?

Answer: no.

Question: The pseudo class :checked will select inputs with type radio or checkbox, but not <option> elements.

Answer: False

Question: In a HTML document, the pseudo class :root always refers to the <html> element.

Answer: True

Question: The translate() function can move the position of an element on the z-axis.

Answer: False

4. units
Question: Which one would you prefer among px, em % or pt and why?

Answer: it depends on what you are trying to do.

px gives fine grained control and maintains alignment because 1 px or multiple of 1 px is guaranteed to look sharp. px is not cascade, this means if parent font-size is 20px and child 16px. child would be 16px.

em maintains relative size. you can have responsive fonts. em is the width of the letter 'm' in the selected typeface. However, this concept is tricky. 1em is equal to the current font-size of the element or the browser default. if u sent font-size to 16px then 1em = 16px. The common practice is to set default body font-size to 62.5% (equal to 10px). em is cascade

% sets font-size relative to the font size of the body. Hence, you have to set font-size of the body to a reasonable size. this is easy to use and does cascade. for example, if parent font-size is 20px and child font-size is 50%. child would be 10px.

pt(points) are traditionally used in print. 1pt = 1/72 inch and it is fixed-size unit.

ref: css-tricks: length, css-tricks: px, em, %, css font-size

5. position
Question: How absolute, relative, fixed and static position differ?

Answer:

absolute, place an element exactly where you want to place it. absolute position is actually set relative to the element's parent. if no parent available then relatively place to the page itself.

relative, is position an element relative to itself (from where the element would be placed, if u don't apply relative positioning). for example, if u set position relative to an element and set top: 10px, it will move 10px down from where it would be normally.

fixed, element is positioned relative to viewport or the browser window itself. viewport doesn't changed if u scroll and hence fixed element will stay right in the same position.

static, element will be positioned based on the normal flow of the document. usually, u will use position static to remove other position might be applied to an element.

ref: css positioning in ten steps, css position, MDN: position

6. display vs visibility
Question: What are the differences between visibility hidden and display none?

Answer: display: none removes the element from the normal layout flow and allow other elements to fill in. visibility: hidden tag is rendered, it takes space in the normal flow but doesn't show it.

if u want to say it smartly, display: none causes DOM reflow where is visibility: hidden doesn't. btw, what is re-flow? answer. sorry i wont tell you, google it.

ref: visibility vs Display

7. inline block
Question: What are the differences between inline, block and inline-block?

Answer:

inline, elements do not break the flow. think of span it fits in the line. Important points about inline elements, margin/ padding will push other elements horizontally not vertically. Moreover, inline elements ignores height and width.

block, breaks the flow and dont sits inline. they are usually container like div, section, ul and also text p, h1, etc.

inline-block, will be similar to inline and will go with the flow of the page. Only differences is this this will take height and width.

ref: display

8. box model
Question: What are the properties related to box model?

Answer: Technically, height, width, padding and border are part of box model and margin is related to it.

Extra: Everything in a web page is a box where you can control size, position, background, etc. Each box/ content area is optionally surrounded by padding, border and margin. When you set height and width of an element, you set content height and width.

ref: W3: box model, css box model, Whats wrong with box model

show example
9. overflow
Question: Does overflow: hidden create a new block formatting context?

Answer: yes

Extra: overflow property deals with the content if content size exceeds the allocated size for the content. You can make extra content visible, hidden, scroll or auto (viewport default behavior).

show example

ref: overflow (read the link and add something from it)

10. media queries
Question: How could you apply css rules specific to a media?

Answer: @media (max-width: 700px){...} means you want to apply rules to those media whose max-width is 700 px. this means every smaller device will have this rule.

@media (max-width: 700px) and (orientation: landscape){...} will apply rules for media smaller than 700px and in landscape orientation.

Question: What is the use of only?

Answer: to hide style sheets from older user agents.

Question: Does the screen keyword apply to the device's physical screen or the browser's viewport?

Answer: Browser's Viewport

ref: how to use media queries, css media queries, W3: media queries

11. pseudo class
Question: What are the some pseudo classed u have used?

Answer: pseudo class tells you specific state of an element. allow to style element dynamically. The most popular one is :hover. Besides i have used :visited, :focus, :nth-child, nth-of-type, :link, etc.

pseudo classes is better if you don't want to mess up with javaScript however, pseudo-classes is slow to process and apply rules.

ref: How to use pseudo classes, meet pseudo classes, list of pseudo classes

pseudo elements

pseudo elements helps you to add cosmetics contents. pseudo elements generates content where as pseudo class deals with state of the element. for example, you can style :first-letter of every paragraph. similarly, :first-line and fancy stuff with :before, :after

show example
ref: intro to css pseudo element, :before :after, css content, W3: generate content

12. vertical Center
Question: How do you align a p center-center inside a div?

Answer: text-align: centerwill do the horizontal alignment but vertical-align: middle will not work here. there are couple of different ways to solve this problem and one of them are positioning. You make the parent as relative position and child as absolute positioning. And then define all position parameter as sero and width 50% and height 30% (sounds messy look at the example and read ref)

show example
ref: 6 methods for vertical center, Absolute horizontal and vertical centering

13. optimize selector
Question: How do you optimize css selectors?

Answer: This is very open and depend on what you are trying to achieve. If i order selectors in terms of render speed it would be like id, class, tag, siblings, child, descendant, universal, attribute, pseudo. Speed of ID and class is very close. However your code should be readable, maintainable and DRY along with highly performant.

The best practices in general are: avoid universal selectors, don't repeat yourself, remove redundant selectors, be as specific as possible, and keep learning.

ref: Efficient CSS selectors, efficiently rendering

14. @import
Question: How can you load css resources conditionally?

Answer: @import allows you to load/ import stylesheet by using a path (uri) representing the location of the file. You can define one or more media by comma separation for which you want to load the stylesheet. If browser dont support the media stylesheet will not be loaded.

ref: be careful while using @import (don't use @import)

15. sprite
Question: Why would you use sprites?

Answer: When you have multiple images/ icons, browser makes separate call to the server for each one of them. sprite is a technique to combine all/ some of them (usually similar one in terms of type of image. For example, you will put jpg in one sprite) in one image. To display the icon you set height, width and background position.

popular libraries like bootstrap use this technique. If you repeat the image. want to scale you have to be careful with sprite.

ref: css sprites, generate sprites

16. specificity
Question: What is specificity? How do u calculate specificity?

Answer: is a process of determining which css rule will be applied to an element. it actually determines which rules will take precedence.

inline style usually wins then ID then class value (or pseudo-class or attribute selector), universal selector (*) has no specificity.

ref: css specificity: things you need to know, specifishity, specificity calculator

17. shadow DOM
Question: What is shadow DOM?

Answer: encapsulate part of a DOM. hide subtree. you can have same ID in different shadow DOM. Polymers uses it. This way your DOM becomes reusable. if interviewer is not happy with your answer give him the links and tell him to spend a weekend on reading.

ref: W3: shadow-DOM, html5rock: shadow DOM

18. transition
Question: What do you know about transition?

Answer: transition allows to add an effect while changing from one style to another. You can set the which property you want to transition, duration, how you want to transit (linear, ease, ease-in, ease-out, cubic-bezier) and delay when transition will start. you can transition more than one property by comma separation

show example
ref: all you need to know about css transition, transition: tutorial, css transition, transition and 3D

19. filter
Question: What are the different css filter you can use?

Answer: css filter allows u to render DOM element, image, or video. u can choose from: grayscale, blur, opacity, brightness, contrast.

show example
ref: Understanding css filter effect

20. pre processor
Question: What are the reasons to use preprocessor?

Answer: you write css in high level with some special syntax (declaring variable, nested syntax, mathematical operations, etc.) and that is compiled to css. Preprocessor helps you to speed up develop, maintain, ensure best practices and also confirms concatenation, compression, etc.

ref: css preprocessor, working with preprocessor
21. see & tell
Question: What would be the color of text "I am awesome" for he following rules?

html: for questions a-d.


<ul class="shopping-list" id="awesome">
    <li><span>Milk</span></li>
    <li class="favorite" id="must-buy"><span class="highlight">I am awesome</span></li>
</ul>
  
a.

<style>
  ul#awesome {
    color: red;
  }
  ul.shopping-list li.favorite span {
    color: blue;
  }
</style>
Answer: blue


b.

<style>
 ul#awesome #must-buy {
    color: red;
 }
 .favorite span {
    color: blue!important;
 }
</style>

Answer: blue


c.

<style>
  ul.shopping-list li .highlight {
    color: red;
  }
  ul.shopping-list li .highlight:nth-of-type(odd) {
    color: blue;
  }
</style>

Answer: blue


d.

<style>
  #awesome .favorite:not(#awesome) .highlight {
    color: red;
  }
  #awesome .highlight:nth-of-type(1):nth-last-of-type(1) {
    color: blue;
  }
</style>

Answer: red

Position related
Question: What will happen to the position of #myDude?


<style>
  #myDude {
    margin-bottom: -5px;
  }
</style>
<p id="myDude">Dude</p>
  
Answer: All elements succeeding #myDude will move 5px updward.

reason: .


<style>
  #myDude {
    margin-left: -5px;
  }
</style>
<p id="myDude">Dude</p>
  
Answer: #myDude will move 5px left.

download resources
Question: On page load, will mypic.jpg get downloaded by the browser?.


<style>
  #test2 {
    background-image: url('mypic.jpg');
    display: none;
  }
</style>
<div id="test1">
    <span id="test2"></span>
</div>
  
Answer: yes.

Question: On page load, will mypic.jpg get downloaded by the browser?


<style>
  #test1 {
    display: none;
  }
  #test2 {
    background-image: url('mypic.jpg');
    visibility: hidden;
  }
</style>
<div id="test1">
    <span id="test2"></span>
</div>
  
Answer: No.


read selector
Question: What will this selector do?


[role=navigation] > ul a:not([href^=mailto]) {

}
  
Answer: This selects anchor links that are not email links that are decedents of an unordered list that is the direct child of any element with a role attribute of 'navigation'. this answer copied from css tricks

What does float do?
  CSS Layout - float and clear. ❮ Previous Next ❯ The float property specifies whether or not an element should float. The clear property is used to control the behavior of floating elements.
  
  
  
How can you clear sides of a floating element?
How can you clear sides of a floating element?
some tricky questions in rapid fire style
Does css properties are case sensitive?
Why css selectors mixed up with cases don't apply the styles?
Does margin-top or margin-bottom has effect on inline element?
Does padding-top or padding-bottom has effect on inline element?
Does padding-left or padding-right or margin-left or margin-right has effect on inline element?
If you have a <p> element with font-size: 10rem, will the text be responsive when the user resizes / drags the browser window?
The pseudo class :checked will select inputs with type radio or checkbox, but not <option> elements.
In a HTML document, the pseudo class :root always refers to the <html> element.
The translate() function can move the position of an element on the z-axis.
Which one would you prefer among px, em % or pt and why?
How absolute, relative, fixed and static position differ?
What are the differences between visibility hidden and display none?
What are the differences between inline, block and inline-block?
What are the properties related to box model?
Does overflow: hidden create a new block formatting context?
How could you apply css rules specific to a media?
What is the use of only?
Does the screen keyword apply to the device's physical screen or the browser's viewport?
What are the some pseudo classed u have used?
How do you align a p center-center inside a div?
How do you optimize css selectors?
How can you load css resources conditionally?
Why would you use sprites?
What is specificity? How do u calculate specificity?
What is shadow DOM?
What do you know about transition?
What are the different css filter you can use?
What are the reasons to use preprocessor?
Show you couple of style example and you have to tell what does it do.
CSS: Answer for Basics and Tricky Questions

css Deleted questions!

Looks like these are for hardcore designer. Hence, didn't make for developers.

How descendant css selectors are matched? get answer
How would u implement modularity in css?
If something doesn't work in a specific browser (IE8), you would u approach this problem?
How do you test cross-browser compatibility of your site?
What is the greatest hack you did in css so far?
What is grid layout?
How can you make a site responsive?
Why reset css is useful? or how normalize.css works?
What do you know about text shadows, box shadows?
JavaScript: Algorithm Beginners Level

20 questions and answers (for beginners)

Verify a prime number?
Find all prime factors of a number?
Get nth Fibonacci number?
Find the greatest common divisor of two numbers?
Remove duplicate members from an array?
merge two sorted array?
Swap two numbers without using a temp variable?
Reverse a string in JavaScript?
How would you reverse words in a sentence?
Reverse words in place?
Find the first non repeating char in a string?
Remove duplicate characters from a sting?
How will you verify a word as palindrome?
Generate random between 5 to 7 by using defined function.
Find missing number from unsorted array of integers.
Get two numbers that equal to a given number?
Find the largest sum of any two elements?
Total number of zeros from 1 upto n?
Check whether a given string is a substring of bigger string
Get permutations of a string
JS: Answer for Algorithm Beginners Level

JavaScript: DOM related Questions

21+ questions and answers (for intermediate JS Developers)

Is there any difference between window and document?

The window is the actual global object.

The screen is the screen, it contains properties about the user's display.

The document is where the DOM is.



Does document.onload and window.onload fire at the same time?
Is attribute similar to property?
What are the different ways to get an element from DOM?
What is the fastest way to select elements by using css selectors?
How come, I can't use forEach or similar array methods on a NodeList?
If you need to implement getElementByAttribute, how would you implement it?
How would you add a class to an element by query selector?
How could I verify whether one element is child of another?
What is the best way to create a DOM element? Set innherHTML or use createElement?
What is createDocumentFragment and why you might use it?
What is reflow? What causes reflow? How could you reduce reflow?
What is repaint and when does this happen?
How could you make sure to run some JavaScript when DOM is ready like $(document).ready?
What is event bubble? How does event flows in DOM?
How would you destroy multiple list items with one click handler?
Create a button that is destroyed by clicking in it but two new buttons are created in it's place.
How could you capture all clicks in a page?
How can you get all the texts in a web page?
What is defer and async keyword does in a script tag?
10 rapid fire questions
JS: Answers for DOM related Questions

html: Basic Questions for Begginers

15 basic questions and asnwers

Why do you need doctype? The doctype declaration should be the very first thing in an HTML document, before the tag. The doctype declaration is not an HTML tag; it is an instruction to the web browser about what version of the markup language the page is written in. The doctype declaration refers to a Document Type Definition (DTD).


What are data-* attributes used for? https://www.w3schools.com/tags/att_global_data.asp


How can you generate a public key in html?

  <form action="/action_page.php" method="get">
    Username: <input type="text" name="usr_name">
    Encryption: <keygen name="security">
    <input type="submit">
  </form> 
  The <keygen> tag specifies a key-pair generator field used for forms. When the form is submitted, the private key is stored locally, and the public key is sent to the server.
  
  https://www.w3schools.com/tags/tag_keygen.asp
  
  

How do you change the direction of html text?
How can you highlight text in html?
Can you apply css to a part of html document only?
Will a browser make http request for the following cases?
Which resource would be downloaded first?
What is an optional tag?
What are the differences between div and span?
How would you differentiate between div, section, and article?
How would you select svg or canvas for your site?
How to serve html in multiple languages?
Explain standard and quirks mode.
What is a semantic tag?
HTML: Answers for Basic Questions

JavaScript: LinkedList (part 4: work in process)

Very rough stage..need to finish (for intermediate)

JavaScript: search and Sort (part 5: work in process)

Very rough stage..need to finish (for expert)

JavaScript: Binary Search Tree (part 6: work in process)

Very rough stage..need to finish (for expert)

TODO list

CSS: Generate mock up from provided layout
JavaScript: Programming challenges for expert
HR related questions like
What is your weakness
Why are you leaving your current job
Tell me about a project that you weren't able to finish on time
How you resolve conflict among team members
How will you introduce a new technology to the team
Do you prefer to work individually or in a team
Sell this pen/coke/something to me
How much salary do you want
What you don't like you current job
What you like least in your current job
Tree Data Structure in JavaScript
Graph and high order data structure in JavaScript