angular.module('myApp')

.filter('daysAgo', function() {
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


.controller('NotificationController', ['$scope', '$websocket', '$timeout', '$filter', function($scope, $websocket, $timeout, $filter) {
  
  var that = this;
  
    // Open a WebSocket connection
  var ws = $websocket('ws://echo.websocket.org/');

  //initial data to be loaded when page loads
  this.collection = [];
  this.totalTask = 0;
  this.totalReminder = 0;
  this.totalNotification = 0;
  this.totalCount = 0;
  
  //create date
  var dt = new Date;
  this.currenDate = dateFormat(dt.getTime(), "fullDate2");
  
  ws.onError(function(event) {
    console.log('connection Error', event);
  });

  ws.onClose(function(event) {
    console.log('connection closed', event);
  });
  

  ws.onOpen(function() {
    console.log('connection open');
    var date = new Date();
    var data1;
    var data2;
    var data3;
    for (var i = 0; i < 56; i++) {
     data1 = {
          username: 'anonymous',
          message: 'Oliver Oliver has assigned the Interview. Book Travel Task to you.',
          category: 'TASK',
          created_dt: date.getTime(),
          id: 1, 
        };
      ws.send(JSON.stringify(data1));
    }
    for (var i = 0; i < 4; i++) {
      data2 = {
        username: 'anonymous',
        message: 'Oliver Oliver has assigned the Interview. Book Travel Task to you.',
        category: 'REMINDER',
        created_dt: date.getTime(),
        id: 2, 
      };
      ws.send(JSON.stringify(data2));
    }
    for (var i = 0; i < 20; i++) {
      data3 = {
        username: 'anonymous',
        message: 'More, has assigned the Interview. Book Travel Task to you.',
        category: 'NOTIFICATION',
        created_dt: date.getTime(),
        id: 3, 
      };
    ws.send(JSON.stringify(data3));
    }
  });

  
  this.processData = function(data) {
    switch (data.category) {
      case 'TASK':
        this.totalTask = this.totalTask + 1;
        this.totalCount = this.totalCount + 1;
        break;
      case 'REMINDER':
        this.totalReminder = this.totalReminder + 1;
        this.totalCount = this.totalCount + 1;
        break;
      case 'NOTIFICATION':
        this.totalNotification = this.totalNotification + 1;
        this.totalCount = this.totalCount + 1;
        break;
    }//end if
    
    this.collection.push(data);
    that.collection = $filter('orderBy')(that.collection, 'created_dt', true);
  }
  
  ws.onMessage(function(event) {
    
    var res;
    try {
      res = JSON.parse(event.data);
      
      that.processData(res);
    } catch(e) {
      
    }

  });

  
  var that = this;
  
  //for testing the functionality, to load the new data, as i don't have websocket url
  $timeout(function() {
    var data = {
      username: 'anonymous',
      created_dt: 1487050431980,
      message: 'blah, blah',
      category: 'TASK',
      id: 44
    };
    ws.send(JSON.stringify(data));
  }, 10000);
  //testing ends
  
  

  this.getData = function() {
    this.dataStream.send(JSON.stringify({ action: 'get' }));
  }
}]);

angular.module('myApp').component('notificationComponent', {
  templateUrl: 'components/NotificationComponent.html',
  controller: 'NotificationController'
});