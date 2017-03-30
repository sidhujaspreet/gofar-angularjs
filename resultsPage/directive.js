(function() {
    'use strict';

    angular
        .module('resultsModule.resultsDirectives', [])
        .directive('getChildrenid', getChildrenid);

    function getChildrenid() {
        return {
            restrict: 'A',
            scope: {
                applyfilters: "="
            },
            link: function(scope, element, attributes) {
                var children = element[0].querySelectorAll('a'); //get all child div's
                angular.forEach(children, function(child) { //loop over all the child
                    var ngElement = angular.element(child); //create an angular element of the child
                    ngElement.on('click', function() { //bind to the click event
                        console.log(ngElement.attr('id'));
                        scope.applyfilters(ngElement.attr('id'));
                    });
                });
            }
        };
    };

})();