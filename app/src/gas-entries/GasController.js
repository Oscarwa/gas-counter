(function(){

  angular
       .module('gas')
       .controller('GasController', [
          'gasService', '$scope', '$mdDialog',
          GasController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function GasController( gasService, $scope, $mdDialog ) {

    $scope.gasEntries   = [ ];
    $scope.addEntry     = addEntry;
    $scope.clearEntry   = clearEntry;
    $scope.showChangePricePrompt = showChangePricePrompt;
    $scope.calculatePrice = calculatePrice;
    $scope.calculateLts = calculateLts;

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
      if($scope.entry && $scope.entry.price && $scope.entry.l && $scope.entry.kms) {
        gasService.saveEntry($scope.entry);
        clearEntry();
        reload();
      }
    }

    function clearEntry() {
      $scope.entry = {};
      $scope.showingLastEntry = false;
    }

    function reload() {
      gasService
        .loadAllEntries()
        .then( function( entries ) {
          $scope.gasEntries = [].concat(entries);
        });
      gasService
        .getGasPrice()
        .then(function(price) {
          $scope.gasPrice = parseFloat(price);
        });
    }

    function calculatePrice() {
      $scope.entry.price = Math.round(100 * $scope.entry.l * $scope.gasPrice) / 100;
    }
    function calculateLts() {
      $scope.entry.l = Math.round( 100 * $scope.entry.price / $scope.gasPrice) / 100;
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
