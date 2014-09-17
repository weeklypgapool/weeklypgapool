(function () {

	'use strict';
	
	angular.module('app')

		.factory('LeaderboardDataService', ['$firebase', '$q', 'constants', 'MoneyCalcService', function ($firebase, $q, constants, MoneyCalcService) {

			// Tourney stats
			var refStats = new Firebase(constants.baseRefUrl + '/current/data/stats');
			var syncStats = $firebase(refStats);
			var tourneyStats = syncStats.$asObject();

			// Leaderboard data
			var refLeaderboard = new Firebase(constants.baseRefUrl + '/current/data/leaderboard');
			var syncLeaderboard = $firebase(refLeaderboard);
			var leaderboard = syncLeaderboard.$asArray();

			// Player list (static after initial leaderboard is loaded)
			var playerList = $q.defer();

			// When leaderboard data is loaded...
			leaderboard.$loaded().then(function () {
				// Build playerList
				var list = _(leaderboard).pluck('name').sort().value();
				playerList.resolve(list);
			});

			// Recalc money when leaderboard changes
			leaderboard.$watch(function (evt) {
				var playerName = leaderboard[evt.key];
				if (playerName) {
					playerName = playerName.name;
				} else {
					return;
				}
				MoneyCalcService.calcTotalMoneyForParticipants();
			});

			// reveal LeaderboardDataService props and methods
			return {
				"tourneyStats": tourneyStats,
				"leaderboard": leaderboard,
				"playerList": playerList.promise
			};
		}]);
	
})();