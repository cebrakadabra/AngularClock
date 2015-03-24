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

    });
  });


  describe('StoppuhrController', function(){
    describe('test ....', function(){

    });
  });







  /* ======================================== */
  /*          DIRECTIVE TESTS                */
  /* ======================================== */





  /* ======================================== */
  /*          SERVICE TESTS                */
  /* ======================================== */
 
  it('should work', function(){
    expect(1).toBe(1);
  });

});
