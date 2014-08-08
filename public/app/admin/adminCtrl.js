'use strict';

angular.module('app')
	.controller('adminCtrl', ['$rootScope', '$scope', '$firebase', '$filter', function ($rootScope, $scope, $firebase, $filter) {
		
		$scope.form = {};
		$scope.input = {};
		
		$scope.addParticipant = function () {
			alert('new part name: ' + form.name);
		};
		
		$scope.clearForm = function () {
			$scope.input.name = '';
			$scope.input.email = '';
		};

	}]);
