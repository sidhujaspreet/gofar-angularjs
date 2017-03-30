(function() {
    'use strict';

    angular
        .module('resultsModule.resultsFactories', [])
        .factory('GetResults', GetResults)
        .factory('StoreResults', StoreResults)
        .factory('Pagination', Pagination)
        .factory('Filters', Filters);

    GetResults.$inject = ['$http', 'StoreResults'];
    StoreResults.$inject = [];
    Pagination.$inject = [];
    Filters.$inject = [];

    function GetResults($http, StoreResults) {
        return {
            getContent: function() {
                //return the promise directly.
                return $http.get('https://api.myjson.com/bins/hwkyd')
                    .then(function(response) {
                        //resolve the promise as the data
                        StoreResults.set(response.data);
                    });
            }
        }
    };

    function StoreResults() {
        var allResults = '';
        return {
            get: function() {
                return allResults;
            },
            set: function(data) {
                allResults = data;
            }
        }
    };

    function Pagination() {
        var self = {};

        var current = 1;
        var last = "";
        var a = [];
        var b = [];


        self.init = function() {
            a = [];
            b = [];
        };

        self.initialPagination = function(lastPage) {
            self.init();
            last = lastPage;
            for (var i = 1; i <= last; i++) {
                a.push(i);
            }

            if (last <= 4) {
                b = a;
            } else {
                self.getUpdatedPageList(parseInt(current));
            }
            return b;
        };

        self.getUpdatedPageList = function(current) {
            if (last <= 4) {
                return b;
            }
            self.init();
            if (current == 1 || current == 2 || current == last - 1 || current == last) {
                if (current == 1 || current == 2) {
                    b = [1, 2, 3, '...'];
                    if (last > 4) {
                        b.push(last);
                    } else {
                        b[3] = 4;
                    }
                } else {
                    b = ['...', last - 2, last - 1, last];
                    if (last - 3 > 1) {
                        b.unshift(1);
                    } else {
                        b[0] = 1;
                    }
                }
            } else {
                b = ['...', current - 1, current, current + 1, '...'];
                if (last > current + 2) {
                    b.push(last);
                } else {
                    b[4] = last;
                }
                if (current - 2 > 1) {
                    b.unshift(1);
                } else {
                    b[0] = 1;
                }
            }
            return b;
        };

        return self;
    };

    function Filters() {
        var self = {};
        var season = {
            1: [1, 2, 3],
            2: [4, 5, 6],
            3: [7, 8, 9],
            4: [10, 11, 12]
        };

        self.applyFilters = function(id) {
            var filters = self.resetFilters();
            var splitValue = id.split('|');
            if (splitValue[0] == 'season') {
                filters.time = season[splitValue[1]];
            } else if (splitValue[0] == 'month') {
                filters.time.push(parseInt(splitValue[1]));
            } else if (splitValue[0] == 'price') {
                var priceRange = splitValue[1].split('-');
                filters['price'].push(parseInt(priceRange[0]));
                filters['price'].push(parseInt(priceRange[1]));
            } else {
                filters[splitValue[0]] = splitValue[1];
            }
            return filters;
        };

        self.resetFilters = function() {
            return {
                theme: '',
                purpose: '',
                region: '',
                price: [],
                time: []
            };
        };
        return self;
    };

})();