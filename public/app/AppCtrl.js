'use strict';

angular.module('app')
	.controller('appCtrl', ['$rootScope', '$scope', '$location', '$firebase', function ($rootScope, $scope, $location, $firebase) {

		var refStats = new Firebase("https://weeklypgapool.firebaseio.com/tournaments/current/data/stats");
		var refLeaderboard = new Firebase("https://weeklypgapool.firebaseio.com/tournaments/current/data/leaderboard");
		var refParticipants = new Firebase("https://weeklypgapool.firebaseio.com/tournaments/current/participants");
		var syncStats = $firebase(refStats);
		var syncLeaderboard = $firebase(refLeaderboard);
		var syncParticipants = $firebase(refParticipants);
		$rootScope.tourneyStats = syncStats.$asObject();
		$rootScope.leaderboard = syncLeaderboard.$asArray();
		$rootScope.participants = syncParticipants.$asArray();
		
		// Build player list
		$rootScope.leaderboard.$loaded().then(function () {
			$rootScope.playerList = _($rootScope.leaderboard).pluck('name').sort().value();
			// Compute total money
			$rootScope.participants.$loaded().then(function () {
				_($rootScope.participants).forEach(function (participant, idx) {
					var sumMoney = 0;
					_(participant.players).forEach(function (val, name) {
						sumMoney += $scope.lookupMoney(name);
					});
					participant.total_money = sumMoney;
				});
			});
			$rootScope.leaderboard.$watch(function (evt) {
				var playerName = $rootScope.leaderboard[evt.key].name;
				// Recalc each participant with player
				_.forEach($rootScope.participants, function (participant, idx) {
					if (participant.players[playerName]) {
						var sumMoney = 0;
						_(participant.players).forEach(function (val, name) {
							sumMoney += $scope.lookupMoney(name);
						});
						participant.total_money = sumMoney;
					}
				});
			});
		});

		$scope.roundStatusDisplay = function () {
			if ($rootScope.tourneyStats === undefined) { return ''; }
			if ($rootScope.tourneyStats.is_finished) {
				return 'Final Results';
			} else if (!$rootScope.tourneyStats.is_started) {
				return 'Tournament Has Not Yet Started';
			} else if ($rootScope.tourneyStats.round_state === 'Official') {
				return 'Round ' + $rootScope.tourneyStats.current_round + ' (completed)';
			} else {
				return 'Round ' + $rootScope.tourneyStats.current_round + ' as of ' + $filter('date')($rootScope.tourneyStats.last_updated, 'hh:mm a') + ' local event time (updates automatically)';
			}
		};
		
		$scope.getBtnClass = function (path) {
			if ($location.path().substr(0, path.length) === path) {
				return "btn-primary";
			} else {
				return "";
			}
		};
		
		$scope.lookupMoney = function (playerName) {
			return _.find($rootScope.leaderboard, {'name': playerName}).money_event;
		};
		
		// Participant Factory Override to add SumMoney property
//		var ParticipantFactory = $FirebaseObject.$extendFactory({/* stuff in here */});
//		$rootScope.participants = 
		
	}]);

	