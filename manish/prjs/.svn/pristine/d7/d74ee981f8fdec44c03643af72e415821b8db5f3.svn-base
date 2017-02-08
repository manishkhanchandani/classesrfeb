(function() {

  var moduleName = 'messagesModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, ['firebase', 'ngSanitize']);
  }
  
  module
    .directive('messages', ['messagesTemplate', '$firebaseArray', '$timeout', 'configs', messages])
    .directive('messagesCounter', ['$timeout', 'configs', messagesCounter])
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
  
  function messagesCounter($timeout, configs) {
    
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/messages/messagesCounter.html',
          link: function(scope, elem, attrs) {
            var MainRef = firebase.database().ref(configs.firebaseDirectory);
            if (!scope.userData) return;
            var ref = MainRef.child('messages');
            var badge = ref.child('messagesBadges').child(scope.userData.uid);
            scope.counter = 0;
            badge.on('value', function(snapshot) {
              scope.counter = 0;
              if (!snapshot.val()) return;
              angular.forEach(snapshot.val(), function(value, key) {
                scope.counter = scope.counter + value.badge;
              });
              $timeout(function(){
                if(!scope.$$phase) scope.$apply();
              });
            });
          }
    };
  }
  
  function messages(messagesTemplate, $firebaseArray, $timeout, configs) {
    return {
          scope: {
            userData: '=',
            toUserId: '@',
            url: '@'
          },
          templateUrl: 'directives/messages/messages.html',
          link: function(scope, elem, attrs) {
            var MainRef = firebase.database().ref(configs.firebaseDirectory);
            var uid = scope.toUserId;
              if (!scope.userData) {
                 alert('Please login first to send message');
                 window.history.back();
                 return;
              }
  
              if (uid) {
                if (scope.userData.uid === uid) {
                  alert('You cannot send message to yourself.');
                  window.history.back();
                  return;
                }
              }
              
              
              scope.badges = {};
              
              //firebase reference
              var config = '';
              var ref = MainRef.child('messages');
              var badge = ref.child('messagesBadges');
  
              //reset badge
              if (uid) {
                badge.child(scope.userData.uid).child(uid).child('badge').set(0);
              }
              
              //from user
              var usersFrom = ref.child('messagesUsers').child(scope.userData.uid);
              var queryFrom = usersFrom.orderByChild("timestamp").limitToLast(500);
              scope.usersFrom = $firebaseArray(queryFrom);
  
              /*usersFrom.on('value', function(snapshot) {
                angular.forEach(snapshot.val(), function(value, key) {
                  badge.child(scope.userData.uid).child(key).on("value", function(snapshot2) {
                    scope.badges[snapshot2.key()] = snapshot2.val();
                  });
                });
              });*/
              
              //to user
              if (uid) {
                var usersTo = ref.child('messagesUsers').child(uid);
                
                var queryTo = usersTo.orderByChild("timestamp").limitToLast(500);
                scope.usersTo = $firebaseArray(queryTo);
                //adding from - to user
                usersTo.child(scope.userData.uid).set({email: scope.userData.email, id: scope.userData.uid, name: scope.userData.displayName, image: scope.userData.photoURL, timestamp: firebase.database.ServerValue.TIMESTAMP});
                
                MainRef.child('users').child(uid).once("value", function(snapshot) {
                  var a = snapshot.exists();
                  if (!a) {
                    return;
                  }
                  scope.resultsToUser = snapshot.val();
                  
                  //adding from - to user
                  var d = {email: scope.resultsToUser.email, id: scope.resultsToUser.uid, name: scope.resultsToUser.displayName, image: scope.resultsToUser.photoURL, timestamp: firebase.database.ServerValue.TIMESTAMP};
                  usersFrom.child(uid).set(d);
                  $timeout(function(){
                    if(!scope.$$phase) scope.$apply();
                  });
                });
              }
              
              
              //send message function
              scope.frm = {};
              
              //messages
              var mes = ref.child('messages');
              var mesBackup = ref.child('messagesBackup');
              scope.messages = null;
              if (uid) {
                var queryMes = mes.child(scope.userData.uid).child(uid).orderByChild("timestamp").limitToLast(100);
                scope.messages = $firebaseArray(queryMes);
              }
              
              //badge
              badge.child(scope.userData.uid).on("value", function(snapshot) {
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
                var newPostRef = mes.child(tid).child(fid).push({message: scope.frm.message, timestamp: firebase.database.ServerValue.TIMESTAMP, type: 1, name: name, image: image, read: false});
                var postID = newPostRef.key;
                mes.child(fid).child(tid).child(postID).set({message: scope.frm.message, timestamp: firebase.database.ServerValue.TIMESTAMP, type: 2, name: name, image: image});
                
                mesBackup.child(tid).child(fid).child(postID).set({message: scope.frm.message, timestamp: firebase.database.ServerValue.TIMESTAMP, type: 1, name: name, image: image, read: false});
                mesBackup.child(fid).child(tid).child(postID).set({message: scope.frm.message, timestamp: firebase.database.ServerValue.TIMESTAMP, type: 2, name: name, image: image});
                
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
                mes.child(scope.userData.uid).child(uid).child(message.$id).remove();
                //badge
                badge.child(scope.userData.uid).child(uid).child('badge').set(0);
              };
              //end delete message
              
              
              scope.deleteMessageProfile = function(tid) {
                console.log(tid);
                var a = confirm('Do you really want to delete this profile?');
                if (!a) return;
                //message
                mes.child(scope.userData.uid).child(tid).remove();
                //badge
                badge.child(scope.userData.uid).child(tid).remove();
                //user
                ref.child('messagesUsers').child(scope.userData.uid).child(tid).remove();
                if (uid === tid) {
                  //$location.path('/messages');
                  window.location.href = scope.url;
                }
              };
              
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