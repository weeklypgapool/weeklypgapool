'use strict';

angular.module('app', ['ui.router', 'app.common', 'app.data', 'app.home'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl'
			});

		$urlRouterProvider.otherwise('/home');

	}]);
