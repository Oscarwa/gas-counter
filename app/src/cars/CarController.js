(function(){

  angular
       .module('car')
       .controller('CarController', [
          'edmundsAPIService', 'carService', '$scope', 'Utils',
          CarController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CarController( edmundsAPIService, carService, $scope, Utils) {

    $scope.loadMakers   = loadMakers;
    $scope.clearSearchTerm  = clearSearchTerm;
    $scope.cancel       = cancel;
    $scope.cancelCustom = cancelCustom;
    $scope.saveCar      = saveCar;
    $scope.saveCustomCar  = saveCustomCar;
    $scope.setDefault   = setDefault;
    $scope.loadCustomCar = loadCustomCar;
    $scope.car          = {};
    $scope.customCar    = {};

    $scope.myCars    = [];


    reloadInfo();

    // *********************************
    // Internal methods
    // *********************************

    document.getElementById('searchbox-input').addEventListener('keydown', function(ev) {
      ev.stopPropagation();
    });

    function reloadInfo() {
      $scope.myCars = carService.loadAllCars();
    }

    function setDefault(car) {
      carService.setDefault(car.$id);
    }

    function saveCar() {
      //save car info
      carService
        .saveCar({
          brand: $scope.car.brand.name,
          model: $scope.car.model.name,
          year: $scope.car.year.year,
          default: !$scope.myCars.length
        })
      Utils.showToast('CAR.ADD_SUCESS');
      cancel(this.carForm);
    }

    function loadCustomCar() {
      $scope.useCustomCar = true;
      $scope.customCar = {
        brand: $scope.car.brand ? $scope.car.brand.name : null,
        model: $scope.car.model ? $scope.car.model.name : null,
        year: $scope.car.year ? $scope.car.year.year : null
      }
    }

    function saveCustomCar() {
      //save car info
      $scope.customCar.default = !$scope.myCars.length;
      carService.saveCar($scope.customCar);
      Utils.showToast('CAR.ADD_SUCESS');
      cancelCustom(this.customCarForm, this.carForm);
    }

    function cancel(form) {
      var form = form || this.carForm;
      form.$setPristine();
      form.$setUntouched();
      $scope.car = {};
    }
    function cancelCustom(form, carForm) {
      var form = form || this.customCarForm;
      form.$setPristine();
      form.$setUntouched();
      $scope.customCar = {};

      if(carForm) {
        carForm.$setPristine();
        carForm.$setUntouched();
        $scope.car = {};
      }

      $scope.useCustomCar = false
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
