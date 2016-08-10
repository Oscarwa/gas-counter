(function(){
  'use strict';

  angular.module('car')
         .service('carService', ['$q', '$localStorage', CarService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CarService($q, $localStorage) {
    // Promise-based API
    return {
      loadAllCars : function() {
        // Simulate async nature of real remote calls
        return $q.when($localStorage.cars);
      },
      getDefaultCar: function() {
        var data = $localStorage.cars;

        for(var x = 0; x < data.length; x++) {
          if(data[x].default) {
            return data[x];
          }
        }

      },
      saveCar: function(car) {
        var data = $localStorage.cars || [];

        var carToSave = {
          created: new Date().toISOString(),
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          default: (!data || !data.length)
        };

        data.push(carToSave);
        $localStorage.cars = data;
      }
    };
  }
})();
