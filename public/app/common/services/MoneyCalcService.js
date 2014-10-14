(function () {

	'use strict';

	angular.module('app')

		.factory('MoneyCalcService', ['$injector', function ($injector) {

			var LeaderboardDataService, ParticipantDataService;

			function calcTotalMoneyForParticipants() {
				if (!ParticipantDataService) { init(); }
				_(ParticipantDataService.participants).forEach(function (participant, idx) {
					var sumMoney = 0;
					_(participant.players).forEach(function (val, name) {
						sumMoney += lookupMoney(name);
					});
					participant.total_money = sumMoney;
				});
			}

			function lookupMoney(playerName) {
				if (!LeaderboardDataService) { init(); }
				var player = _.find(LeaderboardDataService.leaderboard, {'name': playerName});
				if (player) {
					return player.money_event || 0;
				} else {
					return 0;
				}
			}

			// Private functions

			function init() {
				//  Use $injector to overcome circular ref issue
				LeaderboardDataService = $injector.get('LeaderboardDataService');
				ParticipantDataService = $injector.get('ParticipantDataService');
			}

			return {
				"calcTotalMoneyForParticipants": calcTotalMoneyForParticipants,
				"lookupMoney": lookupMoney
			};

		}]);

})();
