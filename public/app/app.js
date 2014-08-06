'use strict';

angular.module('app', ['ui.router', 'firebase'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('leaderboard', {
				url: '/leaderboard',
				templateUrl: 'app/leaderboard/leaderboard.html',
				controller: 'leaderboardCtrl'
			})
			.state('pool', {
				url: '/pool',
				templateUrl: 'app/pool/pool.html'
			});
		$urlRouterProvider.otherwise('/leaderboard');

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
