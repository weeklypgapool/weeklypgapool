'use strict';

angular.module('app')
	.controller('appCtrl', ['$rootScope', '$scope', '$location', '$firebase', '$filter', 'constants', function ($rootScope, $scope, $location, $firebase, $filter, constants) {

		var refStats = new Firebase(constants.baseRefUrl + '/current/data/stats');
		var refLeaderboard = new Firebase(constants.baseRefUrl + '/current/data/leaderboard');
		var refParticipants = new Firebase(constants.baseRefUrl + '/current/participants');
		var syncStats = $firebase(refStats);
		var syncLeaderboard = $firebase(refLeaderboard);
		var syncParticipants = $firebase(refParticipants);
		$rootScope.tourneyStats = syncStats.$asObject();
		$rootScope.leaderboard = syncLeaderboard.$asArray();
		$rootScope.participants = syncParticipants.$asArray();
		
		// Build player list
		$rootScope.leaderboard.$loaded().then(function () {
			$scope.playerList = _($rootScope.leaderboard).pluck('name').sort().value();
			CalcTotalMoneyForParticipant();
			$rootScope.leaderboard.$watch(function (evt) {
				var playerName = $rootScope.leaderboard[evt.key];
				if (playerName) {
					playerName = playerName.name;
				} else {
					return;
				}
				// Recalc each participant with player
				CalcTotalMoneyForParticipant();
			});
			$rootScope.participants.$watch(function (evt) {
				CalcTotalMoneyForParticipant();
			});
		});

//		$scope.roundStatusDisplay = function () {
//			if ($rootScope.tourneyStats === undefined) { return ''; }
//			if ($rootScope.tourneyStats.round_state === 'In Progress') {
//				return 'Round ' + $rootScope.tourneyStats.current_round + ' as of ' + $filter('date')(new Date($rootScope.tourneyStats.last_updated), 'h:mm a') + ' local event time';
//			} else if ($rootScope.tourneyStats.round_state === 'Groupings Official') {
//				return 'Groupings are Official';
//			} else if ($rootScope.tourneyStats.round_state === 'Suspended') {
//				return 'Round ' + $rootScope.tourneyStats.current_round + ' - Suspended';
//			} else if ($rootScope.tourneyStats.round_state === 'Official' || $rootScope.tourneyStats.round_state === 'Final') {
//				return 'Round ' + $rootScope.tourneyStats.current_round + ' - Completed';
//			} else if ($rootScope.tourneyStats.current_round === '4' &&
//				($rootScope.tourneyStats.round_state === 'Official' || $rootScope.tourneyStats.round_state === 'Final')) {
//				return 'Final Results';
//			} else {
//				return '';
//			}
////			} else if (!$rootScope.tourneyStats.is_started) {
////				return 'Tournament Has Not Yet Started';
//		};
//		
//		$scope.displayUpdatesMsgFlag = function () {
//			return ($rootScope.tourneyStats.round_state !== 'Official' && $rootScope.tourneyStats.round_state !== 'Final'
//						 && $rootScope.tourneyStats.round_state !== 'Groupings Official');
//		};
		
		$scope.getBtnClass = function (path) {
			if ($location.path().substr(0, path.length) === path) {
				return "btn-primary";
			} else {
				return "btn-default";
			}
		};
		
		$scope.lookupMoney = function (playerName) {
			var player = _.find($rootScope.leaderboard, {'name': playerName});
			if (player) {
				return player.money_event || 0;
			} else {
				return 0;
			}
		};
		
		function CalcTotalMoneyForParticipant () {
			$rootScope.participants.$loaded().then(function () {
				_($rootScope.participants).forEach(function (participant, idx) {
					var sumMoney = 0;
					_(participant.players).forEach(function (val, name) {
						sumMoney += $scope.lookupMoney(name);
					});
					participant.total_money = sumMoney;
				});
			});
		}
													
	}]);

	