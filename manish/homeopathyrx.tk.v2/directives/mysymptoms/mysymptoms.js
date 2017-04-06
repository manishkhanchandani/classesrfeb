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
    .directive('mySymptoms', ['dataService', '$rootScope', '$routeParams', mySymptoms]);
    

  function mySymptoms(dataService, $rootScope, $routeParams) {
    return {
          scope: {
            userData:'='
          },
          templateUrl: 'directives/mysymptoms/mysymptoms.html',
          link: function(scope, elem, attrs) {
            scope.frm = {};
            scope.frm.combine = {};
            scope.frm.cross = {};
            scope.frm.combineResults = null;
            scope.frm.crossResults = null;
            scope.sorting = 'points';
            
            scope.recordedSymptoms = [];
            scope.recordedRemedies = {};
            scope.recordedType = null;
            
            scope.sortByPoints = function() {
              scope.sorting = 'points';
            };
            
            scope.sortByCount = function() {
              scope.sorting = 'count';
            };
            
            scope.clearResults = function() {
              scope.frm.combine = {};
              scope.frm.cross = {};
              scope.frm.combineResults = null;
              scope.frm.crossResults = null;
              successMySymptoms(scope.response, scope.type);
            };
            
            scope.updateResults = function() {
              if (scope.frm.combine) {
                scope.frm.combineResults = null;
                angular.forEach(scope.frm.combine, function(value, key) {
                  if (!value) return;
                  if (!scope.frm.combineResults) {
                    scope.frm.combineResults = {};
                  }//end if
                  scope.frm.combineResults[key] = value;
                });
              } else {
                scope.frm.combineResults = null;
              }
              
              
              if (scope.frm.cross) {
                scope.frm.crossResults = null;
                angular.forEach(scope.frm.cross, function(value, key) {
                  if (!value) return;
                  if (!scope.frm.crossResults) {
                    scope.frm.crossResults = {};
                  }//end if
                  scope.frm.crossResults[key] = value;
                });
              } else {
                scope.frm.crossResults = null;
              }
              
              //console.log(scope.frm);
              successMySymptoms(scope.response, scope.type);
            };
            
            console.log(scope.userData);
            //show symptom from repertory
            function successMySymptoms(response, type)
            {
              //console.log('type: ', type, ', response: ', response);
              scope.recordedType = type;
              scope.response = angular.copy(response);
              scope.recordedSymptoms = [];
              scope.recordedRemedies = {};
              scope.symptomTotalCount = 0;
              scope.remedyCount = 0;
              var snapshot = response.data.data;
              //console.log('snapshot: ', snapshot);
              //clearing the values
              angular.forEach(snapshot, function(value, key) {
                if (value.remedies) {
                  angular.forEach(value.remedies, function(remedyDetails) {
                    var keyDetails = btoa(remedyDetails.remedy);
                    scope.recordedRemedies[keyDetails] = {};
                    scope.recordedRemedies[keyDetails].remedy = remedyDetails.remedy;
                    scope.recordedRemedies[keyDetails].points = 0;
                    scope.recordedRemedies[keyDetails].count = 0;
                    scope.recordedRemedies[keyDetails].id = keyDetails;
                  });
                }
              });
              angular.forEach(snapshot, function(value, key) {
                if (scope.frm.combineResults) {
                  if (!scope.frm.combineResults[value.id]) {
                    return;
                  }
                }//end if , checking combine results
                
                if (scope.frm.crossResults) {
                  if (!scope.frm.crossResults[value.id]) {
                    return;
                  }
                }//end if , checking cross results
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
                      scope.recordedRemedies[keyDetails].count = 0;
                      scope.recordedRemedies[keyDetails].id = keyDetails;
                    }
                    var points = (parseFloat(remedyDetails.points) * intensity);
                    tmp[keyDetails].points = points;
                    scope.recordedRemedies[keyDetails].points = scope.recordedRemedies[keyDetails].points + points;
                    scope.recordedRemedies[keyDetails].count++;
                    //console.log('det: ', keyDetails, ', remedydetails: ', scope.recordedRemedies[keyDetails]);
                  });
                  value.remedies = tmp;
                }
                scope.recordedSymptoms.push(value);
              });
              
              scope.symptomTotalCount = scope.recordedSymptoms.length;
              angular.forEach(scope.recordedRemedies, function(value, key) {
                scope.recordedRemedies[key].show = false;
                if (!scope.frm.crossResults) {
                  scope.recordedRemedies[key].show = true;
                  scope.remedyCount++;
                  return;
                }
                
                if (scope.symptomTotalCount === value.count) {
                  scope.recordedRemedies[key].show = true;
                  scope.remedyCount++;
                  return;
                }
              });
              //console.log('sym: ', scope.recordedSymptoms);
              //console.log('rem: ', scope.recordedRemedies);
              //scope.remedyCount = Object.keys(scope.recordedRemedies).length;
            }
            
            
            function getAllMySymptoms(uid, cacheTime, cache) {
              
              var url = 'php2/repertory/complete.php?action=complete_repertory_getAll&uid='+uid+'&cacheTime='+cacheTime;
              dataService.get(url, successMySymptoms, function(r) {console.log('err getAllMySymptoms: ', r);}, cache);
            }
            
            
            scope.recordedSymptomStatus = '';
            
            scope.deleteAllByTraceId = function(trace_id) {
              console.log('trace id: ', trace_id);
              var a = confirm('do you want to delete this saved list?');
              if (!a) return;
              var url = 'php2/repertory/complete.php?action=deleteSavedCase&trace_id='+trace_id+'&access_token='+scope.userData.access_token;
              dataService.get(url, function(r) { scope.getSavedCases(scope.userData.id, 0, false); }, function(r) {console.log('err deleteAll: ', r);}, false);
            };
            
            scope.deleteAll = function() {
              var a = confirm('do you want to delete all symptoms?');
              if (!a) return;
              var url = 'php2/repertory/complete.php?action=complete_repertory_delete_all&access_token='+scope.userData.access_token;
              dataService.get(url, function(r) { getAllMySymptoms(scope.userData.id, 0, false); }, function(r) {console.log('err deleteAll: ', r);}, false);
            };
            
            scope.delSym = function(rid, type, trace_id) {
              if (!type) type = 1;
              //console.log('del: ', rid, type, trace_id);
              scope.recordedSymptomStatus = '';
              if (!scope.userData) return;
              if (type == 1) {
                var url = 'php2/repertory/complete.php?action=complete_repertory_delete&rid='+rid+'&uid='+scope.userData.id;
                dataService.get(url, function(r) { getAllMySymptoms(scope.userData.id, 0, false); }, function(r) {console.log('err delSym: ', r);}, false);
              } else if (type == 2) {
                var url = 'php2/repertory/complete.php?action=saved_complete_repertory_delete&rid='+rid+'&access_token='+scope.userData.access_token;
                dataService.get(url, function(r) { if (r.data.error) {scope.recordedSymptomStatus = r.data.error; return;} scope.viewSavedList(trace_id, false, 0); }, function(r) {console.log('err delSym: ', r);}, false);
              }
            };
            
            /*
            //old
            scope.delSym = function(rid) {
              if (!scope.userData) return;
              var url = 'php2/repertory/complete.php?action=complete_repertory_delete&rid='+rid+'&uid='+scope.userData.id;
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
              //console.log('frim : ', scope.frm);
              if (scope.recordedSymptoms.length <= 0) return;
              if (!scope.userData) return;
              var tmp = {};
              angular.forEach(scope.recordedSymptoms, function(value) {
                //tmp.push(parseInt(value.id));  
                tmp[parseInt(value.id)] = parseInt(value.intensity);
              });
              var data = {};
              data.uid = scope.userData.id;
              data.ids = tmp;
              data.name = scope.frm.name;
              dataService.postJson('php2/repertory/complete.php?action=save_complete_repertory', data, function(r) { scope.frm.name = '';}, function(err) {console.log('err: ', err); });
            };
            
            
            scope.getSavedCases = function(uid, cacheTime, cache) {
              scope.showSavedList = true;
              scope.save = false;
              var url = 'php2/repertory/complete.php?action=saved_complete_repertory&uid='+uid+'&cacheTime='+cacheTime;
              dataService.get(url, function(r) {scope.savedListResults = r.data.data; }, function(r) {console.log('err getSavedCases: ', r);}, cache);
            }
            
            scope.viewSavedList = function(trace_id, cache, cacheTime) {
              var url = 'php2/repertory/complete.php?action=savedOne_complete_repertory&trace_id='+trace_id+'&cacheTime='+cacheTime;
              dataService.get(url, function(r) { successMySymptoms(r, 2); }, function(r) {console.log('err getSavedCases: ', r);}, cache);
            };
            
            
            scope.viewListBasedOnUrl = function(trace_id, cache, cacheTime) {
              var url = 'php2/repertory/complete.php?action=savedOne_complete_repertory&trace_id='+trace_id+'&cacheTime='+cacheTime;
              dataService.get(url, function(r) { successMySymptoms(r, 3); }, function(r) {console.log('err getSavedCases: ', r);}, cache);
            };
            
            //console.log($routeParams);
            //Save Case Functionality
            
            
            //get data
            if ($routeParams.trace_id) {
              scope.trace_id = $routeParams.trace_id;
              scope.recordedType = 3;
              scope.viewListBasedOnUrl($routeParams.trace_id, true, 30);
            } else if (scope.userData) {
              getAllMySymptoms(scope.userData.id, 30, true);
            }
            scope.exportData = function(nm) {
                var blob = new Blob([document.getElementById('exportable').innerHTML], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                });
                saveAs(blob, nm+".xls");
            };
            
            //broadcast
            $rootScope.$on("getAllMySymptoms", function(event, args){
                getAllMySymptoms(args.uid, args.cacheTime, args.cache)
            });
            
          }//end link
    };//end return
  }//end function mysymptoms()

}());