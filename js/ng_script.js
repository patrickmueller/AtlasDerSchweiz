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
    {'title': 'Projektübersicht',
      'name': 'Eiszeit in der Schweiz',
     'image': 'img/start/projektuebersicht-02.png'},
    {'title': 'Projektübersicht',
      'name': 'Alpenpanorama',
     'image': 'img/start/projektuebersicht-03.png'},
    {'title': 'Projektübersicht',
      'name': 'Baumbestände',
     'image': 'img/start/projektuebersicht-02.png'}
  ];
  navigationControl();
}
 
function ProjectCntl($scope, $routeParams) {
  console.log('yep!');
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
}
 
function MapCntl($scope, $routeParams, $http, $templateCache) {

  initialize();
  navigationControl();

  $scope.image = '';

  $scope.topics = null;
  $scope.topicList = null;
  $scope.topicTitle = 'Themen';
  $scope.topicIndex2 = null;
  $scope.topicIndexCrumbs = new Array();;
  
  $.getJSON('http://atlas.dev/json/topics.json', function(json) {
      console.log(json);
      $scope.$apply(function(){
          $scope.topics = json;
          $scope.topicList = json;
      });
  });

  $scope.changeTopic = function(index) {

    $scope.topicIndexCrumbs.push(index);
    var i = $scope.topicIndexCrumbs;

    if(i.length == 1) {
      $scope.topicList = $scope.topics[i[0]]['children'];
      $scope.topicTitle  = $scope.topics[i[0]]['name'];
    }

    if(i.length == 2) {
      $scope.topicList = $scope.topics[i[0]]['children'][i[1]]['children'];
      $scope.topicTitle  = $scope.topics[i[0]]['children'][i[1]]['name'];
    }

    if(i.length == 3) {
      $scope.topicList = $scope.topics[i[0]]['children'][i[1]]['children'][i[2]]['children'];
      $scope.topicTitle  = $scope.topics[i[0]]['children'][i[1]]['children'][i[2]]['title_long'];
    }

/*

    console.log(index);

    if(index2 != '') {
      $scope.topicList = $scope.topics[index2]['children'][index]['children'];
      $scope.topicTitle  = $scope.topics[index2]['children'][index]['name'];
    } else {
      $scope.topicList = $scope.topics[index]['children'];
      $scope.topicTitle  = $scope.topics[index]['name'];
      $scope.topicIndex2 = index;
    }
    */

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

