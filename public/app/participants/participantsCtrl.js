'use strict';

angular.module('app')
	.controller('participantsCtrl', ['$rootScope', '$scope', '$timeout', '$modal', 'PgaDataService', function ($rootScope, $scope, $timeout, $modal, PgaDataService) {
	
		$scope.initSelect = function (sel) {
			sel.selectedPlayers = [];
			_.forIn(sel.part.players, function (val, key) {
				sel.selectedPlayers.push(key);
			});
		};
		
		$scope.onUpdate = function (sel) {
			var obj = {};
			_.each(sel.selectedPlayers, function (player) {
				obj[player] = true;
			});
			var child = sel.part.$id + '/players';
			PgaDataService.refParticipants.child(child).set(obj);
		};
		
		$scope.removePart = function (part) {
			var modalInst = $modal.open({
				templateUrl: 'removePartModal.html',
				size: 'sm'
			});
			modalInst.result.then(function (result) {
				if (result === 'remove') {
					PgaDataService.refParticipants.child(part.$id).remove();
				}
			});
		};
		
		$scope.removeAll = function () {
			var modalInst = $modal.open({
				templateUrl: 'removeAllPartModal.html',
				size: 'sm'
			});
			modalInst.result.then(function (result) {
				if (result === 'remove') {
					PgaDataService.refParticipants.remove();
				}
			});
		};

		$scope.replaceSpaces = function (input) {
			return input.replace(/ /g, '-');
		};
		
		/* Add Participants */
		$scope.openModal = function (size) {
			var modalInst = $modal.open({
				templateUrl: 'addPartModalContent.html',
				size: size,
				controller: function () {
					$timeout(function () {
						angular.element('#name').focus();
					}, 200);
				}
			});
			modalInst.result.then(function (result) {
				result = $scope.replaceSpaces(result.replace(/[|&;:$%@"'<>()+,.]/g, ''));
				PgaDataService.refParticipants.child(result).set(
					{'added': Date.now()}
				);
				$timeout(function () {
					var top = angular.element('#' + result).position().top;
					angular.element(window).scrollTop(top + 40);
				}, 700);
			});
		};
		
	}]);
