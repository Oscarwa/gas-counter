(function(){
  'use strict';

  angular.module('car')
         .service('carService', ['$rootScope', '$localStorage', '$firebaseArray', 'firebaseFactory', 'authService', CarService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CarService($rootScope, $localStorage, $firebaseArray, firebaseFactory, authService) {

    return {
      loadAllCars: function() {
        return $firebaseArray(firebaseFactory.cars.child(authService.user ? authService.user.uid : '-'));
      },
      setDefault: function(id) {
        var defaultCar = $firebaseArray(firebaseFactory.cars.child(authService.user.uid))
          .$loaded(function(items) {
            for(var i = 0; i < items.length; i++) {
              if(items[i].$id === id) {
                items[i].default = true;
              } else {
                items[i].default = false;
              }
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
          year: car.year
        };

        cars.$add(carToSave);
      }
    };
  }
})();
