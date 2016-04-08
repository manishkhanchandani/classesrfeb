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
    .directive('login', ['loginTemplate', 'loginService', 'configs', '$location', login])
    .provider('loginTemplate', loginTemplate)
    .service('loginService', [loginService])
    ;
    
  function loginService() {
    this.login = function() {
      
    };
    
    this.logout = function(uid, token) {
      
    };
  }
  
  function login(loginTemplate, loginService, configs, $location) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || loginTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              scope.ref = new Firebase(configs[$location.host()].firebaseUrl);
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
                    console.log("Authenticated successfully with payload:", authData);
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
                    console.log("Authenticated successfully with payload:", authData);
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
                    console.log("Authenticated successfully with payload:", authData);
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
                    console.log(authData);
                  }, {
                    remember: "sessionOnly",
                    scope: "email"
                  });//end authwithpopup  
              };
              
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