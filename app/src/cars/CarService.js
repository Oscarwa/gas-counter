(function(){
  'use strict';

  angular.module('car')
         .service('carService', ['$rootScope', '$firebaseArray', 'firebaseFactory', 'authService', CarService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CarService($rootScope, $firebaseArray, firebaseFactory, authService) {

    return {
      loadAllCars: function() {
        return $firebaseArray(firebaseFactory.cars.child(authService.user ? authService.user.uid : '-'));
      },
      setDefault: function(id) {
        var defaultCar = $firebaseArray(firebaseFactory.cars.child(authService.user.uid))
          .$loaded(function(items) {
            for(var i = 0; i < items.length; i++) {
              items[i].default = items[i].$id === id;
              items.$save(i);
            }
        });
      },
      saveCar: function(car) {
        var cars = $firebaseArray(firebaseFactory.cars.child(authService.user.uid));

        var carToSave = {
          created: new Date().toISOString(),
          brand: car.brand,
          model: car.model,
          year: car.year,
          default: car.default
        };

        cars.$add(carToSave);
      }
    };
  }
})();
