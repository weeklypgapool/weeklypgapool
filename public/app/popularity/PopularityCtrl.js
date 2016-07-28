(function() {

  'use strict';

  angular.module('app')
    .controller('PopularityCtrl', ['$rootScope', '$scope', 'ParticipantDataService', function($rootScope, $scope, ParticipantDataService) {
      
      $scope.histogram = ParticipantDataService.histogram;

      $rootScope.$on('HISTOGRAM_UPDATED', function() {
        $scope.histogram = ParticipantDataService.histogram;
      });

    }
  ]);

})();