(function() {
  'use strict';

  angular
    .module('core')
    .factory('Utils', [
      '$mdToast', '$filter', '$q', '$window',
      Utils
    ]);

  function Utils($mdToast, $filter, $q, $window) {

      function showToast(msg) {
        $mdToast.show(
          $mdToast.simple()
            .textContent($filter('translate')(msg))
            .position('bottom right')
            .hideDelay(3000)
        );
      };

      function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    };

    return {
      showToast: showToast,
      getCurrentPosition: getCurrentPosition
    };
  }

})();
