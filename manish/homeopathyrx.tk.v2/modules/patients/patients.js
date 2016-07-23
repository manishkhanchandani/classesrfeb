'use strict';

angular.module('myApp.patients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'modules/patients/patients.html',
    controller: 'PatientsCtrl'
  }).when('/patients/new', {
    templateUrl: 'modules/patients/new.html',
    controller: 'PatientsNewCtrl'
  }).when('/patients/case', {
    templateUrl: 'modules/patients/case.html',
    controller: 'PatientsCaseCtrl'
  });
}])

.controller('PatientsCtrl', ['$scope', function($scope) {

}])

.controller('PatientsNewCtrl', ['$scope', function($scope) {
  $scope.frm = {};
  $scope.create = function()
  {
    console.log($scope.frm);
  };
}])
.controller('PatientsCaseCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  var myFirebaseRef = new Firebase("https://mkgxy.firebaseio.com/projects/homeopathyCases");
  $scope.frm = {};
  
  $scope.frm.data = {};
  $scope.completeFrm = {};
  $scope.completeFrm.complaints = [];
  var obj;
  
  $scope.frm.data.modalities = [
    {name: 'hot_weater', label: 'Hot Weather'},
    {name: 'cold_weater', label: 'Cold Weather'},
    {name: 'rainy_weater', label: 'Rainy Weather'},
    {name: 'cloudy_weater', label: 'Cloudy Weather'},
    {name: 'change_season', label: 'Change of Season'},
    {name: 'thunderstorm', label: 'Thunderstorm'},
    {name: 'covering', label: 'Covering'},
    {name: 'warm_bath', label: 'Warm Bath'},
    {name: 'sun', label: 'Sun'},
    {name: 'drinking', label: 'Drinking'},
    {name: 'sitting', label: 'Sitting'},
    {name: 'sitting_erect', label: 'Sitting Erect'},
    {name: 'standing', label: 'Standing'},
    {name: 'looking_up', label: 'Looking Up'},
    {name: 'looking_down', label: 'Looking Down'},
    {name: 'looking_from_high_places', label: 'Looking From High Places'},
    {name: 'looking_from_moving_object', label: 'Looking From Moving Object'},
    {name: 'when_fasting', label: 'When Fasting'},
    {name: 'after_eating', label: 'After Eating'},
    {name: 'in_a_crowd', label: 'In a crowd'},
    {name: 'in_a_closed_room', label: 'In a closed room'},
    {name: 'thinking_of_illness', label: 'When thinking of illness'},
    {name: 'moon', label: 'Full Moon / New Moon'},
    {name: 'morning', label: 'Morning'},
    {name: 'afternoon', label: 'Afternoon'},
    {name: 'evening', label: 'Evening'},
    {name: 'night', label: 'Night'},
    {name: 'bathing', label: 'Bathing'},
    {name: 'draft_air', label: 'Draft air'},
    {name: 'chewing', label: 'Biting or chewing'},
    {name: 'blowingnose', label: 'Blowing Nose'},
    {name: 'whenalone', label: 'When alone'},
    {name: 'incompany', label: 'In company'},
    {name: 'physicalexertion', label: 'Physical exertion'},
    {name: 'belching', label: 'Belching'},
    {name: 'vomiting', label: 'Vomiting'},
    {name: 'yawning', label: 'Yawning'},
    {name: 'walking', label: 'Walking'},
    {name: 'running', label: 'Running'},
    {name: 'climbingstairs', label: 'Climbing stairs'},
    {name: 'goingdownstairs', label: 'Going downstairs'},
    {name: 'riding', label: 'Riding in bus, car'},
    {name: 'lying', label: 'Lying'},
    {name: 'lyingonback', label: 'Lying on back'},
    {name: 'layingonleftside', label: 'Lying on left side'},
    {name: 'layingonrightside', label: 'Lying on right side'},
    {name: 'layingwithheadlow', label: 'Lying with head low'},
    {name: 'aftersexualintercourse', label: 'After sexual intercourse'},
    {name: 'dust', label: 'Dust'},
    {name: 'smoke', label: 'Smoke'},
    {name: 'touch', label: 'Touch'},
    {name: 'pressure', label: 'Pressure'},
    {name: 'massage', label: 'Massage'},
    {name: 'tightclothes', label: 'Tight Clothes'},
    {name: 'aftersweating', label: 'After Sweating'},
    {name: 'inconstipation', label: 'In constipation'},
    {name: 'beforesleep', label: 'Before Sleep'},
    {name: 'duringsleep', label: 'During Sleep'},
    {name: 'aftersleep', label: 'After Sleep'},
    {name: 'afternoonnap', label: 'After afternoon nap'},
    {name: 'lossofsleep', label: 'Loss of sleep'},
    {name: 'beforestools', label: 'Before stools'},
    {name: 'duringstools', label: 'During stools'},
    {name: 'afterstools', label: 'After stools'},
    {name: 'coughing', label: 'Coughing'},
    {name: 'sneezing', label: 'Sneezing'},
    {name: 'laughing', label: 'Laughing'},
    {name: 'talking', label: 'Talking'},
    {name: 'reading', label: 'Reading'},
    {name: 'writing', label: 'Writing'},
    {name: 'stooping', label: 'Stooping'},
    {name: 'passinggas', label: 'Passing gas'},
    {name: 'afterhaircut', label: 'After hair cut'},
    {name: 'combinghair', label: 'Combing hair'},
    {name: 'noise', label: 'Noise'},
    {name: 'suddennoise', label: 'Sudden Noise'},
    {name: 'music', label: 'Music'},
    {name: 'light', label: 'Light'},
    {name: 'strongsmells', label: 'Strong smells'},
    {name: 'beforeurine', label: 'Before Urine'},
    {name: 'duringurine', label: 'During Urine'},
    {name: 'afterurine', label: 'After Urine'},
    {name: 'beforemenses', label: 'Before Menses'},
    {name: 'duringmenses', label: 'During Menses'},
    {name: 'aftermenses', label: 'After Menses'},
    {name: 'beforemeeting', label: 'Before important meeting'},
    {name: 'beforeexams', label: 'Before exams'},
    {name: 'whenangry', label: 'When angry'},
    {name: 'whenworried', label: 'When worried'},
    {name: 'whensad', label: 'When sad'},
    {name: 'afterweeping', label: 'After Weeping'},
    {name: 'consolation', label: 'Consolation / Sympathy'},
    {name: 'overeating', label: 'Over eating'},
    {name: 'workinginwater', label: 'Working in water'},
    {name: 'fanning', label: 'Fanning'},
    {name: 'hanginglimbs', label: 'Hanging the limbs'},
    {name: 'armsraising', label: 'Arms raising'},
    {name: 'nearsea', label: 'Near Sea'},
    {name: 'shaving', label: 'Shaving'},
    {name: 'stretching', label: 'Stretching'},
    {name: 'swallowing', label: 'Swallowing'},
    {name: 'listeningtotalk', label: 'Listening to others talk'},
    {name: 'moonlight', label: 'Moonlight'},
    {name: 'movingeyes', label: 'Moving the eyes'},
    {name: 'openingeyes', label: 'Opening the eyes'},
    {name: 'closingeyes', label: 'Closing the eyes'},
    {name: 'feetwet', label: 'Getting feet wet'},
    {name: 'brushingteeth', label: 'Brushing teeth'},
    {name: 'openingmouth', label: 'Opening the mouth'},
    {name: 'smoking', label: 'Smoking'}
  ];
  
  
  $scope.frm.data.foods = [
    {name: 'bitter', label: 'Bitter'},
    {name: 'salt', label: 'Salt'},
    {name: 'sweet', label: 'Sweet'},
    {name: 'sour', label: 'Sour'},
    {name: 'bread', label: 'Bread'},
    {name: 'butter', label: 'Butter'},
    {name: 'fats', label: 'Fats'},
    {name: 'milk', label: 'Milk'},
    {name: 'coffee', label: 'Coffee'},
    {name: 'mud_chalk', label: 'Mud / chalk'},
    {name: 'eggs', label: 'Eggs'},
    {name: 'spicy', label: 'Spicy'},
    {name: 'meat', label: 'meat'},
    {name: 'fish', label: 'Fish'},
    {name: 'cabbage', label: 'Cabbage'},
    {name: 'warm_food', label: 'Warm Food'},
    {name: 'warm_drinks', label: 'Warm Drinks'},
    {name: 'cold_food', label: 'Cold Food'},
    {name: 'cold_drinks', label: 'Cold Drinks'},
    {name: 'fruits', label: 'Fruits'}
  ];
  
  $scope.frm.data.mind = {
    mind: 'Mind (Tell about your nature, how you behave with friends and families, how they behave with you?)',
    yourself: 'Yourself: do you do anything more than what other people do (it can be anything, for example one person used to pray too much than others, other person likes to wash hands too much, other person likes to cry all the time, other person likes to shy with strangers, etc.)',
    anxiety: 'Are you anxious? About which matters?',
    fear: 'Are you fearful of anything such as animals, people, being alone, darkness, death, disease, robbers, sudden noises, thunder, of the future, of something unknown, high places, etc.?',
    suspicious: 'Are you doubtful or suspicious? Of what?',
    jealous: 'What are you jealous about?',
    jealous_of_whom: 'Of whom? From what symptoms do you suffer when jealousy? ',
    hurried: 'In which matter are you impatient? Hurried? ',
    hurt: 'How long do you remember hurts caused to you by others?',
    revenge: 'How much revengeful are you? ',
    proud: 'What are you proud of? Does your pride get easily hurt? ',
    depress: 'Depress, Brooding, etc.? ',
    suicide: 'Do you ever become suicidal? When? ',
    suicide2: 'If so in what manner do you contemplate to end your life? ',
    dying: 'Even then, are you afraid of dying? ',
    cheerful: 'When are you cheerful? ',
    thoughts: 'Any unwanted thoughts any time? What are they?',
    sensations: 'Have you any imaginary sensations or fears ? ',
    voices: 'Do you hear voices, or that you are called, or anything else in this line keeps on occurring in your mind unduly ? ',
    memory: 'How is your memory ? For what is it poor? e.g. names, places, faces, what you have read, etc. ',
    weep: 'Do you weep easily ? What makes you weep ? ',
    weepfeel: 'How do you feel after weeping ? ',
    sympathy: 'How do you feel if someone offers sympathy and consolation ? ',
    irritated: 'Are you easily irritated ? ',
    angryreason: 'What makes you angry ? ',
    angryafter: 'What bodily symptoms do you develop when angry ? e.g. trembling, sweating etc. ',
    company: 'Do you like company ? Or like to remain alone ? ',
    uncleanliness: 'How seriously are you affected by disorder and uncleanliness in your surrounding ? ',
    griefs: 'What are the greatest griefs that you have gone through in your life? ',
    joys: 'What are the greatest joys that you have had in life?',
    activities: 'What activities you deeply like? ',
    dislikematters: 'Are there any matters which you deeply dislike? ',
    mindmood: 'In your opinion, which aspects of your mind and moods are not agreeable to you. Inspite of your awareness and maturity, are you unable to change these aspects? ',
    family: 'Give a clear cut picture of your situation in life and your relationship with each of your family members, friends and associates in work',
    future: 'How does the future look to you? ',
    freethoughts: 'When you are free, what thoughts come to your mind? ',
    unhappy: 'Are you worried or unhappy over? Any personal, domestic, economical, Social or any other condition? If so describe in detail?',
    wishes: 'If asked for 3 desires or wishes in life, what will you ask for? '
    
  };
  
  //getLabelObject
  var getLabelObject = {modalities: {}, foods: {}};
  angular.forEach($scope.frm.data.modalities, function(v, k) {
    getLabelObject.modalities[v.name] = v.label;
  });
  angular.forEach($scope.frm.data.foods, function(v, k) {
    getLabelObject.foods[v.name] = v.label;
  });
  //getLabelObject
  
  
  $scope.$on('completeFrmChanged', function(event) {
    if ($scope.completeFrm.complaints.length > 0) {
      angular.forEach($scope.completeFrm.complaints, function(value, key) {
        if (!value.modalities) return;
        angular.forEach(value.modalities, function(value2, key2) {
          $scope.completeFrm.complaints[key].modalities[key2].label = getLabelObject.modalities[key2];
        });
      });
    }
    
    if ($scope.completeFrm.foods) {
      angular.forEach($scope.completeFrm.foods, function(value, key) {
        $scope.completeFrm.foods[key].label = getLabelObject.foods[key];
      });
    }
    
    $scope.frm.details = $scope.completeFrm.details;
    $scope.frm.foods = $scope.completeFrm.foods;
    $scope.frm.mentalSymptoms = $scope.completeFrm.mind;
    localStorage.setItem('myCase', JSON.stringify($scope.completeFrm));
    $scope.caseRecord = JSON.stringify($scope.completeFrm);
    
    var name = '';
    if ($scope.frm.details) {
      name = btoa(JSON.stringify($scope.frm.details));
      myFirebaseRef.child(name).set($scope.completeFrm); 
    }
  });
  
  var myCase = localStorage.getItem('myCase');
  $scope.myCase = null;
  if (myCase) {
    $scope.completeFrm = JSON.parse(myCase);
    $scope.frm.details = $scope.completeFrm.details;
    $scope.frm.foods = $scope.completeFrm.foods;
    $scope.frm.mentalSymptoms = $scope.completeFrm.mind;
    $rootScope.$broadcast('completeFrmChanged');
  }
  
  
  $scope.updateDetails = function() {
    $scope.completeFrm.details = $scope.frm.details;
    localStorage.setItem('myCase', JSON.stringify($scope.completeFrm));
    $rootScope.$broadcast('completeFrmChanged');
    alert('details updated');
  };
  
  $scope.addComplaint = function()
  {
    $scope.completeFrm.complaints.push($scope.frm.complaint);
    localStorage.setItem('myCase', JSON.stringify($scope.completeFrm));
    $scope.frm.complaint = {};
    $rootScope.$broadcast('completeFrmChanged');
    alert('complaint added');
  };
  $scope.addMind = function()
  {
    $scope.completeFrm.mind = $scope.frm.mentalSymptoms;
    localStorage.setItem('myCase', JSON.stringify($scope.completeFrm));
    $rootScope.$broadcast('completeFrmChanged');
    alert('mind details saved');
  };
  $scope.addFood = function()
  {
    $scope.completeFrm.foods = $scope.frm.foods;
    localStorage.setItem('myCase', JSON.stringify($scope.completeFrm));
    $rootScope.$broadcast('completeFrmChanged');
    alert('food details saved');
  };
  
  $scope.deleteComplatin = function(rec, i)
  {
    var a = confirm('are you sure you want to delete this?');
    if (!a) return;
    $scope.completeFrm.complaints.splice(i, 1);
    localStorage.setItem('myCase', JSON.stringify($scope.completeFrm));
    $rootScope.$broadcast('completeFrmChanged');
  }
  
  $scope.clearForm = function()
  {
    $scope.completeFrm = {};
    $scope.frm.details = {};
    $scope.frm.mind = {};
    $scope.frm.foods = {};
    localStorage.removeItem('myCase');
  };
  
  $scope.copy = function()
  {
    var clipboard = new Clipboard('.copyToClipboard');

    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
    
        e.clearSelection();
    });
    
    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
  };
  
  $scope.exportData = function(nm) {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, nm+".xls");
    };
  $scope.importCase = function()
  {
    $scope.completeFrm = JSON.parse($scope.caseRecord);
    $rootScope.$broadcast('completeFrmChanged');
  }
  
}])

;