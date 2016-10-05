(function(){
  'use strict';

  angular.module('car')
         .service('carService', ['$localStorage', '$firebaseArray', 'authService', CarService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function CarService($localStorage, $firebaseArray, authService) {
    // Promise-based API

    return {
      loadAllCars: function() {
        if(authService.user) {
          var ref = firebase.database().ref('/cars/' + authService.user.uid );
          return $firebaseArray(ref);
        }
        return null;
      },
      // loadAllCars : function() {
      //   // Simulate async nature of real remote calls
      //   return $q.when($localStorage.cars);
      // },
      getDefaultCar: function() {
        var data = $localStorage.cars;

        for(var x = 0; x < data.length; x++) {
          if(data[x].default) {
            return data[x];
          }
        }

      },
      setDefault: function(id) {
        var data = $localStorage.cars;

        $localStorage.cars = data.map(function(item) {
          item.default = item.id === id;
          return item;
        });
      },
      saveCar: function(car) {
        //var data = $localStorage.cars || [];

        var carToSave = {
          created: new Date().toISOString(),
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          //default: (!data || !data.length)
        };
        
        var ref = firebase.database().ref('/cars/' + authService.user.uid );
        var cars = $firebaseArray(ref);
        cars.$add(carToSave);

        // data.push(carToSave);
        // $localStorage.cars = data;
      }
    };
  }
})();
