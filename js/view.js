// Wiederverwendbare Directive für die DigitalClock mit eigenem Scope
clockapp.directive('digitalClock', function() {
    return {
    	scope: {
    		digital: '@',
    		offset: '@'
    	},
        templateUrl: 'partials/digitalclock.html'
    };
});

// Wiederverwendbare Directive für die AnalogClock mit eigenem Scope
clockapp.directive('analogClock', function() {
    return {
        scope: {
            hourrotation: '@',
            minuterotation: '@',
            secondrotation: '@',
            offset: '@'
        },
        templateUrl: 'partials/analogclock.html'
    };
});

// Habe eine Directive ngEnter erstellt, damit ich bei einem
// Textfeld per Enter auch eine Funktion wie bei ng-click bei einem 
// Button ausführen zu können
clockapp.directive('ngEnter', function () {
    return {
        controller: 'MainController',
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        }
    };
});
