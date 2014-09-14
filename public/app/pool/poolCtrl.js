'use strict';

angular.module('app')

	.controller('poolCtrl', ['$scope', 'LeaderboardDataService', 'ParticipantDataService', 'PgaDisplayService', 'MoneyCalcService', function ($scope, LeaderboardDataService, ParticipantDataService, PgaDisplayService, MoneyCalcService) {
		
		$scope.tourneyStats = LeaderboardDataService.tourneyStats;
		$scope.participants = ParticipantDataService.participants;
		$scope.lookupMoney = MoneyCalcService.lookupMoney;
		$scope.roundStatusDisplay = PgaDisplayService.roundStatusDisplay;

	}]);
