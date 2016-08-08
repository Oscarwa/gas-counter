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
        entry.date = new Date().toISOString();
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
