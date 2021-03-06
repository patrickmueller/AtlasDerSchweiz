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

    $routeProvider.when('/projects2', {
      templateUrl: '/project.html',
      controller: 'Project2Cntl',
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
     'image': 'img/start/projektuebersicht-04.png'}
  ];
  navigationControl();
}]);


atlasControllers.controller('ProjectCntl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    console.log($routeParams);
    $scope.maps = [
      {'title': 'Kartenübersicht',
        'name': 'Walensee',
       'image': '/img/start/map_03.png'},
      {'name': 'Vierwaldstättersee',
       'image': '/img/start/map_01.png'},
      {'name': 'Bodensee',
       'image': '/img/start/map_02.png'}
    ];
    $scope.title = $routeParams['projectId'];
    navigationControl();
}]);


atlasControllers.controller('Project2Cntl', ['$scope',
  function($scope) {

    $scope.maps = [
      {'title': 'Kartenübersicht',
        'name': 'Erwerbstätigkeit Frauen',
       'image': '/img/start/journi_01.png'},
      {'name': 'Pendler und Arbeitslosigkeit',
       'image': '/img/start/journi_02.png'},
      {'name': 'Auslender arbeitslos',
       'image': '/img/start/journi_03.png'}
    ];

    $scope.title = 'Bildung an der Grenze';
    navigationControl();

}]);


atlasControllers.controller('MapCntl', ['$scope', '$sce', '$routeParams',
  function($scope, $sce, $routeParams, $http, $templateCache) {

    // outsourced functionality
    navigationControl();
    initialize('');


    var pressTimer;

    /***************************************************************************************************
      * funktioniert vielleicht nicht mehr wegen fastclick.js!!!!!!!!!!!!!                                          ACHTUNGACHTUNG
      **************************************************************************************************/
    $(document).on('mouseup', '.button-touch', function() {
      clearTimeout(pressTimer);
      $(document).on('click', '.button', menuControl);
      // Clear timeout
      return false;
    });

    $(document).on('mousedown', '.button-touch', function() {
      // Set timeout
      pressTimer = window.setTimeout(function() { 
        alert('Yes, I recognized a long tap!');
        $(document).off('click', '.button', menuControl);
      }, 
      1000)
      return false; 
    });





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
    $scope.searchImgIndex = 0;
    
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
              for (var j = 0; j < thisTopic.length; j++) {
                thisTopic[j]['class'] = '';
              }

              if(index != null) {
                $scope.addTopic(index);
              } else {
                thisTopic[x[i]]['class'] = 'selected';
                $scope.topicIndexCrumbs.pop();
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
      var legend = $scope.topicList[index]['legend'];

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
        overlay: overlay,
        legend: legend
      };

      if($scope.topicOpen != null) {
        $scope.topicActiveTopics[index] = arr;
      } else {
        $scope.topicActiveTopics.push(arr);
      }

      $scope.viewTopic(index);
      $scope.loadOverlay(index);
      closeMenu($('#group-left-2 .button'));

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

      var topics = $scope.topicActiveTopics;
      var overlays = new Array();

      angular.forEach(topics, function(topic) {
        if(topic.overlay) overlays.push(topic.overlay);
      });

      mapSetOverlay(overlays);

    }



    $scope.search = function(stat) {

      if(stat == 2) {
        $scope.optenMenuValue = 'search2';
      } else if(stat == 3) {
        closeMenu($('#group-right .button'));
        addSearchMarker();
        $scope.optenMenuValue = 'search2';
      } else {
        $scope.optenMenuValue = 'search1';
      }
      
    };

    $scope.legend = function() {

      $scope.optenMenuValue = 'legend';

      var topics = $scope.topicActiveTopics;
      $scope.images = new Array();
      $scope.images.push('/img/legenden/titel.png');

      angular.forEach(topics, function(topic) {
        if(topic.legend) $scope.images.push(topic.legend);
      });

      $scope.images.push('/img/legenden/standort.png');

    };

    $scope.options = function() {
      $scope.optenMenuValue = 'options';
    };



}]);


var atlasAnimations = angular.module('atlasAnimations', ['ngAnimate']);

