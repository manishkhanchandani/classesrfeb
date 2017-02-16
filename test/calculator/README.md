npm init
npm install bower --save-dev

create a new folder app
go inside that

type:
bower init

bower install angular --save

app
index.html
js/app.js

index.html

<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<title>Sample Application</title>
<script src="bower_components/angular/angular.js"></script>
<script src="js/app.js"></script>
</head>

<body ng-controller="CalculatorController">
{{title}}
</body>
</html>

app.js
var myApp = angular.module('myApp', [])

.controller('CalculatorController', ['$scope', function($scope) {
  $scope.title = 'testing';
}]);

root folder

sudo npm install karma-cli phantomjs -g
karma --version
phantomjs --version

npm install karma jasmine --save-dev

inside app folder
bower install angular-mocks --save


create folder js/test and then js/test/unit

and go to inside app/js/test and run 
karma init


Answer as follows
Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> jasmine

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> PhantomJS
> 

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> 

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
> 

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes

----------------------

change the files in karma.config.js to as follows:
// list of files / patterns to load in the browser
    files: [
      '../../bower_components/angular/angular.js',
      '../../bower_components/angular-mocks/angular-mocks.js',
      '../app.js',
      'unit/*.js'
    ],


now go to test folder in terminal and type:

karma start karma.conf.js

add one file in unit folder (testingAngularUnitSpec.js) and check the terminal.

open this file testingAngularUnitSpec.js and write following jasmine test

describe('Testing AngularJS Test Suite', function() {
  describe('Testing AngularJS Controller', function() {
    
    it('should initialize the title in the scope', function() {
      module('myApp');
      
      var scope = {};
      var ctrl;
      
      inject(function($controller) {
        ctrl = $controller('CalculatorController', {$scope:scope});
      });
      
      expect(scope.title).toBeDefined();
      expect(scope.title).toBe('testing')
    });
    
  });
});


and see the changes in terminal

----------------

Before and After


describe('Testing AngularJS Test Suite', function() {
  
  beforeEach(module('myApp'));//before each test

  describe('Testing AngularJS Controller', function() {
    
      var scope = {};
      var ctrl;
    
    beforeEach(inject(function($controller) {
        ctrl = $controller('CalculatorController', {$scope:scope});
      }));
    
    afterEach(function() {
      //cleanup code
      
    });
    
    it('should initialize the title in the scope', function() {
      expect(scope.title).toBeDefined();
      expect(scope.title).toBe('testing');
    });
    
  });
});






