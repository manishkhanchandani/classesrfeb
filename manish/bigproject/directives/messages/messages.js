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
    .directive('messages', ['messagesTemplate', 'configs', '$location', 'dataService', '$firebaseArray', '$timeout', '$routeParams', messages])
    .provider('messagesTemplate', messagesTemplateProvider)
    
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
  
  function messages(messagesTemplate, configs, $location, dataService, $firebaseArray, $timeout, $routeParams) {
    return {
          scope: {
            userData: '='
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
              //console.log('from user: ', scope.userData);
  
              if ($routeParams.uid) {
                if (scope.userData.id === $routeParams.uid) {
                  $location.path('/messages');
                  return;
                }
              }
              
              scope.routeParams = $routeParams;
              
              scope.badges = {};
              
              //firebase reference
              var host = $location.host();
              var ref = new Firebase(configs[host].firebaseUrl);
              var badge = ref.child('messagesBadges');
  
              //reset badge
              if ($routeParams.uid) {
                badge.child(scope.userData.id).child($routeParams.uid).child('badge').set(0);
              }
              
              //from user
              var usersFrom = ref.child('messagesUsers').child(scope.userData.id);
              var queryFrom = usersFrom.orderByChild("timestamp").limitToLast(500);
              scope.usersFrom = $firebaseArray(queryFrom);
  
              /*usersFrom.on('value', function(snapshot) {
                angular.forEach(snapshot.val(), function(value, key) {
                  badge.child(scope.userData.id).child(key).on("value", function(snapshot2) {
                    scope.badges[snapshot2.key()] = snapshot2.val();
                  });
                });
              });*/
              
              //to user
              if ($routeParams.uid) {
                var usersTo = ref.child('messagesUsers').child($routeParams.uid);
                
                var queryTo = usersTo.orderByChild("timestamp").limitToLast(500);
                scope.usersTo = $firebaseArray(queryTo);
                //adding from - to user
                usersTo.child(scope.userData.id).set({email: scope.userData.email, id: scope.userData.id, name: scope.userData.name, image: scope.userData.image, url: scope.userData.url, timestamp: Firebase.ServerValue.TIMESTAMP});
              }
              
              function getSuccess(response) {
                var results = response.data.data;
                scope.resultsToUser = results;
                //console.log('to user: ', scope.resultsToUser);
                //adding from - to user
                usersFrom.child($routeParams.uid).set({email: results.user_details.email, id: results.uid, name: results.user_details.name, image: results.user_details.image, url: results.user_details.url, timestamp: Firebase.ServerValue.TIMESTAMP});
              }
              
              function getFailure(response) {
                console.log('failure', response);
              }
              
              if ($routeParams.uid) {
                var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=user&id='+$routeParams.uid;
                dataService.get(url, getSuccess, getFailure, true);
              }
              
              
              //send message function
              scope.frm = {};
              
              //messages
              var mes = ref.child('messages');
              scope.messages = null;
              if ($routeParams.uid) {
                var queryMes = mes.child(scope.userData.id).child($routeParams.uid).orderByChild("timestamp").limitToLast(100);
                scope.messages = $firebaseArray(queryMes);
              }
              
              //badge
              badge.child(scope.userData.id).on("value", function(snapshot) {
                angular.forEach(snapshot.val(), function (value, key) {
                  scope.badges[key] = value;
                });
                //if(!scope.$$phase) scope.$apply();
                $timeout(function(){
                    //any code in here will automatically have an apply run afterwards
                    if(!scope.$$phase) scope.$apply();
                });
              });
              //badge ends
                            
              scope.sendMessage = function(fid, tid, name, image) {
                //type: 2 = sent, 1 = received
                var newPostRef = mes.child(tid).child(fid).push({message: scope.frm.message, timestamp: Firebase.ServerValue.TIMESTAMP, type: 1, name: name, image: image, read: false});
                var postID = newPostRef.key();
                mes.child(fid).child(tid).child(postID).set({message: scope.frm.message, timestamp: Firebase.ServerValue.TIMESTAMP, type: 2, name: name, image: image});
                
                scope.frm.message = '';
                //badge
                badge.child(fid).child(tid).child('badge').set(0);
                
                badge.child(tid).child(fid).child('badge').transaction(function(currentValue) {
                    return (currentValue||0) + 1
                }, function(err, committed, ss) {
                    if( err ) {
                       console.log('error: ', err);
                    }
                    else if( committed ) {
                       // if counter update succeeds, then create record
                       // probably want a recourse for failures too
                       badge.child(tid).child(fid).child('badge').set(ss.val()); 
                    }
                });
              };//badge ends
              
              //delete message
              scope.deleteMessage = function(message) {
                var a = confirm('Do you really want to delete this message?');
                if (!a) return;
                mes.child(scope.userData.id).child($routeParams.uid).child(message.$id).remove();
                //badge
                badge.child(scope.userData.id).child($routeParams.uid).child('badge').set(0);
              };
              //end delete message
              
              
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