(function() {

  var moduleName = 'googleLoginFBModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('googleLoginfb', ['googleLoginTemplatefb', 'googleLoginServicefb', 'configs', '$location', googleLoginFB])
    .provider('googleLoginTemplatefb', googleLoginTemplateProviderFB)
    .service('googleLoginServicefb', ['$http', googleLoginServiceFB])
    ;
    
  function googleLoginServiceFB($http) {
    this.base_url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php';
    this.login = function(uid, token, details) {
      var url = this.base_url + '?action=login&saveIP=1&id='+uid+'&access_token='+token;
      var data = '&details[email]='+encodeURIComponent(details.email)+'&details[url]='+encodeURIComponent(details.url)+'&details[name]='+encodeURIComponent(details.name)+'&details[firstName]='+encodeURIComponent(details.firstName)+'&details[lastName]='+encodeURIComponent(details.lastName)+'&details[image]='+encodeURIComponent(details.image)+'&details[username]='+encodeURIComponent(details.username)+'&details[gender]='+encodeURIComponent(details.gender);
      $http({
        method: 'POST',
        url: url,
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
          //callback(response);
        }, function errorCallback(response) {
          console.log('error call back');
          console.log(response);
        });
    };
    
    this.logout = function(uid, token) {
      var url = this.base_url + '?action=logout&saveIP=1&id='+uid+'&access_token='+token;
      $http({
        method: 'GET',
        url: url
      }).then(function successCallback(response) {
          //callback(response);
        }, function errorCallback(response) {
          console.log('error call back');
          console.log(response);
        });
    };
  }
  
  function googleLoginFB(googleLoginTemplate, googleLoginService, configs, $location) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || googleLoginTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              scope.ref = new Firebase(configs[$location.host()].firebaseUrl);
              scope.access_token = null;
              var data = localStorage.getItem('userData');
              if (data) {
                scope.userData = JSON.parse(data);
                scope.$parent.$parent.userData = scope.userData;
                scope.$parent.userData = scope.userData;
              }
              
              scope.logout = function() {
                scope.ref.unauth();
                googleLoginService.logout(scope.userData.id, scope.userData.access_token);
                
                scope.userData = null;
                scope.$parent.$parent.userData = null;
                scope.$parent.userData = null;
                localStorage.removeItem('userData');
              };
              
              scope.login = function () {
                  scope.ref.authWithOAuthPopup("google", function(error, authData) {
                    if (error) {
                      console.log("Login Failed!", error);
                      return;
                    }
                    var uid = authData.uid;
                    scope.userData = {
                      id: authData.google.id,
                      uid: authData.google.id,
                      email: authData.google.email,
                      url: authData.google.cachedUserProfile.link,
                      name: authData.google.displayName,
                      image: authData.google.profileImageURL,
                      access_token: authData.google.accessToken,
                      token: authData.google.accessToken,
                      username: authData.google.displayName,
                      user_details: {
                        fullname: authData.google.displayName,
                      },
                      firstName: authData.google.cachedUserProfile.given_name,
                      lastName: authData.google.cachedUserProfile.family_name,
                      gender: authData.google.cachedUserProfile.gender
                    };
                    scope.$parent.$parent.userData = scope.userData;
                    scope.$parent.userData = scope.userData;
                    if(!scope.$$phase) scope.$apply();
                    localStorage.setItem('userData', JSON.stringify(scope.userData));
                    googleLoginService.login(scope.userData.id, scope.userData.token, scope.userData);
                  }, {
                    remember: "sessionOnly",
                    scope: "email"
                  });//end authwithpopup
              };//login
              
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