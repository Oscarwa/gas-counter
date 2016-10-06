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
    $scope.user = AuthService.user;

    // $rootScope.$on('user_logon', function(sender, data) {
    //   $scope.user = data;
    //   console.log(  $scope.user);
    //   reload();
    // });
    AuthService.auth.$onAuthStateChanged(function(user) {
      $scope.user = AuthService.user;
      //   console.log(  $scope.user);
      reload();
    })

    $scope.login = function() {
      AuthService.auth.$signInWithPopup("facebook").then(function(user) {
        //$scope.user = user;
        //reload();
        // = AuthService.user;
        // $scope.user;
        //console.log(  $scope.user);
      })
    }
    $scope.logout = function() {
      AuthService.auth.$signOut();
    }

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

    function addCar() {
      $location.path('/car')
    }

    function showFeedback() {
      $location.path('/feedback')
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
      carService
        .loadAllCars().$loaded(function(items) {
          $scope.cars = items;
        });;
    }

    function calculateCost() {
      $scope.entry.price = Math.round(100 * $scope.entry.l * $scope.gasPrice) / 100;
    }
    function calculateLts() {
      $scope.entry.l = Math.round( 100 * $scope.entry.price / $scope.gasPrice) / 100;
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
