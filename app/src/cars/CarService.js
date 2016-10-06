(function(){
  'use strict';

  angular.module('car')
         .service('carService', ['$rootScope', '$localStorage', '$firebaseArray', 'authService', CarService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CarService($rootScope, $localStorage, $firebaseArray, authService) {
    // Promise-based API

    return {
      loadAllCars: function() {
        var ref = firebase.database().ref('/cars/' + (authService.user ? authService.user.uid : '-') );
        return $firebaseArray(ref);
      },
      // loadAllCars : function() {
      //   // Simulate async nature of real remote calls
      //   return $q.when($localStorage.cars);
      // },
      getDefaultCar: function() {
        var ref = firebase.database().ref('/cars/' + authService.user.uid );
        var data = $firebaseArray(ref);

        for(var x = 0; x < data.length; x++) {
          if(data[x].default) {
            return data[x];
          }
        }

      },
      setDefault: function(id) {
        var ref = firebase.database().ref('/cars/' + authService.user.uid );
        var cars = $firebaseArray(ref);

        cars = cars.map(function(item) {
          item.default = item.id === id;
          return item;
        });
      },
      saveCar: function(car) {
        var ref = firebase.database().ref('/cars/' + authService.user.uid );
        var cars = $firebaseArray(ref);

        var carToSave = {
          created: new Date().toISOString(),
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          default: (!cars || !cars.length)
        };


        cars.$add(carToSave);

        // data.push(carToSave);
        // $localStorage.cars = data;
      }
    };
  }
})();
