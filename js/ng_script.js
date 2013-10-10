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
    controller: MainCntl
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
}
 
function ProjectCntl($scope, $routeParams) {
  console.log('yep!');
  $scope.maps = [
    {'title': 'Kartenübersicht',
      'name': 'Map 1',
     'image': '/img/icon-04.png'},
    {'name': 'Map 2',
     'image': '/img/icon-05.png'},
    {'name': 'Map 3',
     'image': '/img/icon-06.png'}
  ];
}
 
function MapCntl($scope, $routeParams) {
}

