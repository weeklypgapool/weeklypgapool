'use strict';

angular.module('app.home')
	.controller('HomeCtrl', ['$scope', 'constants', 'DataService', function($scope, constants, DataService) {
		$scope.data = {};
		$scope.data.test = constants.TEST;

		$scope.getTrans = function () {
			DataService.getTransListForStoreAndDate($scope.query.store, $scope.query.date)
				.then(function(snap) {
					$scope.data.trans = snap.val();
				});
		};
	}]);