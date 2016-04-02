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
    .directive('advertisments', ['dataService', advertisements]);
    

  function advertisements(dataService) {
    return {
          scope: {
            loggedInUsersData: '='
          },
          templateUrl: 'directives/advertisements/advertisements.html',
          link: function(scope, elem, attrs) {
            scope.adFrm = {};
            scope.adError = null;
            
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
            function advtSuccess(response) {
              console.log('advt success: ', response);
              var result = response.data.data;
              scope.adError = 'Advertisement Created Successfully. Please Click Subscribe link to enable the advertisement.';
              scope.showPaypal = true;
              scope.addNew = false;

              scope.paypalFrm = {
                itemName: 'Advertisement',
                itemNumber: 1,
                custom: {
                  token: scope.loggedInUsersData.token,
                  id: result.id,
                  expiry: 30
                },
                trail_period_type: false,
                trail_period_amount: 0,
                trail_period_number: 1,
                trail_period_frequency: 'M',
                subscription_period_type: true,
                subscription_period_amount: 0.01,
                subscription_period_number: 1,
                subscription_period_frequency: 'M',
                confirmURL: 'http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/step3/',
                cancelURL: 'http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/cancel/',
                notifyURL: 'http://bootstrap.mkgalaxy.com/svnprojects/mk/prjServices/pages/ipnNotify.php',
              };
            }
            
            function advtFailure(response) {
              console.log('advt failed: ', response);
              scope.adError = 'Could not insert advertisement record. Please try again later.';
            }
            
            //submit new add form
            scope.createNewAd = function() {
              if (!scope.loggedInUsersData) {
                scope.adError = 'You must logged in to add new advertisement';
                return;
              }
              
              var submitData = '';
              submitData = submitData + '&title='+encodeURIComponent(scope.adFrm.title);
              //xtra data
              submitData = submitData + '&description='+encodeURIComponent(scope.adFrm.description);
              //location
              submitData = submitData + '&location[latitude]='+encodeURIComponent(scope.adFrm.adDetails.components.lat);
              submitData = submitData + '&location[longitude]='+encodeURIComponent(scope.adFrm.adDetails.components.lng);
              submitData = submitData + '&location[country]='+encodeURIComponent(scope.adFrm.adDetails.components.country);
              submitData = submitData + '&location[state]='+encodeURIComponent(scope.adFrm.adDetails.components.state);
              submitData = submitData + '&location[city]='+encodeURIComponent(scope.adFrm.adDetails.components.city);
              submitData = submitData + '&location[zip]='+(scope.adFrm.adDetails.components.zip ? encodeURIComponent(scope.adFrm.adDetails.components.zip) : '');
              submitData = submitData + '&location[place_id]='+encodeURIComponent(scope.adFrm.adDetails.place_id);
              submitData = submitData + '&location[county]='+encodeURIComponent(scope.adFrm.adDetails.components.county);
              submitData = submitData + '&location[formatted_addr]='+encodeURIComponent(scope.adFrm.location);
              
              //tags
              submitData = submitData + '&tags='+(scope.adFrm.tags ? encodeURIComponent(scope.adFrm.tags) : '');
              //data
              var data = {};
              data.tagsSingle = '';
              data.images = {};
              data.images[btoa(scope.adFrm.image)] = scope.adFrm.image;
              data.links = {};
              data.links[btoa(scope.adFrm.link)] = scope.adFrm.link;
              submitData = submitData + '&data='+JSON.stringify(data);
              //end data
              var access_token = scope.loggedInUsersData.token;
              var path = '/advertisements';
              var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+access_token+'&path='+path;
              dataService.post(url, submitData, advtSuccess, advtFailure);
            };
            //submit new add form ends
            
          }//end link
    };//end return
  }//end function pagination()

}());