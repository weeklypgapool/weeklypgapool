'use strict';

angular.module('app')
	.controller('leaderboardCtrl', ['$rootScope', '$scope', '$filter', 'PgaDisplayService', function ($rootScope, $scope, $filter, PgaDisplayService) {
		
		$scope.roundStatusDisplay = PgaDisplayService.roundStatusDisplay;
		
		$scope.displayMoney = function () {
			return ($rootScope.tourneyStats.round_state !== 'Groupings Official');
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
