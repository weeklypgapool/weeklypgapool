'use strict';

angular.module('app')

.factory('PgaDataService', ['$firebase', 'constants', function ($firebase, constants) {
	var refParticipants = new Firebase(constants.baseRefUrl + '/current/participants');
	var syncParticipants = $firebase(refParticipants);
	var participants = syncParticipants.$asArray();

	
	return {
		"refParticipants": refParticipants,
		"syncParticipants": syncParticipants,
		"participants": participants
	};
}]);