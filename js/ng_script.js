var atlasApp = angular.module('atlasApp', [
  'ngRoute',
  'atlasControllers',
  'atlasAnimations'
]);


atlasApp.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.when('/projects/:projectId', {
      templateUrl: '/project.html',
      controller: 'ProjectCntl',
    });

    $routeProvider.when('/projects/:projectId/map/:mapId', {
      templateUrl: 'map.html',
      controller: 'MapCntl'
    });

    $routeProvider.when('/map', {
      templateUrl: '/map.html',
      controller: 'MapCntl'
    });

    $routeProvider.when('/', {
      templateUrl: 'home.html',
      //templateUrl: 'map.html',
      controller: 'MainCntl',
      //controller: 'MapCntl'
    });

}]);



var atlasControllers = angular.module('atlasControllers', []);


atlasControllers.controller('MainCntl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.projects = [
    {'name': 'Eiszeit in der Schweiz',
     'image': 'img/start/projektuebersicht-02.png'},
    {'name': 'Alpenpanorama',
     'image': 'img/start/projektuebersicht-03.png'},
    {'name': 'Baumbestände',
     'image': 'img/start/projektuebersicht-02.png'}
  ];
  navigationControl();
}]);


atlasControllers.controller('ProjectCntl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
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
}]);


atlasControllers.controller('MapCntl', ['$scope', '$routeParams',
  function($scope, $routeParams, $http, $templateCache) {

    // outsourced functionality
    navigationControl();
    initialize('');


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
      var actionIsComing = false;
      $scope.topicAction = 'navigateTopic';

      if(length > 0) {

        for (var i = 0; i <= length - 1; i++) {

            if(actionIsComing) {
              if(index != null) {
                $scope.addTopic(index);
              } else {
                var tmp = thisTopic;
                tmp[x[i]]['class'] = 'selected';
                thisTopic = tmp;
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
      var topic = $scope.topicList[index]['name'];
      var overlay = $scope.topicList[index]['overlay'];

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

      if($scope.topicOpen != null) {
        index = $scope.topicOpen;
      } else {
        index = $scope.topicActiveTopics.length;
      }

      arr = {
        topic: topic,
        indexCrumbs: $scope.topicIndexCrumbs,
        iconClass: icon,
        ctrlAction: 'viewTopic(' + index + ')',
        overlay: overlay
      };

      if($scope.topicOpen != null) {
        $scope.topicActiveTopics[index] = arr;
      } else {
        $scope.topicActiveTopics.push(arr);
      }

      $scope.viewTopic(index);
      $scope.loadOverlay(index);

      // add active class
      $('.active').removeClass('active');
      $('#group-left-2 .group a').eq(0).addClass('active');

    }

    $scope.viewTopic = function(index) {

      $scope.topicOpen = index;
      $scope.topicIndexCrumbs = $scope.topicActiveTopics[index]['indexCrumbs'];
      $scope.navigateTopic(null);

    }

    $scope.loadOverlay = function(index) {

      var overlay = $scope.topicActiveTopics[index]['overlay'];
      initialize(overlay);

    }



    $scope.search = function(imgNum) {

      console.log(imgNum);

      if(imgNum == 'zwei') {
        console.log('juhuu!');
        //$scope.blaa = null;
        $scope.image = 'img/map_suche.png';
      } else {
        $scope.blaa = 'zwei';
        $scope.image = 'img/map_suche_empty.png';
      }
      
    };

    $scope.legend = function() {
      $scope.image = 'img/map_legende.png';
    };

    $scope.options = function() {
      $scope.image = 'img/map_basiskartenoptionen.png';
    };



}]);


var atlasAnimations = angular.module('atlasAnimations', ['ngAnimate']);

