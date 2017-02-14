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

.factory('Notify', function($websocket) {
  var ws = $websocket('ws://echo.websocket.org/');
  
  //since i don't have real websocket so filling it with dummy data
  var collection = [];
  
  //creating variables
  var totalCount = 0;
  var taskCount = 0;
  var reminderCount = 0;
  var notifyCount = 0;
  
  
  

  ws.onMessage(function(event) {
    console.log('message: ', event);
    
    var res;
    try {
      res = JSON.parse(event.data);
      console.log('res is ', res);
      
      collection.push({
        username: res.username,
        message: res.message,
        created_dt: res.created_dt,
        id: res.id, 
      });
    } catch(e) {
      
    }

  });

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
    for (var i = 0; i < 20; i++) {
     data1 = {
          username: 'anonymous',
          message: 'Oliver Oliver has assigned the Interview. Book Travel Task to you.',
          category: 'TASK',
          created_dt: date.getTime(),
          id: 1, 
        };
      ws.send(JSON.stringify(data1));
    }
    for (var i = 0; i < 20; i++) {
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
  // setTimeout(function() {
  //   ws.close();
  // }, 500)

  return {
    collection: collection,
    status: function() {
      return ws.readyState;
    },
    send: function(message) {
      if (angular.isString(message)) {
        ws.send(message);
      }
      else if (angular.isObject(message)) {
        ws.send(JSON.stringify(message));
      }
    }

  };
})


.controller('NotificationController', ['$scope', '$websocket', '$timeout', '$filter', 'Notify', function($scope, $websocket, $timeout, $filter, Notify) {
  
  this.collection = Notify.collection;
  console.log(this.collection);
  /*
    // Open a WebSocket connection
  this.dataStream = $websocket('ws://website.com/data');

  //initial data to be loaded when page loads
  this.collection = [
    {
      created_dt: 1487050331780,
      message: 'Oliver Oliver has assigned the Interview. Book Travel Task to you.',
      category: 'TASK',
      id: 1
    },
    {
      created_dt: 1487030331080,
      message: 'Never say no, has assigned the Interview. Book Travel Task to you.',
      category: 'REMINDER',
      id: 2
    },
    {
      created_dt: 1481030331080,
      message: 'More, has assigned the Interview. Book Travel Task to you.',
      category: 'NOTIFICATION',
      id: 3
    },
    {
      created_dt: 1481030331080,
      message: 'More, has assigned the Interview. Book Travel Task to you.',
      category: 'NOTIFICATION',
      id: 3
    },
    {
      created_dt: 1481030331080,
      message: 'More, has assigned the Interview. Book Travel Task to you.',
      category: 'NOTIFICATION',
      id: 3
    },
    {
      created_dt: 1481030331080,
      message: 'More, has assigned the Interview. Book Travel Task to you.',
      category: 'NOTIFICATION',
      id: 3
    },
    {
      created_dt: 1481030331080,
      message: 'More, has assigned the Interview. Book Travel Task to you.',
      category: 'NOTIFICATION',
      id: 3
    },
    {
      created_dt: 1481030331080,
      message: 'More, has assigned the Interview. Book Travel Task to you.',
      category: 'NOTIFICATION',
      id: 3
    }
  ];
  this.totalTask = 56;
  this.totalReminder = 4;
  this.totalNotification = 20;
  this.totalCount = 80;
  
  //create date
  var dt = new Date;
  this.currenDate = dateFormat(dt.getTime(), "fullDate2");
  
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

  this.dataStream.onMessage(function(message) {
    console.log('message: ', message);
    
    var data = JSON.parse(message.data);
    //assuming data will be json like data = {category: 'TASK|REMINDER|NOTIFICATION', description: 'blah, blah', created_at: 'someTime'}
    this.processData(data);
    
  });
  
  var that = this;
  
  //for testing the functionality, to load the new data, as i don't have websocket url
  $timeout(function() {
    var data = {
      created_dt: 1487050431980,
      message: 'blah, blah',
      category: 'TASK',
      id: 4
    };
    that.collection.push(data);
    that.collection = $filter('orderBy')(that.collection, 'created_dt', true);
    that.totalTask = that.totalTask + 1;
    that.totalCount = that.totalCount + 1;
  }, 10000);
  //testing ends
  
  

  this.getData = function() {
    this.dataStream.send(JSON.stringify({ action: 'get' }));
  }*/
}]);

angular.module('myApp').component('notificationComponent', {
  templateUrl: 'components/NotificationComponent.html',
  controller: 'NotificationController'
});