(function(){
  'use strict';

  angular.module('gas')
         .service('gasService', ['authService', 'firebaseFactory', '$firebaseArray', GasService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function GasService(authService, firebaseFactory, $firebaseArray) {
    // Promise-based API
    return {
      loadAllEntriesByCar : function(car) {
        // Simulate async nature of real remote calls
        return $firebaseArray(firebaseFactory.gasEntries.child(authService.user.uid).child(car).orderByChild('date'));
        //return $q.when($localStorage.entries);
      },
      readEntries: function() {
        console.log('read');
      },
      saveEntry: function(entry, previousEntry) {
        var data = $firebaseArray(firebaseFactory.gasEntries.child(authService.user.uid).child(entry.car))
        entry.date = new Date().toISOString();

        data.$add(entry);


        if(!!previousEntry && !!previousEntry.$id) {
          // Save days since last entry
          var timeDiff = Math.abs(new Date(entry.date).getTime() - new Date(previousEntry.date).getTime());
          var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          //Save kms since last entry.
          var kmsDiff = entry.kms - previousEntry.kms;
          //previousEntry.kmDiff = kmsDiff;

          firebaseFactory.gasEntries
            .child(authService.user.uid)
            .child(previousEntry.car)
            .child(previousEntry.$id)
            .update({
              kmDiff: kmsDiff,
              daysDiff: daysDiff
          });
        }
      },
      getGasPrice: function() {
        return $firebaseArray(firebaseFactory.settings.child(authService.user.uid).child('gas'));
      },
      setGasPrice: function(price) {
        firebaseFactory.settings.child(authService.user.uid).child('gas').set({'value': price});
      }
    };
  }
})();
