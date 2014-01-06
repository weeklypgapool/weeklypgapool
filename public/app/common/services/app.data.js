'use strict';

angular.module('app.data', ['firebase'])

	.value('rootRef', new Firebase('https://mic-pos-web.firebaseio.com/'))

	.factory('DataService', ['$rootScope', '$q', 'rootRef', function($rootScope, $q, rootRef){

		// authorize
		var auth = new FirebaseSimpleLogin(rootRef, function(error, user) {
			if (!error) {
				$rootScope.user = user;
			};
		});
		auth.login('password', {
			email: 'email',
			password: 'password'
		});

		return {
			getTransListForStoreAndDate: function(store, date) {
				var def = $q.defer();
				rootRef.child('rawTrans/' + store + '/' + date).once('value', function(snap) {
					def.resolve(snap);
				});
				return def.promise;
			}
		}
	}]);
