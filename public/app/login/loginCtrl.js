'use strict';

angular.module('app')
	.controller('loginCtrl', ['$scope', '$rootScope', '$firebaseSimpleLogin', '$state', function ($scope, $rootScope, $firebaseSimpleLogin, $state) {
		
		$scope.login = function () {
			$rootScope.authObj.$login("password", {
				email: $scope.login.username,
				password: $scope.login.password
			}).then(function (user) {
				if (!$rootScope.toState) {
					$state.go('pool');
				} else {
					$state.go($rootScope.toState);
					$rootScope.toState = undefined;
				}
			}, function (error) {
				$scope.loginFailed = true;
			});
		};
		
		$scope.clearAlert = function () {
			$scope.loginFailed = false;
		};
		
	}]);
