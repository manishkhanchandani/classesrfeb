(function() {
  var moduleName = 'mySymptomsModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('mySymptoms', ['dataService', mySymptoms]);
    

  function mySymptoms(dataService) {
    return {
          scope: {
            userData:'='
          },
          templateUrl: 'directives/mysymptoms/mysymptoms.html',
          link: function(scope, elem, attrs) {
            scope.frm = {};
            
            scope.recordedSymptoms = [];
            scope.recordedRemedies = {};
            scope.recordedType = null;
            //show symptom from repertory
            function successMySymptoms(response, type)
            {
              scope.recordedType = type;
              scope.recordedSymptoms = [];
              scope.recordedRemedies = {};
              var snapshot = response.data.data;
              //console.log('snapshot: ', snapshot);
              angular.forEach(snapshot, function(value, key) {
                //console.log('val is ', value);
                var intensity = (value.intensity) ? parseInt(value.intensity) : 1;
                //console.log('intensity is ', intensity);
                if (value.remedies) {
                  var tmp = {};
                  //console.log('remedies: ', value.remedies);
                  angular.forEach(value.remedies, function(remedyDetails) {
                    var keyDetails = btoa(remedyDetails.remedy);
                    tmp[keyDetails] = remedyDetails;
                    //console.log('sl ', keyDetails, ', ', remedyDetails, ', ', remedyDetails.remedy, ', ', remedyDetails.points);
                    if (!scope.recordedRemedies[keyDetails]) {
                      scope.recordedRemedies[keyDetails] = {};
                      scope.recordedRemedies[keyDetails].remedy = remedyDetails.remedy;
                      scope.recordedRemedies[keyDetails].points = 0;
                      scope.recordedRemedies[keyDetails].id = keyDetails;
                    }
                    var points = (parseFloat(remedyDetails.points) * intensity);
                    tmp[keyDetails].points = points;
                    scope.recordedRemedies[keyDetails].points = scope.recordedRemedies[keyDetails].points + points;
                    //console.log('det: ', keyDetails, ', remedydetails: ', scope.recordedRemedies[keyDetails]);
                  });
                  value.remedies = tmp;
                }
                scope.recordedSymptoms.push(value);
              });
              //console.log('sym: ', scope.recordedSymptoms);
              //console.log('rem: ', scope.recordedRemedies);
            }
            
            
            function getAllMySymptoms(uid, cacheTime, cache) {
              
              var url = '/php2/repertory/complete.php?action=complete_repertory_getAll&uid='+uid+'&cacheTime='+cacheTime;
              dataService.get(url, successMySymptoms, function(r) {console.log('err getAllMySymptoms: ', r);}, cache);
            }
            
            //get data
            if (scope.userData) {
              getAllMySymptoms(scope.userData.id, 30, true);
            }
            
            scope.recordedSymptomStatus = '';
            scope.delSym = function(rid, type, trace_id) {
              scope.recordedSymptomStatus = '';
              if (!scope.userData) return;
              if (type == 1) {
                var url = '/php2/repertory/complete.php?action=complete_repertory_delete&rid='+rid+'&uid='+scope.userData.id;
                dataService.get(url, function(r) { getAllMySymptoms(scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
              } else if (type == 2) {
                var url = '/php2/repertory/complete.php?action=saved_complete_repertory_delete&rid='+rid+'&access_token='+scope.userData.access_token;
                dataService.get(url, function(r) { if (r.data.error) {scope.recordedSymptomStatus = r.data.error; return;} scope.viewSavedList(trace_id, false, 0); }, function(r) {console.log('err delSym: ', r);}, false);
              }
            };
            
            /*
            //old
            scope.delSym = function(rid) {
              if (!scope.userData) return;
              var url = '/php2/repertory/complete.php?action=complete_repertory_delete&rid='+rid+'&uid='+scope.userData.id;
              dataService.get(url, function(r) { getAllMySymptoms(scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
            };*/
            
            //Save Case Functionality
            //show save fields
            scope.save = false;
            scope.showSaveFields = function() {
              scope.save = true;
              scope.showSavedList = false;
            };
            //save ends
            
            scope.saveCase = function() {
              console.log('frim : ', scope.frm);
              if (scope.recordedSymptoms.length <= 0) return;
              if (!scope.userData) return;
              var tmp = [];
              angular.forEach(scope.recordedSymptoms, function(value) {
                tmp.push(parseInt(value.id));  
              });
              var data = {};
              data.uid = scope.userData.id;
              data.ids = tmp;
              data.name = scope.frm.name;
              console.log(data);
              dataService.postJson('/php2/repertory/complete.php?action=save_complete_repertory', data, function(r) { scope.frm.name = '';}, function(err) {console.log('err: ', err); });
            };
            
            
            scope.getSavedCases = function(uid, cacheTime, cache) {
              scope.showSavedList = true;
              scope.save = false;
              var url = '/php2/repertory/complete.php?action=saved_complete_repertory&uid='+uid+'&cacheTime='+cacheTime;
              dataService.get(url, function(r) {scope.savedListResults = r.data.data; }, function(r) {console.log('err getSavedCases: ', r);}, cache);
            }
            
            scope.viewSavedList = function(trace_id, cache, cacheTime) {
              var url = '/php2/repertory/complete.php?action=savedOne_complete_repertory&trace_id='+trace_id+'&cacheTime='+cacheTime;
              dataService.get(url, function(r) { successMySymptoms(r, 2); }, function(r) {console.log('err getSavedCases: ', r);}, cache);
            };
            //Save Case Functionality
            
          }//end link
    };//end return
  }//end function mysymptoms()

}());