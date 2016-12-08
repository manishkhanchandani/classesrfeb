'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'pascalprecht.translate',
  'myApp.view1',
  'firebase',
  'googleLoginFBModule'
  //'ui.bootstrap'
])

.factory('MyErrorHandler', function ($q, $log) {
  return function (part, lang, response) {
    $log.error('The "' + part + '/' + lang + '" part was not loaded.');
    return $q.when({});
  };
})

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  //$locationProvider.html5Mode(true);
}])

.config(['$translateProvider', '$translatePartialLoaderProvider', function($translateProvider, $translatePartialLoaderProvider) {
  //different language files can be defined here as part
  $translatePartialLoaderProvider.addPart('a');
  $translatePartialLoaderProvider.addPart('b');
  //useloader to hand the template for translation
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/i18n/{lang}/{part}.json',
    loadFailureHandler: 'MyErrorHandler'
  });
  var prefLang = localStorage.getItem('preferredLanguage');
  if (!prefLang) prefLang = 'us-en';
  $translateProvider.preferredLanguage(prefLang);
}])

.controller('mainController', ['$scope', '$translate', '$routeParams', function($scope, $translate, $routeParams) {
  //firebase init
  // Initialize the Firebase SDK
  var config = {
    apiKey: 'AIzaSyDnERUhALUFNxWZsjaLpT4_nqIYW2i2jDU',
    authDomain: 'mkgxy-3d7ce.firebaseapp.com',
    databaseURL: 'https://mkgxy-3d7ce.firebaseio.com/',
    storageBucket: 'mkgxy-3d7ce.appspot.com'
  };
  firebase.initializeApp(config);
  //end firebase
  
  //language change
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    localStorage.setItem('preferredLanguage', langKey);
    
    var tmp = langKey.split('-');
    $scope.country = tmp[0];
    $scope.language = tmp[1];
  };//end function changeLanguage
  
  $scope.country = 'us';
  $scope.language = 'en';
  
  //check language based on routeParams and change if needed
  $scope.checkLanguage = function(params) {
    if (!(params.country && params.language)) {
      return;
    }//end if
    
    $scope.country = params.country;
    $scope.language = params.language;
    
    var langKey = params.country + '-' + params.language;
    if (!(langKey === 'us-en' || langKey === 'us-es' || langKey === 'ca-en' || langKey === 'ca-fr')) {
      langKey = 'us-en';
    }
    $scope.changeLanguage(langKey);
  };//end function checkLanguage
  
  //ip
  /*$scope.ipDetails = null;
  function getIpDetails(res) {
    $scope.ipDetails = res.data.data.result;
    dataService.get('http://api.mkgalaxy.com/api.php?action=nearby&lat='+$scope.ipDetails.lat+'&lng='+$scope.ipDetails.lng, function(response) {
      $scope.ipDetails.nearby = [];
      angular.forEach(response.data.data, function (value, key) {
        value.distance = parseFloat(value.distance);
        $scope.ipDetails.nearby.push(value);
      });
    }, function(error) {console.log('error: ', error);}, true);
  }
  dataService.ip(getIpDetails);*/
  //end ip
  
  
  $scope.userData = null;
  
  function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.userData = {};
        $scope.userData.provider = user.providerData[0].providerId;
        // The signed-in user info.
        $scope.userData.email = user.providerData[0].email;
        $scope.userData.uid = user.uid;
        $scope.userData.displayName = user.providerData[0].displayName;
        $scope.userData.photoURL = user.providerData[0].photoURL;
        $scope.userData.providerUID = user.providerData[0].uid;
        console.log('user: ', $scope.userData);
        if(!$scope.$$phase) $scope.$apply();
      } else {
        // User is signed out.
        console.log('signed out');
      }
    }, function(error) {
      console.log('err: ', error);
    });
  };
  
  initApp();
  
  /*function login(provider, type) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      $scope.userData = {};
      console.log(result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      $scope.userData.token = token;
      $scope.userData.provider = result.credential.provider;
      // The signed-in user info.
      $scope.userData.email = result.user.email;
      $scope.userData.uid = result.user.uid;
      $scope.userData.displayName = result.user.displayName;
      $scope.userData.photoURL = result.user.photoURL;
      $scope.userData.providerUID = result.user.providerData[0].uid;
      $scope.userData.type = type;
      console.log($scope.userData);
      // ...
    }).catch(function(error) {
      $scope.userData = null;
      console.log('error: ', error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  //login through google
  $scope.googleLogin = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    login(provider, 'google');
  };//end google login
  
  //login through facebook
  $scope.facebookLogin = function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    login(provider, 'facebook');
  };//end facebook login
  
  //login through twitter
  $scope.twitterLogin = function() {
    var provider = new firebase.auth.TwitterAuthProvider();
    login(provider, 'twitter');
  };//end twitter login
  
  //login through github
  $scope.githubLogin = function() {
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    login(provider, 'github');
  };//end github login
  */
  
}])