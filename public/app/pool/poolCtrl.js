'use strict';

angular.module('app')
	.controller('poolCtrl', ['$rootScope', '$scope', '$filter', 'PgaDisplayService', function ($rootScope, $scope, $filter, PgaDisplayService) {
		
		$scope.roundStatusDisplay = PgaDisplayService.roundStatusDisplay;

	}]);
