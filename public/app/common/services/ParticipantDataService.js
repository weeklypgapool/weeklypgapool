(function () {

	'use strict';

	angular.module('app')

		.factory('ParticipantDataService', ['$firebase', 'constants', 'MoneyCalcService', function ($firebase, constants, MoneyCalcService) {

			// Participants data
			var refParticipants = new Firebase(constants.baseRefUrl + '/current/participants');
			var syncParticipants = $firebase(refParticipants);
			var participants = syncParticipants.$asArray();

			participants.$watch(function (evt) {
				MoneyCalcService.calcTotalMoneyForParticipants();
			});

			return {
				"refParticipants": refParticipants,
				"participants": participants
			};

		}]);

})();
