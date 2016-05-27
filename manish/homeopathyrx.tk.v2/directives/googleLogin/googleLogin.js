(function() {
  //adding google login script
  var script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client.js';
  script.onload = function () {
      //do stuff with the script
  };
  
  document.head.appendChild(script);
  //ending google login script

  var moduleName = 'googleLoginModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('googleLogin', ['googleLoginTemplate', 'googleLoginService', 'configs', '$location', googleLogin])
    .provider('googleLoginTemplate', googleLoginTemplateProvider)
    .service('googleLoginService', ['$http', googleLoginService])
    ;
    
  function googleLoginService($http) {
    this.base_url = 'http://api.mkgalaxy.com/records.php';
    this.login = function(uid, token, details) {
      var url = this.base_url + '?action=login&saveIP=1&id='+uid+'&access_token='+token;
      var data = '&details[email]='+encodeURIComponent(details.email)+'&details[url]='+encodeURIComponent(details.url)+'&details[name]='+encodeURIComponent(details.name)+'&details[firstName]='+encodeURIComponent(details.firstName)+'&details[lastName]='+encodeURIComponent(details.lastName)+'&details[image]='+encodeURIComponent(details.image);
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
  
  function googleLogin(googleLoginTemplate, googleLoginService, configs, $location) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || googleLoginTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              var clientId = configs.clientId; 
              //'754890700194-4p5reil092esbpr9p3kk46pf31vkl3ub.apps.googleusercontent.com';
              var apiKey = configs.apiKey; //'AIzaSyCWqKxrgU8N1SGtNoD6uD6wFoGeEz0xwbs';
              var scopes = 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read';
              
              scope.access_token = null;
              var data = localStorage.getItem('userData');
              if (data) {
                scope.userData = JSON.parse(data);
                scope.$parent.$parent.userData = scope.userData;
                scope.$parent.userData = scope.userData;
              }
              
              scope.logout = function() {
                if (!gapi) {
                  return false; 
                }
                if (!gapi.auth) {
                  return false; 
                }
                  gapi.auth.signOut();
                  googleLoginService.logout(scope.userData.id, scope.userData.access_token);
                  
                  scope.userData = null;
                  scope.$parent.$parent.userData = null;
                  scope.$parent.userData = null;
                  localStorage.removeItem('userData');
              };
              
              scope.login = function () {
                if (!gapi) {
                  return false; 
                }
                if (!gapi.client) {
                  return false; 
                }
                handleClientLoad();
                handleAuthClick();
              };
              
              function handleClientLoad() {
                // Step 2: Reference the API key
                gapi.client.setApiKey(apiKey);
                //window.setTimeout(checkAuth,1);
              }
              
              function checkAuth() {
                gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
              }
              
              function handleAuthResult(authResult) {
                scope.access_token = authResult.access_token;
                //var authorizeButton = document.getElementById('authorize-button');
                if (authResult && !authResult.error) {
                  //authorizeButton.style.visibility = 'hidden';
                  makeApiCall();
                } else {
                  //authorizeButton.style.visibility = '';
                  //authorizeButton.onclick = handleAuthClick;
                }
              }
              
              function handleAuthClick(event) {
                // Step 3: get authorization to use private data
                gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
                return false;
              }
              
              // Load the API and make an API call.  Display the results on the screen.
              function makeApiCall() {
                // Step 4: Load the Google+ API
                gapi.client.load('plus', 'v1').then(function() {
                  // Step 5: Assemble the API request
                  var request = gapi.client.plus.people.get({
                    'userId': 'me'
                  });
                  // Step 6: Execute the API request
                  request.then(function(resp) {
              
                    scope.userData = {
                      id: resp.result.id,
                      uid: resp.result.id,
                      email: resp.result.emails[0].value,
                      url: resp.result.url,
                      name: resp.result.displayName,
                      firstName: resp.result.name.givenName,
                      lastName: resp.result.name.familyName,
                      image: resp.result.image.url,
                      access_token: scope.access_token,
                      token: scope.access_token,
                      username: resp.result.displayName,
                      user_details: {
                        fullname: resp.result.displayName
                      }
                    };
                    scope.$parent.$parent.userData = scope.userData;
                    scope.$parent.userData = scope.userData;
                    console.log(scope.userData);
                    if(!scope.$$phase) scope.$apply();
                    localStorage.setItem('userData', JSON.stringify(scope.userData));
                    googleLoginService.login(scope.userData.id, scope.access_token, scope.userData);
                  }, function(reason) {
                    console.log('Error: ' + reason.result.error.message);
                  });
                });
              }//end function 
              
          }//end link
      };//end return
  }
  
  
    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function googleLoginTemplateProvider() {
        var templatePath = 'directives/googleLogin/googleLogin.html';
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