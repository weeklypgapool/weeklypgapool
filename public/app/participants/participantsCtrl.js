'use strict';

angular.module('app')
	.controller('participantsCtrl', ['$scope', '$timeout', '$modal', 'ParticipantDataService', 'playerList', function ($scope, $timeout, $modal, ParticipantDataService, playerList) {

		$scope.refParticipants = ParticipantDataService.refParticipants;
		$scope.participants = ParticipantDataService.participants;
		$scope.playerList = playerList;

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
			$scope.refParticipants.child(child).set(obj);
		};
		
		$scope.removePart = function (part) {
			var modalInst = $modal.open({
				templateUrl: 'removePartModal.html',
				size: 'sm'
			});
			modalInst.result.then(function (result) {
				if (result === 'remove') {
					$scope.refParticipants.child(part.$id).remove();
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
					$scope.refParticipants.remove();
				}
			});
		};

		$scope.replaceSpaces = function (input) {
			return input.replace(/ /g, '-');
		};
		// 
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
				// result = $scope.replaceSpaces(result.replace(/[|&;:$%@"'<>()+,.]/g, ''));
				result = result.replace(/[|&;:$%@"'<>()+,.]/g, '');
				$scope.refParticipants.child(result).set(
					{'added': Date.now()}
				);
				$timeout(function () {
					// result = $scope.removeSpaces(result);
					var top = angular.element('#' + $scope.replaceSpaces(result)).position().top;
					angular.element(window).scrollTop(top + 40);
				}, 700);
			});
		};
		
	}]);
