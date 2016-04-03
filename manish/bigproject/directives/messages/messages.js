(function() {

  var moduleName = 'messagesModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, ['firebase']);
  }
  
  module
    .directive('messages', ['messagesTemplate', 'messagesService', 'configs', '$location', 'dataService', '$firebaseArray', messages])
    .provider('messagesTemplate', messagesTemplateProvider)
    .service('messagesService', ['$http', messagesService])
    
    .filter('mesDaysAgo', function() {
      return function(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        
        var interval = Math.floor(seconds / 31536000);
        
        if (interval > 1) {
          return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
      };
    })

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
  
  function messages(messagesTemplate, messagesService, configs, $location, dataService, $firebaseArray) {
    return {
          scope: {
            userData: '=',
            routeParams: '='
          },
          templateUrl: function(elem, attrs) {
            return attrs.templateUrl || messagesTemplate.getPath();
          },
          link: function(scope, elem, attrs) {
              if (!scope.userData) {
                 alert('Please login first to send message');
                 window.history.back();
                 return;
              }
              console.log('from user: ', scope.userData);
  
              if (scope.routeParams.uid) {
                if (scope.userData.id === scope.routeParams.uid) {
                  $location.path('/messages');
                  return;
                }
              }
              
              //firebase reference
              var host = $location.host();
              var ref = new Firebase(configs[host].firebaseUrl);
  
              //from user
              var usersFrom = ref.child('users').child(scope.userData.id);
              var queryFrom = usersFrom.orderByChild("timestamp").limitToLast(500);
              scope.usersFrom = $firebaseArray(queryFrom);
  
              //to user
              if (scope.routeParams.uid) {
                var usersTo = ref.child('users').child(scope.routeParams.uid);
                var queryTo = usersTo.orderByChild("timestamp").limitToLast(500);
                scope.usersTo = $firebaseArray(queryTo);
                //adding from - to user
                usersTo.child(scope.userData.id).set({email: scope.userData.email, id: scope.userData.id, name: scope.userData.name, image: scope.userData.image, url: scope.userData.url, timestamp: Firebase.ServerValue.TIMESTAMP});
              }
              
              function getSuccess(response) {
                var results = response.data.data;
                scope.resultsToUser = results;
                console.log('to user: ', scope.resultsToUser);
                //adding from - to user
                usersFrom.child(scope.routeParams.uid).set({email: results.user_details.email, id: results.uid, name: results.user_details.name, image: results.user_details.image, url: results.user_details.url, timestamp: Firebase.ServerValue.TIMESTAMP});
              }
              
              function getFailure(response) {
                console.log('failure', response);
              }
              
              if (scope.routeParams.uid) {
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=user&id='+scope.routeParams.uid;
                dataService.get(url, getSuccess, getFailure, true);
              }
              
              
              //send message function
              scope.frm = {};
              
              //messages
              var mes = ref.child('messages');
              var badge = ref.child('badges');
              var queryMes = mes.child(scope.userData.id).child(scope.routeParams.uid).orderByChild("timestamp").limitToLast(100);
              scope.messages = $firebaseArray(queryMes);
              
              scope.sendMessage = function(fid, tid, name, image) {
                //type: 2 = sent, 1 = received
                var newPostRef = mes.child(tid).child(fid).push({message: scope.frm.message, timestamp: Firebase.ServerValue.TIMESTAMP, type: 1, name: name, image: image, read: false});
                var postID = newPostRef.key();
                mes.child(fid).child(tid).child(postID).set({message: scope.frm.message, timestamp: Firebase.ServerValue.TIMESTAMP, type: 2, name: name, image: image});
                
                scope.frm.message = '';
                //badge
                badge.child(tid).child(fid).transaction(function(currentValue) {
                    return (currentValue||0) + 1
                }, function(err, committed, ss) {
                    if( err ) {
                       console.log('error: ', err);
                    }
                    else if( committed ) {
                       // if counter update succeeds, then create record
                       // probably want a recourse for failures too
                       badge.child(tid).child(fid).set(ss.val()); 
                    }
                });
              };//badge ends
              
              
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