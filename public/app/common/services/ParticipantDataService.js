(function () {

	'use strict';

	angular.module('app')

		.factory('ParticipantDataService', ['$rootScope', '$firebase', 'constants', 'MoneyCalcService', function ($rootScope, $firebase, constants, MoneyCalcService) {

			var service = {};

			// Participants data
			var refParticipants = new Firebase(constants.baseRefUrl + '/current/participants');
			var syncParticipants = $firebase(refParticipants);
			var participants = syncParticipants.$asArray();
			var histogram = [];

			participants.$watch(function (evt) {
				MoneyCalcService.calcTotalMoneyForParticipants();
				updateHistogram();
			});

			service.refParticipants = refParticipants;
			service.participants = participants;
			service.histogram = histogram;

			return service;

			function updateHistogram() {
				service.histogram = [];
				var working = {};
				participants.forEach(function(part) {
				  var players = Object.keys(part.players);
				  players.forEach(function(player){
				    if (working[player]) {
				      working[player]++;
				    } else {
				      working[player] = 1;
				    }
				  });
				});
				Object.keys(working).forEach(function(playerName) {
					service.histogram.push({player: playerName, count: working[playerName]});
				})
				service.histogram = _.sortBy(service.histogram, ['count', 'player']).reverse();
				$rootScope.$broadcast('HISTOGRAM_UPDATED');
			}

		}]);

})();
