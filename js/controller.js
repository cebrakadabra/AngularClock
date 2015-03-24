// Maincontroller
clockapp.controller('MainController', ['$scope', '$location', function($scope, $location){
	
	// goTo wird benutzt um zwischen den Routingviews
	// leichter hin und her navigieren zu können
	$scope.goTo = function ( path ) {
      $location.path( path );
    };

}]);


// Clockcontroller
clockapp.controller('ClockController', ['$scope', 'clockDataService', function($scope, clockDataService) {

	// übergibt dem Scope des ClockControllers den clockDataService
    $scope.ClockService = clockDataService;

}]);


// Stoppuhrcontroller
clockapp.controller('StoppuhrControler', ['$scope', 'stopwatch', function($scope, stopwatch){

	// übergibt dem Scope des StoppuhrControlers den stopwatch(Service)
	$scope.StopWatch = stopwatch;
	$scope.orderProp = 'ID';

}]);
