(function () {

	'use strict';

	angular.module('app')

		.factory('PgaDisplayService', ['$filter', 'LeaderboardDataService', function ($filter, LeaderboardDataService) {

			var roundStatusDisplay = function () {
				if (LeaderboardDataService.tourneyStats === undefined) { return ''; }
				if (LeaderboardDataService.tourneyStats.round_state === 'In Progress') {
					return 'Round ' + LeaderboardDataService.tourneyStats.current_round + ' as of ' + $filter('date')(LeaderboardDataService.tourneyStats.last_updated, 'h:mm a') + ' local event time';
				} else if (LeaderboardDataService.tourneyStats.round_state === 'Groupings Official') {
					return 'Groupings are Official';
				} else if (LeaderboardDataService.tourneyStats.round_state === 'Suspended') {
					return 'Round ' + LeaderboardDataService.tourneyStats.current_round + ' - Suspended';
				} else if (LeaderboardDataService.tourneyStats.round_state === 'Official' || LeaderboardDataService.tourneyStats.round_state === 'Final') {
					return 'Round ' + LeaderboardDataService.tourneyStats.current_round + ' - Completed';
				} else if (LeaderboardDataService.tourneyStats.current_round === '4'
						   && (LeaderboardDataService.tourneyStats.round_state === 'Official'
						   || LeaderboardDataService.tourneyStats.round_state === 'Final')) {
					return 'Final Results';
				} else {
					return '';
				}
			};

			var displayUpdatesMsgFlag = function () {
				return (LeaderboardDataService.tourneyStats.round_state !== 'Official' && LeaderboardDataService.tourneyStats.round_state !== 'Final'
					&& LeaderboardDataService.tourneyStats.round_state !== 'Groupings Official');
			};

			return {
				"roundStatusDisplay": roundStatusDisplay,
				"displayUpdatesMsgFlag": displayUpdatesMsgFlag
			};

		}]);
	
})();