(function() {
    'use strict';

    angular
        .module('resultsModule.resultsControllers', ['resultsModule.resultsFactories'])
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$rootScope', 'GetResults', '$location', 'StoreResults', 'Pagination', 'Filters'];

    function mainCtrl($rootScope, GetResults, $location, StoreResults, Pagination, Filters) {
        var vm = this;

        vm.name = function() {
            console.log('Jaspreet Singh');
        };
        var pageSize = 3;
        vm.currentPage = 1;
        vm.lastPage = '';
        vm.paginationList = '';
        vm.listData = '';
        vm.pageListData = [];
        vm.getListData = (function() {
            GetResults.getContent()
                .then(function() {
                    vm.listData = StoreResults.get();
                    vm.lastPage = Math.ceil(vm.listData.length / pageSize);
                    vm.paginationList = Pagination.initialPagination(vm.lastPage);
                    getPageData(vm.currentPage);
                    console.log(vm.paginationList);
                });
        })();

        vm.onPageChange = function(current) {
            if (current != '...') {
                vm.currentPage = current;
                vm.paginationList = Pagination.getUpdatedPageList(vm.currentPage);
                getPageData(vm.currentPage);
                console.log(vm.paginationList);
            }
        };

        vm.onNextPage = function() {
            if (vm.currentPage < vm.lastPage) {
                vm.currentPage += 1;
                vm.paginationList = Pagination.getUpdatedPageList(vm.currentPage);
                getPageData(vm.currentPage);
                console.log(vm.paginationList);
            }
        };
        vm.onPrevPage = function() {
            if (vm.currentPage > 1) {
                vm.currentPage -= 1;
                vm.paginationList = Pagination.getUpdatedPageList(vm.currentPage);
                getPageData(vm.currentPage);
                console.log(vm.paginationList);
            }
        };

        vm.applyFilters = function(id) {
            vm.filterValues = Filters.applyFilters(id);
            console.log(vm.filterValues);
        };

        function getPageData(pageNumber) {
            vm.pageListData = [];
            for (var i = (((pageNumber - 1) * pageSize) + 1); i <= (pageNumber) * pageSize && i <= vm.listData.length; i++) {
                vm.pageListData.push(vm.listData[i - 1]);
            }
            console.log('New data');
            console.log(vm.pageListData);
        };

        return vm;
    };


})();

//https://api.myjson.com/bins/jpu6v