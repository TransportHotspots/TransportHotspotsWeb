var appControllers = angular.module('appControllers', []);

appControllers.controller('searchController', [
    '$scope',
    function($scope) {
        var vm = this;
        vm.currentUserRating = undefined;

        $scope.fromLocations = {
            '0': 'North Sydney',
            '1': 'b',
            '2': 'c',
            '3': 'd',
            '4': 'e'
        };

        $scope.toLocations = {
            '0': 'North Sydney',
            '1': 'b',
            '2': 'c',
            '3': 'd',
            '4': 'e'
        };

        $scope.enabledVotingLocations = {};

        $scope.search = function() {
            var selectedFromLocation = $scope.selectedFromLocation;
            var selectedToLocation = $scope.selectedToLocation;

            $scope.routes = {
                '0': {
                    'name': 'Wynyard',
                    'fromLocation': true,
                    'toLocation': true,
                    'isTransit': false,
                    'rating': 2,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
                '1': {
                    'name': 'Town Hall',
                    'fromLocation': false,
                    'toLocation': false,
                    'isTransit': true,
                    'rating': 1,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
                '2': {
                    'name': 'Central',
                    'fromLocation': false,
                    'toLocation': true,
                    'isTransit': false,
                    'rating': 3,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
            };
        };

        $scope.reset = function() {
            $scope.fromLocations = -1;
            $scope.toLocations = -1;
        };

        $scope.toggleVoting = function(stationId) {
            var enableVoting = $scope.enabledVotingLocations[stationId];
            if (enableVoting === undefined) {
                $scope.enabledVotingLocations[stationId] = true;
            } else {
                $scope.enabledVotingLocations[stationId] = !enableVoting;
            }
        };

        $scope.enableVoting = function(stationId) {
            return $scope.enabledVotingLocations[stationId];
        };

        $scope.submitRating = function(stationId, locationData) {
            var rating = locationData.currentUserRating;

            // TODO Submit user rating to server

            this.toggleVoting(stationId);
            locationData.enableVoting = false;
        }
    }
]);