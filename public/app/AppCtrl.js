'use strict';

angular.module('app')
	.controller('AppCtrl', ['$scope', '$firebase', '$filter', function ($scope, $firebase, $filter) {

    var ref = new Firebase("https://weeklypgapool.firebaseio.com/tournaments/current/data");

    // create an AngularFire reference to the data
    var sync = $firebase(ref);
		var data = sync.$asArray();
		var leaderboard = [];
		
		data.$loaded().then(function () {
			var tourneyStatus = ExtractTourneyStatus(data);
			$scope.tourneyStatus = tourneyStatus;
			console.log(tourneyStatus);			
			
			var leaderboard = ExtractLeaderboard(data);
			$scope.leaderboard = leaderboard;
			console.log(leaderboard);
		});
		
		$scope.roundStatusDisplay = function () {
			if ($scope.tourneyStatus === undefined) return '';
			if ($scope.tourneyStatus.round_state == 'Official') {
				return 'Round ' + $scope.tourneyStatus.current_round + ' (completed)';	
			} else {
				return 'Round ' + $scope.tourneyStatus.current_round + ' (updated ' + $filter('date')($scope.tourneyStatus.last_updated, 'hh:mm a') + ' local event time)';
			};
		}
		
		function ExtractTourneyStatus (data) {
			var statusData = data[data.$indexFor('leaderboard')];
			var status = {
				"tournament_name": statusData.tournament_name,
				"current_round": statusData.current_round,
				"round_state": statusData.round_state,
				"start_date": statusData.start_date,
				"end_date": statusData.end_date,
				"is_started": statusData.is_started,
				"is_finished": statusData.is_finished
			};
			status.last_updated = data[data.$indexFor('last_updated')].$value;
			return status;
		}
		
		function ExtractLeaderboard (data) {
			var players = data[data.$indexFor('leaderboard')].players;
			var leaderboard = _.map(players, function (player) {
				return {
					"name": player.player_bio.first_name + ' ' + player.player_bio.last_name,
					"player_id": player.player_id,
					"current_position": player.current_position,
					"total_strokes": player.total_strokes,
					"thru": player.thru,
					"today": player.today,
					"total": player.total,
					"money_event": player.rankings.projected_money_event
				};
			});
			return leaderboard;
		}

		
	}]);
		
