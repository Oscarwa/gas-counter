(function(){

  angular
       .module('car')
       .controller('CarController', [
          'edmundsAPIService', 'carService', '$scope', '$location',
          CarController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CarController( edmundsAPIService, carService, $scope, $location ) {

    $scope.loadMakers   = loadMakers;
    $scope.clearSearchTerm  = clearSearchTerm;
    $scope.goHome       = goHome;
    $scope.saveCar      = saveCar;
    $scope.saveCustomCar  = saveCustomCar;
    $scope.setDefault   = setDefault;

    $scope.myCars    = [];


    reloadInfo();

    // *********************************
    // Internal methods
    // *********************************

    document.getElementById('searchbox-input').addEventListener('keydown', function(ev) {
      ev.stopPropagation();
    });

    function reloadInfo() {
      carService
        .loadAllCars()
        .then(function(cars) {
          $scope.myCars = cars;
        });
    }

    function clearEntry() {
      $scope.entry = {};
      $scope.showingLastEntry = false;
    }

    function setDefault(car) {
      console.log('marked as default', car)
      carService
        .setDefault(car.id);
      reloadInfo();
    }

    function saveCar() {
      //save car info
      carService
        .saveCar({
          brand: $scope.car.brand.name,
          model: $scope.car.model.name,
          year: $scope.car.year.year,
          id: $scope.car.year.id
        })

      goHome();
    }

    function saveCustomCar() {
      //save car info
      carService
        .saveCar({
          brand: $scope.customCar.brand,
          model: $scope.customCar.model,
          year: $scope.customCar.year,
          id: new Date().getTime()
        })

      goHome();
    }

    function goHome() {
      $location.path('/');
    }

    function clearSearchTerm() {
      $scope.searchTerm = '';
    }

    function loadMakers() {
      if(!$scope.carBrands) {
        return edmundsAPIService
          .loadMakes()
          .then( function( makes ) {
            $scope.carBrands = makes.makes;
          });
      }
    }

  }

})();
