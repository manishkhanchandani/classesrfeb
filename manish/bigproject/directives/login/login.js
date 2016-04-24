(function() {

  var moduleName = 'loginModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('login', ['loginTemplate', 'loginService', 'dataService', '$timeout', login])
    .directive('myProfile', ['dataService', '$timeout', myProfile])
    .provider('loginTemplate', loginTemplate)
    .service('loginService', [loginService])
    ;
    
  function loginService() {
    this.login = function() {
      
    };
    
    this.logout = function(uid, token) {
      
    };
  }
  
  
  function myProfile(dataService, $timeout) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/login/myProfile.html',
          link: function(scope, elem, attrs) {
            console.log(scope.userData);
          }
    }//end return
  }//end function
  
  function login(loginTemplate, loginService, dataService, $timeout) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || loginTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              var config = dataService.config();
              scope.ref = new Firebase(config.firebaseUrl);
              
              
              function refBy(response, uid)
              {
                scope.ref.child('users').child(uid).child('chain').set(response);
              }
  
              //saving user data
              scope.saveData = function(uid, provider, accessToken, displayName, email, id, image, url, firstName, lastName, gender) {
                var data = {uid: uid, provider: provider, accessToken: accessToken, displayName: displayName, email: email, id: id, image: image, url: url, firstName: firstName, lastName: lastName, gender: gender};
                scope.ref.child('users').child(uid).once("value", function(snapshot) {
                  var a = snapshot.exists();
                  if (!a) {
                    data.refBy = 'google:112913147917981568678';
                    data.timestamp = Firebase.ServerValue.TIMESTAMP;
                    var refStorage = localStorage.getItem('refStorage');
                    if (refStorage) {
                      data.refBy = refStorage;
                    }
                    
                    dataService.refChain(scope.ref, uid, refBy);
                  }
                  data.updated = Firebase.ServerValue.TIMESTAMP;
                  scope.userData = data;
                  scope.$parent.$parent.userData = data;
                  scope.$parent.userData = data;
                  localStorage.setItem('userData', JSON.stringify(scope.userData));
                  scope.ref.child('users').child(uid).update(data);
                  
                  $timeout(function(){
                    if(!scope.$$phase) scope.$apply();
                  });
                });
              };
              
              //twitter
              scope.twitter = function() {
                scope.ref.authWithOAuthPopup("twitter", function(error, authData) {
                  if (error) {
                    console.log("Authentication Failed!", error);
                  } else {
                    console.log("Authenticated successfully with payload:", authData);
                  }
                });  
              };
              //facebook
              scope.facebook = function() {
                scope.ref.authWithOAuthPopup("facebook", function(error, authData) {
                  if (error) {
                    console.log("Login Failed!", error);
                  } else {
                    //console.log("Authenticated successfully with payload:", authData);
                    scope.saveData(authData.uid, authData.provider, authData.facebook.accessToken, authData.facebook.displayName, authData.facebook.email, authData.facebook.id, authData.facebook.profileImageURL, authData.facebook.cachedUserProfile.link, authData.facebook.cachedUserProfile.first_name, authData.facebook.cachedUserProfile.last_name, authData.facebook.cachedUserProfile.gender);
                  }
                }, {
                  remember: "sessionOnly",
                  scope: "email,user_likes,public_profile,user_friends,user_about_me,user_birthday,user_photos"//https://developers.facebook.com/docs/facebook-login/permissions, https://www.firebase.com/docs/web/guide/login/facebook.html
                });
              };
              //github
              scope.github = function() {
                scope.ref.authWithOAuthPopup("github", function(error, authData) {
                  if (error) {
                    console.log("Login Failed!", error);
                  } else {
                    //console.log("Authenticated successfully with payload:", authData);
                    var tmp = authData.github.displayName.split(' ');
                    var fn = tmp[0];
                    var ln = tmp[1];
                    scope.saveData(authData.uid, authData.provider, authData.github.accessToken, authData.github.displayName, authData.github.email, authData.github.id, authData.github.profileImageURL, authData.github.cachedUserProfile.url, fn, ln, '');
                  }
                }, {
                  remember: "sessionOnly",
                  scope: "user,gist"
                });  
              };
              //annonymous
              scope.annonymous = function() {
                scope.ref.authAnonymously(function(error, authData) {
                  if (error) {
                    console.log("Login Failed!", error);
                  } else {
                    //console.log("Authenticated successfully with payload:", authData);
                    scope.saveData(authData.uid, authData.provider, authData.token, 'Anonymous', '', authData.uid, 'images/noimage.jpg', '', 'Anonymous', 'Anonymous', '');
                  }
                });
              };
              //google
              scope.google = function() {
                scope.ref.authWithOAuthPopup("google", function(error, authData) {
                    if (error) {
                      console.log("Login Failed!", error);
                      return;
                    }
                    scope.saveData(authData.uid, authData.provider, authData.google.accessToken, authData.google.displayName, authData.google.email, authData.google.id, authData.google.profileImageURL, authData.google.cachedUserProfile.link, authData.google.cachedUserProfile.given_name, authData.google.cachedUserProfile.family_name, authData.google.cachedUserProfile.gender);
                  }, {
                    remember: "sessionOnly",
                    scope: "email"
                  });//end authwithpopup  
              };
              
              scope.logout = function()
              {
                scope.ref.unauth();
                scope.userData = null;
                scope.$parent.$parent.userData = null;
                scope.$parent.userData = null;
                localStorage.removeItem('userData');
              }
              
          }//end link
      };//end return
  }
  
  
    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function loginTemplate() {
        var templatePath = 'directives/login/login.html';
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