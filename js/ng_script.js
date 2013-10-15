angular.module('ngView', ['ngRoute']).config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/projects/:projectId', {
    templateUrl: '/project.html',
    controller: ProjectCntl,
  });

  $routeProvider.when('/projects/:projectId/map/:mapId', {
    templateUrl: 'map.html',
    controller: MapCntl
  });

  $routeProvider.when('/map', {
    templateUrl: '/map.html',
    controller: MapCntl
  });

  $routeProvider.when('/', {
    //templateUrl: 'home.html',
    templateUrl: 'map.html',
    //controller: MainCntl,
    controller: MapCntl
  });
 
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});

function MainCntl($scope, $routeParams) {
    $scope.projects = [
    {'name': 'Eiszeit in der Schweiz',
     'image': 'img/start/projektuebersicht-02.png'},
    {'name': 'Alpenpanorama',
     'image': 'img/start/projektuebersicht-03.png'},
    {'name': 'Baumbestände',
     'image': 'img/start/projektuebersicht-02.png'}
  ];
  navigationControl();
}
 
function ProjectCntl($scope, $routeParams) {
  console.log($routeParams);
  $scope.maps = [
    {'title': 'Kartenübersicht',
      'name': 'Map 1',
     'image': '/img/start/map_01.png'},
    {'name': 'Map 2',
     'image': '/img/start/map_02.png'},
    {'name': 'Map 3',
     'image': '/img/start/map_03.png'}
  ];
  navigationControl();
  $scope.title = $routeParams['projectId'];

}
 
function MapCntl($scope, $routeParams, $http, $templateCache) {

  // outsourced functionality
  navigationControl();
  initialize();


  // model data
  $scope.image = '';

  $scope.topics = null;
  $scope.topicList = null;
  $scope.topicTitle = 'Themen';
  $scope.topicIndexCrumbs = new Array();
  $scope.topicLastFlag = false;
  $scope.topicLastClass = '';
  $scope.topicOpen = null;
  $scope.topicAction = 'navigateTopic';
  $scope.topicBackIcon = '';
  $scope.topicActiveTopics = new Array();
  
  $.getJSON('/json/topics.json', function(json) {
      console.log(json);
      $scope.$apply(function(){
          $scope.topics = json;
          $scope.topicList = json;
      });
  });




  // topic menu actions

  $scope.navigateTopic = function(index) {

    if(index != null)
      $scope.topicIndexCrumbs.push(index);
  
    var thisTopic = $scope.topics;
    var x = $scope.topicIndexCrumbs;
    var length = x.length;
    var setClass = false;
    var actionIsComing = false;
    $scope.topicAction = 'navigateTopic';

    if(length > 0) {

      for (var i = 0; i <= length - 1; i++) {

          if(actionIsComing) {
            if(index != null) {
              console.log($scope.topicList);
              $scope.addTopic(index);
            } else {
              setClass = true;
              console.log('setClass');

              var tmp = thisTopic;
              tmp[x[i]]['class'] = 'selected';
              thisTopic = tmp;
              console.log(thisTopic);

            }
            break;
          }

          thisTopic = thisTopic[x[i]];
          $scope.topicTitle = thisTopic['name'];

          thisTopic = thisTopic['children'];
          

          if(thisTopic[0]['title_long'])
            actionIsComing = true;
        
      };
      $scope.topicList = thisTopic;
      $scope.topicBackIcon = 'back';

    } else {
      $scope.topicList = $scope.topics;
      $scope.topicTitle = 'Themen';
      $scope.topicBackIcon = '';
    }

    if(setClass) {



    }

  }

  $scope.navigateTopicBack = function() {

    //$scope.topicLastFlag = false;
    $scope.topicIndexCrumbs.pop();
    $scope.navigateTopic(null);

  }

  $scope.newTopic = function() {

    $scope.topicOpen = null;
    $scope.topicIndexCrumbs = [];
    //$scope.topicLastFlag = false;
    $scope.navigateTopic();

  }

  $scope.addTopic = function(index) {

    // get topic
    console.log($scope.topicList);
    var topic = $scope.topicList[index]['name'];

    // get topic icon
    var icon;
    var topic = $scope.topics[$scope.topicIndexCrumbs[0]]['name']
    switch (topic) {
      case 'Natur und Umwelt':
        icon = 'nature';
        break;
      case 'Gesellschaft':
        icon = 'society';
        break;
      case 'Wirtschaft':
        icon = 'economy';
        break;
      case 'Staat und Politik':
        icon = 'politic';
        break;
      case 'Energie und Kommunikation':
        icon = 'energy';
        break;
    }

    // add topic to array
    var arr = new Array();
    var index = $scope.topicActiveTopics.length;

    arr = {
      topic: topic,
      indexCrumbs: $scope.topicIndexCrumbs,
      iconClass: icon,
      ctrlAction: 'viewTopic(' + index + ')'
    };

    if($scope.topicOpen >= 0) {
      $scope.topicActiveTopics[$scope.topicOpen] = arr;
    } else {
      $scope.topicActiveTopics.push(arr);
    }

    $scope.viewTopic(index);

    // add active class
    //$('.active').removeClass('active');
    //$('#group-left-2 .group a:nth-child(' + (index + 1) + ')').addClass('active');

  }

  $scope.viewTopic = function(index) {

    $scope.topicOpen = index;
    $scope.topicIndexCrumbs = $scope.topicActiveTopics[index]['indexCrumbs'];
    //$scope.topicLastFlag = false;
    $scope.navigateTopic(null);

  }



  $scope.search = function() {
    $scope.image = 'img/map_suche.png';
  };

  $scope.legend = function() {
    $scope.image = 'img/map_legende.png';
  };

  $scope.options = function() {
    $scope.image = 'img/map_basiskartenoptionen.png';
  };

}

