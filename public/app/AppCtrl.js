'use strict';

angular.module('app')
	.controller('appCtrl', ['$scope', '$location',function ($scope, $location) {
		
		$scope.getBtnClass = function (path) {
			if ($location.path().substr(0, path.length) === path) {
				return "btn-primary";
			} else {
				return "btn-default";
			}
		};
															
	}]);

	