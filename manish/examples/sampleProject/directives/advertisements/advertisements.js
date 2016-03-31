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
    .directive('advertisments', advertisements);
    

  function advertisements() {
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
              //url
              var access_token = scope.loggedInUsersData.token;
              var path = '/advertisements';
              var url = 'http://bootstrap.mkgalaxy.com/svnprojects/horo/records.php?action=add&saveIP=1&access_token='+access_token+'&path='+path;
              console.log(url);
              console.log(submitData);
              //dataService.post(url, submitData, addSuccess, addFailure);
            };
            //submit new add form ends
            
          }//end link
    };//end return
  }//end function pagination()

}());