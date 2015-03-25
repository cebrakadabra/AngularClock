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

  describe('digitalclock.html', function() {
      var $compile, $rootScope, template;
 
 
      //load all modules, including the html template, needed to support the test
      beforeEach(module('ClockApp',
        'partials/digitalclock.html'));
     
      beforeEach(inject(function($templateCache,_$compile_,_$rootScope_) {
     
        //assign the template to the expected url called by the directive and put it in the cache
        template = $templateCache.get('partials/digitalclock.html');
        $templateCache.put('partials/digitalclock.html',template);
     
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      }));

      it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div digital-Clock></div>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("Clock is displaying UTC Time:");
      });
  });

  describe('digitalclock.html', function() {
      var $compile, $rootScope, template;
 
 
      //load all modules, including the html template, needed to support the test
      beforeEach(module('ClockApp',
        'partials/analogclock.html'));
     
      beforeEach(inject(function($templateCache,_$compile_,_$rootScope_) {
     
        //assign the template to the expected url called by the directive and put it in the cache
        template = $templateCache.get('partials/analogclock.html');
        $templateCache.put('partials/analogclock.html',template);
     
        $compile = _$compile_;
        $rootScope = _$rootScope_;
      }));

      it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div analog-Clock></div>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain('hours');
      });
  });

  describe('Directive: ngEnter', function () {
    beforeEach(module('ClockApp'));
    var element,
        scope;

    beforeEach(inject(function ($rootScope) {

      scope = $rootScope;
      scope.mockFunction = function(){};
      compileDirective();

    }));

    /**
     * Compile the directive into HTML
     */
    function compileDirective(){
      element = angular.element('<input type="text" ng-enter="mockFunction()" />');
      inject(function($compile){
        element = $compile(element)(scope);
      });
      scope.$apply();
    }

    it('it should call the mock function on pressing enter', function () {
      spyOn(scope,'mockFunction');
      var e = jQuery.Event('keypress');
      e.which = 13; //choose the one you want
      e.keyCode = 13;
      element.triggerHandler(e);
      expect(scope.mockFunction).toHaveBeenCalled();
    });

  });



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

      it('should stop the stopwatch', function(){
        scope.StopWatch.start();
        var stop = scope.StopWatch.stop();
        expect(stop).toBe(true);
        expect(stop).not.toBe(false);
      });

      it('should reset the stopwatch', function(){
        scope.StopWatch.start();
        scope.StopWatch.stop();
        scope.StopWatch.reset();

        var emptyArray = [];
        
        expect(scope.StopWatch.stopwatchdata.timevalue).toBe(0);
        expect(scope.StopWatch.stopwatchdata.timevalueID).toBe(0);
        expect(scope.StopWatch.stopwatchdata.description).toEqual("");
        expect(scope.StopWatch.stopwatchdata.timelist).toEqual(emptyArray);

      });


      it('should save the progress of the stopwatch', function(){
        scope.StopWatch.start();
        var timevalueID = scope.StopWatch.stopwatchdata.timevalueID;
        scope.StopWatch.stop();
        scope.StopWatch.save();
        scope.StopWatch.save();
        scope.StopWatch.save();
        scope.StopWatch.save();
        
        expect(timevalueID).toBe(0); 
        expect(scope.StopWatch.stopwatchdata.timevalueID > 0).toBeTruthy();
        expect(scope.StopWatch.stopwatchdata.timelist).not.toBeNull();

      });


      it('should clear the list of the stopwatch', function(){
        scope.StopWatch.start();
        scope.StopWatch.stop();
        scope.StopWatch.save();
        scope.StopWatch.save();
        scope.StopWatch.save();
        scope.StopWatch.save();
        scope.StopWatch.clearlist();

        var emptyArray = [];
        
        expect(scope.StopWatch.stopwatchdata.description).toEqual("");
        expect(scope.StopWatch.stopwatchdata.timelist).toEqual(emptyArray);

      });


      it('should delete an item out of list of stopwatch', function(){
        scope.StopWatch.start();
        scope.StopWatch.stop();
        scope.StopWatch.save();
        scope.StopWatch.save();
        scope.StopWatch.save();
        scope.StopWatch.save();

        var itemToDelete = scope.StopWatch.stopwatchdata.timelist[2];

        scope.StopWatch.deleteitem(itemToDelete);
        expect(scope.StopWatch.stopwatchdata.timelist[2].ID).not.toEqual(3);
        

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



      it('should increment offsetHour +1', function () { 
        var plushour = clockDataService.plushour();
        // console.log(plushour);
        expect(angular.isFunction(clockDataService.plushour)).toBe(true);
        expect(plushour).toBe(1);
      });

      it('should decrement offsetHour -1', function () { 
        var minushour = clockDataService.minushour();
        // console.log(minushour);
        expect(angular.isFunction(clockDataService.minushour)).toBe(true);
        expect(minushour).toBe(-1);
      });

      it('should reset offsetHour to 0', function () { 
        var resetToLocal = clockDataService.resetToLocal();
        // console.log(resetToLocal);
        expect(angular.isFunction(clockDataService.resetToLocal)).toBe(true);
        expect(resetToLocal).toBe(0);
      });


    });
  });





  

});
