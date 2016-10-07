(function(){

  angular
       .module('gas')
       .controller('GasController', [
          'gasService', 'carService', '$rootScope', '$scope', '$mdDialog', '$location', 'authService',
          GasController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function GasController( gasService, carService, $rootScope, $scope, $mdDialog, $location, AuthService ) {

    $scope.gasEntries   = [ ];
    $scope.addEntry     = addEntry;
    $scope.clearEntry   = clearEntry;
    $scope.showChangePricePrompt = showChangePricePrompt;
    $scope.showHelp     = showHelp;
    $scope.calculateCost = calculateCost;
    $scope.calculateLts = calculateLts;
    $scope.addCar       = addCar;
    $scope.showFeedback = showFeedback;
    $scope.showMain     = showMain;
    $scope.user         = AuthService.user;
    $scope.entry        = {};

    $scope.reloadGasEntries = reloadGasEntries;

    

    // Load all registered Gass
    reload();

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Select the current avatars
     * @param menuId
     */
    function addEntry() {
      if($scope.entry && $scope.entry.cost && $scope.entry.l && $scope.entry.kms) {
        $scope.entry.gasPrice = $scope.gasPrice;
        gasService.saveEntry($scope.entry);
        clearEntry();
        reload();
      }
    }

    function addCar() {
      $location.path('/car')
    }

    function showFeedback() {
      $location.path('/feedback')
    }

    function showMain() {
      $location.path('/');
    }

    function clearEntry() {
      $scope.entry = {};
      $scope.showingLastEntry = false;
    }

    function reload() {

        gasService.getGasPrice()
          .$loaded()
          .then(function(item){
            $scope.gasPrice = parseFloat(item.value);
          });

      $scope.cars = carService.loadAllCars();

      reloadGasEntries();
    }
    function reloadGasEntries() {
      if($scope.entry.car) {
        $scope.gasEntries = gasService.loadAllEntriesByCar($scope.entry.car);
      }
    }

    function calculateCost() {
      $scope.entry.cost = Math.round(100 * $scope.entry.l * $scope.gasPrice) / 100;
    }
    function calculateLts() {
      $scope.entry.l = Math.round( 100 * $scope.entry.cost / $scope.gasPrice) / 100;
    }

    function showHelp(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#app')))
          .clickOutsideToClose(true)
          .title('Gas tracker')
          .htmlContent(
            'Version 0.1.0 <br />' +
            'GitHub: <a href="https://github.com/Oscarwa/gas-counter" target="_blank">@Oscarwa</a> <br />' +
            '<br />' +
            ' # New features (2016-08-08)<br />' +
            ' - Added gas performance data.<br />' +
            ' - Added help menu<br />' +
            ' - Added ability to change gas price.<br />' +
            '<br />' +
            ' # ToDos:<br />' +
            ' - Preserve data on backend<br />' +
            ' - Multi-car support<br />'
          )
          .ok('Got it!')
          .targetEvent(ev)
      );
    }

    function showChangePricePrompt(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('You like to set a new gas price?')
        .placeholder('$ 0.00')
        .ariaLabel('Price')
        .initialValue($scope.gasPrice)
        .targetEvent(ev)
        .ok('Set price!')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function(result) {
        //$scope.status = 'You decided to name your dog ' + result + '.';
        var floatResult = parseFloat(result);
        gasService
          .setGasPrice(floatResult);
        $scope.gasPrice = floatResult;

      }, function() {
        //$scope.status = 'You didn\'t name your dog.';
      });
    };

  }

})();
