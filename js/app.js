// Modul ClockApp
var clockapp = angular.module('ClockApp', [
	'ngRoute'

	]);

// Configuration
clockapp.config(function($logProvider){
	$logProvider.debugEnabled(false);
});


// Routing for the Views
// Default View ist der Uhrzeit-View
// Es werden eigene URLs für Uhrzeit und Stoppuhr-View erzeugt
// Die Controller werden je nach URL zugewiesen
clockapp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/uhrzeit', {
        templateUrl: 'partials/uhrzeit.html',
        controller: 'ClockController'
      }).
      when('/stoppuhr', {
        templateUrl: 'partials/stoppuhr.html',
        controller: 'StoppuhrControler'
      }).
      otherwise({
        redirectTo: '/uhrzeit'
      });
  }]);

// Run
clockapp.run(function($log){
	$log.debug("test debug");
});
