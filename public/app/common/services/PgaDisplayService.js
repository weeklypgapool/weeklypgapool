'use strict';

angular.module('app')

.factory('PgaDisplayService', ['$rootScope', '$filter', 'PgaDataService', function ($rootScope, $filter, PgaDataService) {
	
	var roundStatusDisplay = function () {
		if ($rootScope.tourneyStats === undefined) { return ''; }
		if ($rootScope.tourneyStats.round_state === 'In Progress') {
			return 'Round ' + $rootScope.tourneyStats.current_round + ' as of ' + $filter('date')($rootScope.tourneyStats.last_updated, 'h:mm a') + ' local event time';
		} else if ($rootScope.tourneyStats.round_state === 'Groupings Official') {
			return 'Groupings are Official';
		} else if ($rootScope.tourneyStats.round_state === 'Suspended') {
			return 'Round ' + $rootScope.tourneyStats.current_round + ' - Suspended';
		} else if ($rootScope.tourneyStats.round_state === 'Official' || $rootScope.tourneyStats.round_state === 'Final') {
			return 'Round ' + $rootScope.tourneyStats.current_round + ' - Completed';
		} else if ($rootScope.tourneyStats.current_round === '4' &&
			($rootScope.tourneyStats.round_state === 'Official' || $rootScope.tourneyStats.round_state === 'Final')) {
			return 'Final Results';
		} else {
			return '';
		}
	};

	var displayUpdatesMsgFlag = function () {
		return ($rootScope.tourneyStats.round_state !== 'Official' && $rootScope.tourneyStats.round_state !== 'Final'
			&& $rootScope.tourneyStats.round_state !== 'Groupings Official');
	};

	return {
		"roundStatusDisplay": roundStatusDisplay,
		"displayUpdatesMsgFlag": displayUpdatesMsgFlag
	};
}]);