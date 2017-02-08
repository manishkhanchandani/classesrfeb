(function() {

  var moduleName = 'googleLoginFBModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, ['firebase', 'ngCookies']);
  }
  
  module
    .directive('googleLoginfb', ['googleLoginTemplatefb', 'googleLoginServicefb', '$location', '$cookies', 'configs', googleLoginFB])
    .directive('googleLoginUserList', ['dataService', '$filter', 'configs', googleLoginUserList])
    .provider('googleLoginTemplatefb', googleLoginTemplateProviderFB)
    .service('googleLoginServicefb', ['$cookies', 'configs', googleLoginServiceFB])
    ;
    
  function googleLoginServiceFB($cookies, configs) {
    var MainRef = firebase.database().ref(configs.firebaseDirectory);
    this.login = function(details) {
      var userId = firebase.auth().currentUser.uid;
      MainRef.child('/users/' + userId).once('value').then(function(snapshot) {
        var a = snapshot.exists();
        if (!a) {
          details.created_dt = firebase.database.ServerValue.TIMESTAMP;
          details.updated_dt = firebase.database.ServerValue.TIMESTAMP;
        } else {
          details.updated_dt = firebase.database.ServerValue.TIMESTAMP;
        }
        var ipDetails = null;
        if ($cookies.get('ipDetails')) {
          ipDetails = JSON.parse($cookies.get('ipDetails'));
        }
        
        details.ipDetails = ipDetails;
        console.log(details);
        MainRef.child('/users/' + userId).update(details);
        MainRef.child('/accessTokens/' + btoa(details.token)).set(details);
      });
      
    };
    
  }
  
  function googleLoginUserList(dataService, $filter, configs) {
    return {
          scope: {
            userData: '=',
            url: '@',
            lat: '@',
            lng: '@',
            city: '@'
          },
          templateUrl: 'directives/googleLoginFB/loggedInUsers.html',
          link: function(scope, elem, attrs) {
            var MainRef = firebase.database().ref(configs.firebaseDirectory);
            var ref = MainRef.child('/connectedUsers');
            if (scope.userData && scope.userData.uid) {
              ref.child(scope.userData.uid).onDisconnect().remove();
            }//end if ondisconnect
            scope.data = null;
            ref.orderByValue().on('value', function(snapshot) {
              if (snapshot.val()) {
                scope.data = {};
                angular.forEach(snapshot.val(), function(value, key) {
                  var loggedInTime = value;
                  var uid = key;
                  MainRef.child('/users').child(uid).once('value', function (snapshotUser) {
                    var a = snapshotUser.exists();
                    if (!a) {
                      return;
                    }
                    scope.data[uid] = {};
                    scope.data[uid] = snapshotUser.val();
                    scope.data[uid].loggedInTime = loggedInTime;
                    
                    var lat = null;
                    var lng = null;
                    scope.data[uid].location = '';
                    if (scope.data[uid].ipDetails) {
                      lat = scope.data[uid].ipDetails.lat;
                      lng = scope.data[uid].ipDetails.lng;
                    }//end if lat and lng
                    
                    if (scope.data[uid].ipDetails) {
                      scope.data[uid].location = scope.data[uid].ipDetails.city + ', ' + scope.data[uid].ipDetails.region;
                    }//end if location
                    
                    //get lat lng location from profile
                    if (scope.data[uid].profile) {
                      var address = JSON.parse(scope.data[uid].profile.address);
                      lat = scope.data[uid].profile.lat;
                      lng = scope.data[uid].profile.lng;
                      scope.data[uid].location = address.sn.city + ', ' + address.sn.state + ' - '+address.sn.county;
                    }//end if
                    
                    var distance = null;
                    if (scope.lat && scope.lng && lat && lng) {
                      distance = dataService.distance(scope.lat, scope.lng, lat, lng);
                      //distance = $filter('number')(distance, 2);
                    }
                    scope.data[uid].distance = distance;
                    
                    
                    if(!scope.$$phase) scope.$apply();
                  });
                });
              }
            });
                
              
          }//end link
      };//end return
  }
  
  function googleLoginFB(googleLoginTemplate, googleLoginService, $location, $cookies, configs) {
    return {
          scope: {
            userData: '=',
            userToken: '=',
            url: '@'
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || googleLoginTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              var MainRef = firebase.database().ref(configs.firebaseDirectory);
              function setCookie()
              {
                  $cookies.put('provider', scope.userData.provider);
                  $cookies.put('email', scope.userData.email);
                  $cookies.put('uid', scope.userData.uid);
                  $cookies.put('displayName', scope.userData.displayName);
                  $cookies.put('photoURL', scope.userData.photoURL);
                  $cookies.put('providerUID', scope.userData.providerUID);
              }
              
              function removeCookie()
              {
                  $cookies.remove('userToken');
                  $cookies.remove('provider');
                  $cookies.remove('email');
                  $cookies.remove('uid');
                  $cookies.remove('displayName');
                  $cookies.remove('photoURL');
                  $cookies.remove('providerUID');
                  $cookies.remove('provider');
                  $cookies.remove('ipDetails')
              }
  
              function initApp() {
                firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    console.log('user: ', user);
                    scope.userData = {};
                    
                    // The signed-in user info.
                    scope.userData.email = user.providerData[0].email;
                    scope.userData.uid = user.uid;
                    scope.userData.displayName = user.providerData[0].displayName;
                    scope.userData.photoURL = user.providerData[0].photoURL;
                    setCookie();
                    
                    scope.currentUser = scope.userData.uid; MainRef.child('/connectedUsers').child(scope.currentUser).set(firebase.database.ServerValue.TIMESTAMP);
                    if (!scope.userData.displayName) {
                      MainRef.child('/users/' + scope.currentUser).once('value').then(function(snapshot) {
                        var a = snapshot.exists();
                        if (!a) {
                          return;
                        }
                        var ud = snapshot.val();
                        scope.userData.displayName = ud.displayName;
                        scope.userData.provider = ud.provider;
                        scope.userData.photoURL = ud.photoURL;
                        scope.userData.providerUID = ud.providerUID;
                        setCookie();
                      });
                    }//end if displayname is missing
                    
                    if(!scope.$$phase) scope.$apply();
                  } else {
                    scope.userData = null;
                    // User is signed out.
                    console.log('user is signed out');
                    if (scope.currentUser) {
                      MainRef.child('/connectedUsers').child(scope.currentUser).remove();
                    }
                    
                  }
                }, function(error) {
                  console.log('err: ', error);
                });
              };

              initApp();
              
              scope.logout = function() {
                MainRef.child('/accessTokens/' + btoa(localStorage.getItem('userToken'))).remove();
                scope.userData = null;
                firebase.auth().signOut();
                localStorage.removeItem('userData');
                localStorage.removeItem('userToken');
                removeCookie();
                window.location.href = scope.url;
                //$location.path('/');
              };
            
              function createUserData(uid, input, token) {
                scope.userData = {};
                scope.userData.provider = input.providerId;
                // The signed-in user info.
                scope.userData.email = input.email;
                scope.userData.uid = uid;
                scope.userData.displayName = input.displayName;
                scope.userData.photoURL = input.photoURL;
                scope.userData.providerUID = input.uid;
                scope.userToken = token;
                $cookies.put('userToken', token);
                setCookie();
                localStorage.setItem('userData', JSON.stringify(scope.userData));
                localStorage.setItem('userToken', scope.userToken);
                return scope.userData;
              }
              
              function login(provider) {
                firebase.auth().signInWithPopup(provider).then(function(result) {
                  createUserData(result.user.uid, result.user.providerData[0], result.credential.accessToken);
                  if(!scope.$$phase) scope.$apply();
                  var ud = scope.userData;
                  ud.token = result.credential.accessToken;
                  googleLoginService.login(ud);
                  // ...
                }).catch(function(error) {
                  scope.userData = null;
                  console.log('error22: ', error);
                  alert(error.message);
                });
              }
              //login through google
              scope.googleLogin = function() {
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                login(provider);
              };//end google login

              //login through facebook
              scope.facebookLogin = function() {
                var provider = new firebase.auth.FacebookAuthProvider();
                provider.addScope('public_profile');
                provider.addScope('email');
                provider.addScope('user_likes');
                provider.addScope('user_friends');
                provider.addScope('user_birthday');
                login(provider);
              };//end facebook login

              //login through twitter
              scope.twitterLogin = function() {
                var provider = new firebase.auth.TwitterAuthProvider();
                login(provider);
              };//end twitter login

              //login through github
              scope.githubLogin = function() {
                var provider = new firebase.auth.GithubAuthProvider();
                provider.addScope('repo');
                login(provider);
              };//end github login
            
              
          }//end link
      };//end return
  }
  
  
    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function googleLoginTemplateProviderFB() {
        var templatePath = 'directives/googleLoginFB/googleLoginFB.html';
        this.setPath = function(path) {
            templatePath = path;
        };
        this.$get = function() {
            return {
                getPath: function() {
                    return templatePath;
                }
            };
        };
    }

}());