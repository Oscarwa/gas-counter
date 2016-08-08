(function(){
  'use strict';

  angular.module('gas')
         .service('gasService', ['$q', '$localStorage', GasService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function GasService($q, $localStorage) {

    $localStorage.$default({
      entries: [],
      gasPrice: 13.96
    });
    // Promise-based API
    return {
      loadAllEntries : function() {
        // Simulate async nature of real remote calls
        return $q.when($localStorage.entries);
      },
      readEntries: function() {
        console.log('read');
      },
      saveEntry: function(entry) {
        var data = $localStorage.entries;
        var lastEntry = $localStorage.lastEntry;

        entry.date = new Date().toISOString();
        // Save days since last entry
        var timeDiff = Math.abs(new Date(entry.date).getTime() - new Date(lastEntry.date).getTime());
        entry.daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        //Save kms since last entry.
        var kmsDiff = entry.kms - lastEntry.kms;
        var lastElement = data.length - 1;
        data[lastElement].kmDiffNext = kmsDiff;
        //data[lastElement].gasPerformance = kmsDiff / data[lastElement].l;
        data.kmDiffPrevious = kmsDiff;

        data.push(entry);
        $localStorage.lastEntry = entry;
        $localStorage.entries = data;
        console.log('save', entry);
      },
      getGasPrice: function() {
        return $q.when(parseFloat($localStorage.gasPrice));
      },
      setGasPrice: function(price) {
        $localStorage.gasPrice = parseFloat(price);
      }
    };
  }
})();
