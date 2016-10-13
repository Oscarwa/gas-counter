(function(){
  'use strict';

  angular.module('profile')
         .service('ProfileService', ['AuthService', 'firebaseFactory', '$firebaseArray', ProfileService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function ProfileService(AuthService, firebaseFactory, $firebaseArray) {
    // Promise-based API
    return {
      getSetupInfo: function() {
        return firebaseArray(firebaseFactory.settings.child(AuthService.user.id))
      },

      getGasPrice: function() {
        return $firebaseArray(firebaseFactory.settings.child(AuthService.user.uid).child('gas'));
      },
      setGasPrice: function(price) {
        firebaseFactory.settings.child(AuthService.user.uid).child('gas').set({'value': price});
      }
    };
  }
})();
