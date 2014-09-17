(function () {

	'use strict';
	
	angular.module('app')

		.filter('ZeroToE', function () {
			return function (input) {
				if (input === undefined || input === null) {
					return '';
				} else if (input === 0) {
					return 'E';
				} else {
					return input;
				}
			};
		});
	
})();