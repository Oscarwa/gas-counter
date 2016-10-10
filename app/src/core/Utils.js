(function() {
  'use strict';

  angular
    .module('core')
    .factory('Utils', ['$mdToast', '$filter', Utils]);

  function Utils($mdToast, $filter) {


    return {
      showToast: function(msg) {

          $mdToast.show(
            $mdToast.simple()
              .textContent($filter('translate')(msg))
              .position('bottom right' )
              .hideDelay(3000)
          );
        }
    };
  }

})();
