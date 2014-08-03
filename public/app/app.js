'use strict';

angular.module('app', ['ui.router', 'app.common', 'app.data', 'app.home', 'firebase'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl'
			});

		$urlRouterProvider.otherwise('/home');

	}])

  .filter('ZeroToE', function() {
    return function(input) {
      if (input === undefined) {
				return '';
			} else if (input == 0) {
				return 'E';
			} else {
				return input;
			};
    };
  });
