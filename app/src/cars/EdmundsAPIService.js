(function(){
  'use strict';

  angular.module('car')
         .service('EdmundsAPIService', ['$q', '$http', EdmundsAPIService]);

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
        var deferred = $q.defer();
        $http.get(API_BASE_URL + 'makes' + API_ATTRS + API_KEY)
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
      }
    };
  }
})();
