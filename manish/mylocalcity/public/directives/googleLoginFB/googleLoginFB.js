(function() {

  var moduleName = 'googleLoginFBModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, ['firebase']);
  }
  
  module
    .directive('googleLoginfb', ['googleLoginTemplatefb', 'googleLoginServicefb', '$location', googleLoginFB])
    .provider('googleLoginTemplatefb', googleLoginTemplateProviderFB)
    .service('googleLoginServicefb', ['$http', googleLoginServiceFB])
    ;
    
  function googleLoginServiceFB($http) {
    this.base_url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php';
    this.login = function(details) {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var a = snapshot.exists();
        if (!a) {
          details.created_dt = firebase.database.ServerValue.TIMESTAMP;
          details.updated_dt = firebase.database.ServerValue.TIMESTAMP;
        } else {
          details.updated_dt = firebase.database.ServerValue.TIMESTAMP;
        }
        firebase.database().ref('/users/' + userId).update(details);
      });
      
    };
    
  }
  
  function googleLoginFB(googleLoginTemplate, googleLoginService, $location) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || googleLoginTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              
              scope.logout = function() {
                scope.userData = null;
                firebase.auth().signOut();
              };
            
              function createUserData(uid, input) {
                scope.userData = {};
                scope.userData.provider = input.providerId;
                // The signed-in user info.
                scope.userData.email = input.email;
                scope.userData.uid = uid;
                scope.userData.displayName = input.displayName;
                scope.userData.photoURL = input.photoURL;
                scope.userData.providerUID = input.uid;
                return scope.userData;
              }
              
              function login(provider) {
                firebase.auth().signInWithPopup(provider).then(function(result) {
                  createUserData(result.user.uid, result.user.providerData[0]);
                  if(!scope.$$phase) scope.$apply();
                  googleLoginService.login(scope.userData);
                  // ...
                }).catch(function(error) {
                  scope.userData = null;
                  console.log('error: ', error);
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