(function() {
  var moduleName = 'advertisementModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('advertisments', ['dataService', '$firebaseArray', '$interval', advertisements]);
    

  function advertisements(dataService, $firebaseArray, $interval) {
    return {
          scope: {
            userData: '=',
            namespace: '@',
            ref: '=',
            numOfRows: '@'
          },
          templateUrl: 'directives/advertisements/advertisements.html',
          link: function(scope, elem, attrs) {
            scope.adFrm = {};
            scope.adError = null;
            if (!scope.namespace) {
              scope.namespace = 'mainSpace';  
            }//end if
            scope.adRefTmp  = $firebaseArray(scope.ref.child('advertisements').child(scope.namespace).child('recordsTmp'));
            scope.adRef  = $firebaseArray(scope.ref.child('advertisements').child(scope.namespace).child('records'));
            scope.adRefInactive  = $firebaseArray(scope.ref.child('advertisements').child(scope.namespace).child('recordsInactive'));
            scope.adRefMy  = $firebaseArray(scope.ref.child('advertisements').child(scope.namespace).child('recordsMy'));
            
            scope.adResults = null;
            scope.adResultsNum = null;
            refreshAds = function() {
              scope.ref.child('advertisements').child(scope.namespace).child('records').orderByChild("timestamp").limitToLast(500).once('value', function (snapshot) {
                scope.adResults = [];
                angular.forEach(snapshot.val(), function(value, key) {
                  scope.adResults.push(value);
                });
                var num = parseInt(scope.numOfRows);
                if (scope.adResults.length < num) {
                  num = scope.adResults.length;  
                }
                scope.adResultsNum = array_rand(scope.adResults, num);
                console.log(scope.adResultsNum);
              });
            };//$scope.refreshAds
            var stop = $interval(refreshAds, 30000);
            refreshAds();
            
            
            //location starts
            scope.mapAdOptions = {
              types: 'geocode'
            };
        
            scope.adDetails = {};
            //location ends
            //show add form
            scope.addNew = false;
            scope.addNewForm = function() {
              if (scope.addNew) {
                scope.addNew = false;
              } else {
                scope.addNew = true;
              }
            };
            //show add form ends
            
            scope.showPaypal = false;
            //submit new add form
            scope.createNewAd = function() {
              if (!scope.userData) {
                scope.adError = 'You must logged in to add new advertisement';
                return;
              }
              
              var submitData = {};
              submitData.title = scope.adFrm.title;
              //xtra data
              submitData.description = scope.adFrm.description;
              //location
              submitData.location = {};
              submitData.location.latitude = scope.adFrm.adDetails.components.lat;
              submitData.location.longitude = scope.adFrm.adDetails.components.lng;
              submitData.location.country = scope.adFrm.adDetails.components.country;
              submitData.location.state = scope.adFrm.adDetails.components.state;
              submitData.location.city = scope.adFrm.adDetails.components.city;
              submitData.location.zip = (scope.adFrm.adDetails.components.zip ? scope.adFrm.adDetails.components.zip : '');
              submitData.location.place_id = scope.adFrm.adDetails.place_id;
              submitData.location.county = scope.adFrm.adDetails.components.county;
              submitData.location.formatted_addr = scope.adFrm.location;
              //tags
              submitData.tags = (scope.adFrm.tags ? scope.adFrm.tags : '');
              //data
              submitData.images = (scope.adFrm.image) ? scope.adFrm.image : '';
              submitData.links = (scope.adFrm.link) ? scope.adFrm.link : '';
              submitData.timestamp = Firebase.ServerValue.TIMESTAMP;
              scope.adRef.$add(submitData).then(function(response) {
                var id = response.key();
                scope.adFrm = {};
                scope.adError = 'Advertisement Created Successfully. Please Click Subscribe link to enable the advertisement.';
                scope.showPaypal = true;
                scope.addNew = false;
  
                scope.paypalFrm = {
                  itemName: 'Advertisement #'+id,
                  itemNumber: id,
                  custom: {
                    uid: scope.userData.uid,
                    id: id
                  },
                  trail_period_type: false,
                  trail_period_amount: 0,
                  trail_period_number: 1,
                  trail_period_frequency: 'M',
                  subscription_period_type: true,
                  subscription_period_amount: 0.01,
                  subscription_period_number: 1,
                  subscription_period_frequency: 'M',
                  confirmURL: 'http://ineedmassage.us/advertisements/paypal/confirm/' + id,
                  cancelURL: 'http://ineedmassage.us/advertisements/paypal/cancel/' + id,
                  notifyURL: 'http://ineedmassage.us/php/advertisements/ipnNofity.php'
                };
              });
            };
            //submit new add form ends
            
          }//end link
    };//end return
  }//end function pagination()

}());