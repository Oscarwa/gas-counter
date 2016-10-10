(function(){

  angular
       .module('gas')
       .controller('GasController', [
          'gasService', 'carService', '$scope', '$mdDialog', '$filter', 'authService', 'Utils',
          GasController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function GasController( gasService, carService, $scope, $mdDialog, $filter, AuthService, Utils ) {

    $scope.gasEntries   = [ ];
    $scope.addEntry     = addEntry;
    $scope.clearEntry   = clearEntry;
    $scope.showChangePricePrompt = showChangePricePrompt;
    $scope.showHelp     = showHelp;
    $scope.calculateCost = calculateCost;
    $scope.calculateLts = calculateLts;
    $scope.activateGPS  = activateGPS;
    $scope.user         = AuthService.user;
    $scope.entry        = {};
    $scope.location     = {};

    $scope.reloadGasEntries = reloadGasEntries;



    // Load all registered Gass
    reload();


    // *********************************
    // Internal methods
    // *********************************

    function activateGPS() {
      Utils.getCurrentPosition().then(
        function(position) {
          console.log(position);
          $scope.location = position;
        },
        function(error) {
          console.log(error);
        });
    };

    /**
     * Select the current avatars
     * @param menuId
     */
    function addEntry() {
      if(this.gasForm.$valid) {
        $scope.entry.gasPrice = $scope.gasPrice;
        gasService.saveEntry($scope.entry);
        Utils.showToast('GAS.SAVE_SUCCESS')
        clearEntry(this.gasForm);
        reload();
      }
    }

    function clearEntry(form) {
      //$scope.gasForm.$reset();
      form = form || this.gasForm;
      form.$setPristine();
      form.$setUntouched();
      $scope.entry = {};
      $scope.showingLastEntry = false;
    }

    function reload() {

        gasService.getGasPrice()
          .$loaded()
          .then(function(item){
            if(!item.length) {
              showChangePricePrompt();
            } else {
              $scope.gasPrice = parseFloat(item[0].value);
            }
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
        .title($filter('translate')('GAS.PRICE_PROMPT.TITLE'))
        .placeholder('$ 0.00')
        .ariaLabel('Price')
        .initialValue($scope.gasPrice)
        //.targetEvent(ev)
        .ok($filter('translate')('GAS.PRICE_PROMPT.SAVE'))
        .cancel($filter('translate')('GAS.PRICE_PROMPT.CANCEL'));
      $mdDialog.show(confirm).then(function(result) {
        //$scope.status = 'You decided to name your dog ' + result + '.';
        var floatResult = parseFloat(result);
        gasService
          .setGasPrice(floatResult);
        $scope.gasPrice = floatResult;

      }, function() {
        $scope.gasPrice = '0';
      });
    };

  }

})();
