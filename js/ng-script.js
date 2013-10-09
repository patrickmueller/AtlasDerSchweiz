function TopicCtrl($scope) {

	$scope.natures = [
		{text:'Wetter und Klima', icon: 'sdjkfskjd', category: 'nature'},
		{text:'Wasser', category: 'nature'},
		{text:'Eis und Schnee', category: 'nature'},
		{text:'Geologie und Rohstoffe', category: 'nature'},
		{text:'Boden', category: 'nature'},
		{text:'Landschaften', category: 'nature'},
		{text:'Pflanzen', category: 'nature'},
		{text:'Tiere', category: 'nature'},
	];

	$scope.weather = [
		{text:'Wetter und Klima', category: 'weather'},
		{text:'Wasser', category: 'weather'},
		{text:'Eis und Schnee', category: 'weather'},
		{text:'Geologie und Rohstoffe', category: 'weather'},
		{text:'Boden', category: 'weather'},
		{text:'Landschaften', category: 'weather'},
		{text:'Pflanzen', category: 'weather'},
		{text:'Tiere', category: 'weather'},
	];

	$scope.addTodo = function() {
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
	};

	$scope.remaining = function() {

		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});

		return count;

	};

	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
			if (!todo.done) $scope.todos.push(todo);
		});
	};
}	



function OptionsCtrl($scope) {

	$scope.image = '';

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