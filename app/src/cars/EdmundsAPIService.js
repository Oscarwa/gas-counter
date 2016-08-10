(function(){
  'use strict';

  angular.module('car')
         .service('edmundsAPIService', ['$q', '$http', EdmundsAPIService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function EdmundsAPIService($q, $http) {
    const API_KEY = '7txhjgpv4fuu9k5extb44bcj';
    const API_ATTRS = '?fmt=json&api_key=';
    const API_BASE_URL = 'https://api.edmunds.com/api/vehicle/v2/';
    // Promise-based API
    return {
      loadMakes : function() {
        // Simulate async nature of real remote calls
        var deferred = $q.defer();
        $http.get(API_BASE_URL + 'makes' + API_ATTRS + API_KEY)
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
        //return $q.when($localStorage.entries);
      },
      readEntries: function() {
        console.log('read');
      },
      saveEntry: function(entry) {
        var data = $localStorage.entries;
        entry.date = new Date().toISOString();

        var lastEntry = $localStorage.lastEntry;
        if(!!lastEntry) {
          // Save days since last entry
          var timeDiff = Math.abs(new Date(entry.date).getTime() - new Date(lastEntry.date).getTime());
          entry.daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          //Save kms since last entry.
          var kmsDiff = entry.kms - lastEntry.kms;
          var lastElement = data.length - 1;
          data[lastElement].kmDiffNext = kmsDiff;
          //data[lastElement].gasPerformance = kmsDiff / data[lastElement].l;
          data.kmDiffPrevious = kmsDiff;
        }

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
