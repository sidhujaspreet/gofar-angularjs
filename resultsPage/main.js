(function() {
    'use strict';

    angular
        .module('resultsModule', [
            //'ngRoute',
            'resultsModule.resultsControllers',
            'resultsModule.resultsDirectives',
            'resultsModule.resultsServices',
            'resultsModule.resultsFactories'
        ]);
    /*
    .config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl : ".html"
        })
        .when("/", {
            templateUrl : ".html"
        })
        .when("/", {
            templateUrl : ".html"
        });
    });*/
})();