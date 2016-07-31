var appControllers = angular.module('appControllers', []);

appControllers.controller('searchController', [
    '$scope',
    function($scope) {
        $scope.fromLocations = {
            '0': 'Bondi Junction',
            '1': 'Circular Quay',
            '2': 'Central',
            '3': 'Martin Place',
            '4': 'Museum',
            '5': 'Olympic Park',
            '6': 'Redfern',
            '7': 'St James',
            '8': 'Town Hall',
            '9': 'Wynyard'
        };

        $scope.toLocations = {
            '0': 'Bondi Junction',
            '1': 'Circular Quay',
            '2': 'Central',
            '3': 'Martin Place',
            '4': 'Museum',
            '5': 'Olympic Park',
            '6': 'Redfern',
            '7': 'St James',
            '8': 'Town Hall',
            '9': 'Wynyard'
        };

        $scope.enabledVotingLocations = {};

        $scope.search = function() {
            var selectedFromLocation = $scope.selectedFromLocation;
            var selectedToLocation = $scope.selectedToLocation;

            $scope.routes = {
                '1': {
                    'stationId': '5',
                    'name': 'Olympic Park',
                    'fromLocation': true,
                    'toLocation': true,
                    'rating': 1,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
                '2': {
                    'stationId': '6',
                    'name': 'Redfern',
                    'fromLocation': false,
                    'toLocation': false,
                    'transit': {
                        'transitOrder': 1,
                        'transitTo': 'Town Hall'
                    },
                    'transitTo': 'Town Hall',
                    'rating': 3,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
                '3': {
                    'stationId': '2',
                    'name': 'Central',
                    'fromLocation': false,
                    'toLocation': false,
                    'transit': {
                        'transitOrder': 1,
                        'transitTo': 'Town Hall'
                    },
                    'rating': 1,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
                '4': {
                    'stationId': '8',
                    'name': 'Town Hall',
                    'fromLocation': false,
                    'toLocation': false,
                    'transit': {
                        'transitOrder': 2,
                        'transitTo': 'Bondi Junction'
                    },
                    'rating': 2,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
                '5': {
                    'stationId': '0',
                    'name': 'Bondi Junction',
                    'fromLocation': false,
                    'toLocation': true,
                    'rating': 3,
                    'enableVoting': true,
                    'currentUserRating': undefined
                },
            };
        };

        $scope.reset = function() {
            $scope.selectedFromLocation = -1;
            $scope.selectedToLocation = -1;
            $scope.routes = undefined;
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