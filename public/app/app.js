'use strict';

angular.module('app', [
	'ui.router', 
	'firebase', 
	'ui.bootstrap', 
	'ui.select2'
])
	
.constant('constants',
	{
		baseRefUrl: "https://weeklypgapool.firebaseio.com/tournaments"
	}
 )

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'app/login/login.html',
				controller: 'loginCtrl'
			})
			.state('leaderboard', {
				url: '/leaderboard',
				templateUrl: 'app/leaderboard/leaderboard.html',
				controller: 'leaderboardCtrl'
			})
			.state('pool', {
				url: '/pool',
				templateUrl: 'app/pool/pool.html',
				controller: 'poolCtrl'
			})
			.state('participants', {
				url: '/participants',
				templateUrl: 'app/participants/participants.html',
				controller: 'participantsCtrl',
				authRequired: true,
				resolve: {
					playerList: ['LeaderboardDataService', function(LeaderboardDataService) {
							return LeaderboardDataService.playerList;
					}]
				}
			})
		;
		$urlRouterProvider.otherwise('/leaderboard');

	}])

	.run(['$rootScope', '$state', '$stateParams', '$firebaseSimpleLogin', 'constants',
    function ($rootScope, $state, $stateParams, $firebaseSimpleLogin, constants) {
			var auth = $firebaseSimpleLogin(new Firebase(constants.baseRefUrl));
			auth.$getCurrentUser().then(function (data) {
				$rootScope.authObj = auth;
				$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
					// track the state the user wants to go to; authorization service needs this
					$rootScope.toStateParams = toStateParams;
					if (toState.authRequired && $rootScope.authObj.user === null) {
						$rootScope.toState = toState.name;
						$state.go('login');
						event.preventDefault();
					}
				});
			});
    }
  ]);