'use strict';

angular.module('app')
	.controller('leaderboardCtrl', ['$scope', '$filter', 'LeaderboardDataService', 'PgaDisplayService', function ($scope, $filter, LeaderboardDataService, PgaDisplayService) {
		
		$scope.tourneyStats = LeaderboardDataService.tourneyStats;
		$scope.leaderboard = LeaderboardDataService.leaderboard;
		$scope.roundStatusDisplay = PgaDisplayService.roundStatusDisplay;
		
		$scope.displayMoney = function () {
			return ($scope.tourneyStats.round_state !== 'Groupings Official');
		};
		
		$scope.playingStatus = function (player) {
			if (player.today === undefined || player.thru === '') {
				return 'waiting';
			} else {
				if (player.current_position === 'CUT' || player.current_position === 'WD' || (player.today === undefined  && player.current_position === '')) {
					return 'out';
				} else {
					return 'playing';
				}
			}
		};

	}]);
