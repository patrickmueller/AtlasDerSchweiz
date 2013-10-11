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
    templateUrl: 'home.html',
    //templateUrl: 'map.html',
    controller: MainCntl,
    //controller: MapCntl
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

  initialize();
  navigationControl();

  $scope.image = '';

  $scope.topics = null;
  $scope.topicList = null;
  $scope.topicTitle = 'Themen';
  $scope.topicIndexCrumbs = new Array();
  $scope.topicLastFlag = false;
  
  $.getJSON('/json/topics.json', function(json) {
      console.log(json);
      $scope.$apply(function(){
          $scope.topics = json;
          $scope.topicList = json;
      });
  });

  $scope.changeTopic = function(index) {

    if(!$scope.topicLastFlag) {

      if(index != null)
        $scope.topicIndexCrumbs.push(index);
      var thisTopic = $scope.topics;
      var x = $scope.topicIndexCrumbs;
      var length = $scope.topicIndexCrumbs.length;

      if(length > 0) {

        for (var i = 0; i <= length - 1; i++) {
          thisTopic = thisTopic[x[i]];
          $scope.topicTitle = thisTopic['name'];
          thisTopic = thisTopic['children'];
          $scope.topicList = thisTopic;
          if(thisTopic[0]['title_long']) {
            $scope.topicLastFlag = true;
          }
        };

      } else {
        $scope.topicList = $scope.topics;
        $scope.topicTitle = 'Themen';
      }

    } else {

      console.log($scope.topicList[index]['name']);

    }

  }

  $scope.changeTopicBack = function() {

    $scope.topicLastFlag = false;
    $scope.topicIndexCrumbs.pop();
    $scope.changeTopic(null);

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

