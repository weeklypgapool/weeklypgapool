'use strict';

angular.module('app')
	.controller('AppCtrl', ['$scope', '$firebase', '$filter', function ($scope, $firebase, $filter) {

    var ref = new Firebase("https://weeklypgapool.firebaseio.com/tournaments/current/data");

    // create an AngularFire reference to the data
    var sync = $firebase(ref);
		var data = sync.$asArray();
		var leaderboard = [];
		
		data.$loaded().then(function() {
			console.log(data);
			$scope.tourneyStatus = ExtractTourneyStatus(data);
			$scope.leaderboard = ExtractLeaderboard(data);
			data.$watch(function (event) {
				console.log(event);
				$scope.tourneyStatus = ExtractTourneyStatus(data);
				$scope.leaderboard = ExtractLeaderboard(data);
			});
		});
		
		$scope.roundStatusDisplay = function () {
			if ($scope.tourneyStatus === undefined) { return ''; }
			if (Object.keys($scope.tourneyStatus).length !== 8) {return ''; }
			if ($scope.tourneyStatus.is_finished) {
				return 'Final Results';
			} else if (!$scope.tourneyStatus.is_started) {
				return 'Tournament Has Not Yet Started';
			} else if ($scope.tourneyStatus.round_state === 'Official') {
				return 'Round ' + $scope.tourneyStatus.current_round + ' (completed)';
			} else {
				return 'Round ' + $scope.tourneyStatus.current_round + ' (updated ' + $filter('date')($scope.tourneyStatus.last_updated, 'hh:mm a') + ' local event time)';
			}
		};
		
		function ExtractTourneyStatus(data) {
			var status = {};
			status.last_updated = data[data.$indexFor('last_updated')].$value;
			status.tournament_name = data[data.$indexFor('tournament_name')].$value;
			status.current_round = data[data.$indexFor('current_round')].$value;
			status.round_state = data[data.$indexFor('round_state')].$value;
			status.start_date = data[data.$indexFor('start_date')].$value;
			status.end_date = data[data.$indexFor('end_date')].$value;
			status.is_started = data[data.$indexFor('is_started')].$value;
			status.is_finished = data[data.$indexFor('is_finished')].$value;
			return status;
		}
		
		function ExtractLeaderboard(data) {
			return data[data.$indexFor('leaderboard')];
		}

	}]);
		
