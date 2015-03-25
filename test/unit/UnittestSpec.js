'use strict';

/* jasmine specs for controllers go here */
describe('Test the business logic of the Angular Clock', function() {
  var element, scope, item;

  beforeEach(module('ClockApp'));


  /* ======================================== */
  /*          CONTROLLER TESTS                */
  /* ======================================== */
  describe('MainController', function(){
    describe('test location.path', function(){
      var scope, rootScope, ctrl, location;

      beforeEach(inject(function($location, $rootScope, $controller) {
          location = $location;
          rootScope = $rootScope;
          scope = $rootScope.$new();
          ctrl = $controller('MainController', {$scope: scope});
      }));

      it('should change location to /stoppuhr when setting it via goTo function', function() {
          location.path('/uhrzeit');
          rootScope.$apply();
          expect(location.path()).toBe('/uhrzeit');

          scope.goTo('/stoppuhr');
          expect(location.path()).toBe('/stoppuhr');
      });

      it('should change location to /uhrzeit when setting it via goTo function', function() {
          location.path('/stoppuhr');
          rootScope.$apply();
          expect(location.path()).toBe('/stoppuhr');

          scope.goTo('/uhrzeit');
          expect(location.path()).toBe('/uhrzeit');
      });
    });
  });


  describe('ClockController', function(){
    describe('test ...', function(){
      it('should check if clockDataService is available', inject(function($controller, _clockDataService_){
        var scope = {},
        clockDataService = _clockDataService_,
        ctrl = $controller('ClockController', {$scope:scope});

        expect(scope.ClockService).toBe(clockDataService);
      }));
    });
  });


  describe('StoppuhrController', function(){
    describe('test ....', function(){
      it('should check if stopwatch is available', inject(function($controller, _stopwatch_){
        var scope = {},
        stopwatch = _stopwatch_,
        ctrl = $controller('StoppuhrControler', {$scope:scope});

        expect(scope.StopWatch).toBe(stopwatch);
      }));
    });
  });







  /* ======================================== */
  /*            DIRECTIVE TESTS               */
  /* ======================================== */





  /* ======================================== */
  /*            SERVICE TESTS                 */
  /* ======================================== */
  describe('stopwatchService', function(){
    describe('test ....', function(){
      var scope, stopwatch, ctrl;

      beforeEach(inject(function($controller, _stopwatch_){
        scope = {};
        stopwatch = _stopwatch_;
        ctrl = $controller('StoppuhrControler', {$scope:scope});

      }));

      it('should start the stopwatch', function(){
        var start = scope.StopWatch.start();
        expect(start).toBe(true);
        expect(start).not.toBe(false);
      });
    });
  });




  describe('clockDataService', function(){
    describe('test ....', function(){
      var clockDataService;
      beforeEach(function(){
        inject(function(_clockDataService_) {
          clockDataService = _clockDataService_;
        });
      });



      it('should have an exciteText function', function () { 
        var plushour = clockDataService.plushour();
        expect(angular.isFunction(clockDataService.plushour)).toBe(true);
        expect(plushour).toBe(1);
      });

      // it('should increment the Clock +1', function(){
      //   var clockdata = clockDataService.clockdata;
      //   scope.ClockService = clockDataService;
      //   scope.ClockService.plushour();
      //   console.log(scope.ClockService.clockdata);
      // });
    });
  });





  

});
