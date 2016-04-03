(function() {

  var moduleName = 'messagesModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('messages', ['messagesTemplate', 'messagesService', 'configs', '$location', messages])
    .provider('messagesTemplate', messagesTemplateProvider)
    .service('messagesService', ['$http', messagesService])
    ;
    
  function messagesService($http) {
    this.base_url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php';
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
  
  function messages(messagesTemplate, messagesService, configs, $location) {
    return {
          scope: {
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || googleLoginTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              
              
          }//end link
      };//end return
  }
  
  
    /**
     * This provider allows global configuration of the template path used by the dir-pagination-controls directive.
     */
    function messagesTemplateProvider() {
        var templatePath = 'directives/messages/messages.html';
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