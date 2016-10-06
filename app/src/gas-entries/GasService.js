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
        return $firebaseArray(firebaseFactory.gasEntries.child(authService.user ? authService.user.uid : '-').child(car));
        //return $q.when($localStorage.entries);
      },
      readEntries: function() {
        console.log('read');
      },
      saveEntry: function(entry) {
        var data = $firebaseArray(firebaseFactory.gasEntries.child(authService.user.uid).child(entry.car))
        entry.date = new Date().toISOString();
        
        data.$add(entry);

        //var lastEntry = $localStorage.lastEntry;
        //if(!!lastEntry) {
          // Save days since last entry
          //var timeDiff = Math.abs(new Date(entry.date).getTime() - new Date(lastEntry.date).getTime());
          //entry.daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          //Save kms since last entry.
          //var kmsDiff = entry.kms - lastEntry.kms;
          //var lastElement = data.length - 1;
          //data[lastElement].kmDiffNext = kmsDiff;
          //data[lastElement].gasPerformance = kmsDiff / data[lastElement].l;
          //data.kmDiffPrevious = kmsDiff;
        // }

        //data.push(entry);
        // $localStorage.lastEntry = entry;
        // $localStorage.entries = data;
        // console.log('save', entry);
      },
      getGasPrice: function() {
        return 13.98;
      },
      setGasPrice: function(price) {
        $localStorage.gasPrice = parseFloat(price);
      }
    };
  }
})();
