(function() {
  'use strict';

  angular
    .module('core')
    .factory('Utils', ['$mdToast', Utils]);

  function Utils($mdToast) {


    return {
      showToast: function(msg) {

          $mdToast.show(
            $mdToast.simple()
              .textContent(msg)
              .position('bottom right' )
              .hideDelay(3000)
          );
        }
    };
  }

})();
