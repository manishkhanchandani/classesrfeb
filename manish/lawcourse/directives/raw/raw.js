(function() {

  var moduleName = 'rawModule';
  var module;
  try {
      module = angular.module(moduleName);
  } catch(err) {
      // named module does not exist, so create one
      module = angular.module(moduleName, []);
  }
  
  module
    .directive('rawAdd', ['dataService', 'configs', rawAdd])
    .directive('rawEdit', ['dataService', 'configs', rawEdit])
    .directive('rawDelete', ['dataService', 'configs', rawDelete])
    .directive('rawList', ['dataService', 'configs', '$routeParams', '$location', rawList])
    .directive('rawDetail', ['dataService', 'configs', rawDetail])
    ;
    
  
  function rawAdd(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/add.html',
          link: function(scope, elem, attrs) {
            scope.frm = {};
            
            function onlyUnique(value, index, self) { 
                return self.indexOf(value) === index;
            }
            
            function addSuccess(response) {
              console.log('success: ', response);
              scope.frm.title = '';
              scope.frm.description = '';
            }
            
            function addFailure(response) {
              console.log('failure: ', response);
            }
    
            scope.addRecord = function() {
              if (!scope.userData) {
                console.log('login first');
                return;  
              }
              console.log(scope.userData);
              console.log('frm: ', scope.frm);
              var submitData = '';
              submitData = submitData + '&title='+encodeURIComponent(scope.frm.title);
              //xtra data
              submitData = submitData + '&description='+encodeURIComponent(scope.frm.description);
              submitData = submitData + '&reference_id='+encodeURIComponent(scope.frm.reference_id);
              submitData = submitData + '&vc1='+encodeURIComponent(scope.frm.chapter);
              submitData = submitData + '&vc2='+encodeURIComponent(scope.frm.book);
              //url
              var access_token = scope.userData.token;
              var path = '/manish/lawCourse';
              var url = configs.apiUrl+'records.php?action=add&tid='+configs.tid+'&saveIP=1&access_token='+access_token+'&path='+path;
              dataService.post(url, submitData, addSuccess, addFailure);
            }
          }//end link
      };//end return
  }
  
  function rawEdit(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/edit.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }
  
  function rawDelete(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/delete.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }
  
  function rawList(dataService, configs, $routeParams, $location) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/list.html',
          link: function(scope, elem, attrs) {
            console.log($routeParams);
            scope.frm = {};
            scope.frm.subjects = {};
            scope.frm.subjects[1] = 'Introduction to Law & Legal Writings';
            scope.frm.subjects[2] = 'Contracts';
            scope.frm.subjects[3] = 'Criminal Law';
            scope.frm.subjects[4] = 'Torts';
            
            scope.frm.page = 0;
            if ($routeParams.page) {
              scope.frm.page = $routeParams.page;
            }
            
    
            scope.frm.urlPrefix = 'search/p_';
            scope.frm.urlSufix = '';
            
            scope.search = function() {
              var url = '/search/p_0';
              if (scope.frm.reference_id) {
                url = url + '/c_' + scope.frm.reference_id;
              }
              if (scope.frm.keyword) {
                url = url + '/k_' + encodeURIComponent(scope.frm.keyword);
              }
              $location.path(url);  
            };
    
            function getSuccess(response) {
              scope.showLoading = false;
              console.log('success: ', response);
              scope.results = response.data.data.results;
              scope.data = response.data.data;
              console.log(scope.results);
              console.log(scope.data);
              if (scope.results.length == 0) {
                scope.listStatus = 'No Result Found';  
              }
            }
          
            function getFailure(response) {
              scope.showLoading = false;
              console.log('failure: ', response);
            }
            
            scope.getData = function() {
              scope.showLoading = true;
              var url = configs.apiUrl+'records.php?action=getAll&tid='+configs.tid;
              
              if ($routeParams.cat_id) {
                url = url + '&reference_id='+$routeParams.cat_id;
                scope.frm.reference_id = decodeURIComponent($routeParams.cat_id);
                scope.frm.urlSufix = scope.frm.urlSufix + '/c_' + $routeParams.cat_id;
              }
              
              if ($routeParams.keyword) {
                url = url + '&q='+$routeParams.keyword+'&vc1='+$routeParams.keyword;
                scope.frm.keyword = decodeURIComponent($routeParams.keyword);
                scope.frm.urlSufix = scope.frm.urlSufix + '/k_' + $routeParams.keyword;
              }
              
              
              
              var path = '/manish/lawCourse';
              url = url + '&path='+path+'&max=10&nl2br=1&customOrder=a.id+ASC';
              url = url + '&page=' + scope.frm.page;
              dataService.get(url, getSuccess, getFailure, true);
            };
            
            scope.getData();
          }//end link
      };//end return
  }
  
  function rawDetail(dataService, configs) {
    return {
          scope: {
            userData: '='
          },
          templateUrl: 'directives/raw/detail.html',
          link: function(scope, elem, attrs) {
              
          }//end link
      };//end return
  }

}());