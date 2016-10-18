(function(){

  angular
       .module('gas')
       .controller('GasController', [
          'GasService', 'CarService', 'ProfileService', '$scope', '$mdDialog', '$filter', 'AuthService', 'Utils',
          GasController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function GasController( GasService, CarService, ProfileService, $scope, $mdDialog, $filter, AuthService, Utils ) {

    $scope.gasEntries   = [ ];
    $scope.addEntry     = addEntry;
    $scope.clearEntry   = clearEntry;
    $scope.showChangePricePrompt = showChangePricePrompt;
    $scope.showHelp     = showHelp;
    $scope.calculateCost = calculateCost;
    $scope.calculateLts = calculateLts;
    $scope.activateGPS  = activateGPS;
    $scope.showMapDialog = showMapDialog;
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
          searchGasStationNearby(position);
        },
        function(error) {
          console.log(error);
        });
    };

    /**
     * Select the current avatars
     * @param menuId
     */
     var map;
     function searchGasStationNearby(pos) {
       var point = {lat: pos.coords.latitude, lng: pos.coords.longitude};

       map = new google.maps.Map(document.getElementById('map'), {
         center: point,
         zoom: 15
       });

       var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: point,
          //radius: 300,
          types: ['gas_station'],
          rankBy: google.maps.places.RankBy.DISTANCE
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // console.info('Gas stations found:');
            // for (var i = 0; i < results.length; i++) {
              //createMarker(results[i]);
              // console.log(results[i].name + ' - ' + results[i].vicinity);
            // }
            Utils.showToast(results[0].name + ' - ' + results[0].vicinity)
            $scope.gasStations = results;
          } else if(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            Utils.showToast('GAS.NO_RESULTS');
          }
        });
     };
     function showMapDialog(ev) {
      //  $mdDialog.show({
      //   // controller: DialogController,
      //   contentElement: document.getElementById('mapDialog'),
      //   parent: angular.element(document.body),
      //   // targetEvent: ev,
      //   // clickOutsideToClose: true
      // });
    };
    //  function DialogController($scope, $mdDialog) {
    //    $scope.hide = function() {
    //      $mdDialog.hide();
    //    };
    //    $scope.cancel = function() {
    //      $mdDialog.cancel();
    //    };
    //    $scope.answer = function(answer) {
    //      $mdDialog.hide(answer);
    //    };
    //  }

    function addEntry() {
      if(this.gasForm.$valid) {
        $scope.entry.gasPrice = $scope.gasPrice;
        GasService.saveEntry($scope.entry, $scope.lastEntry);
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

        ProfileService.getGasPrice()
          .$loaded()
          .then(function(item){
            if(!item.length) {
              showChangePricePrompt();
            } else {
              $scope.gasPrice = parseFloat(item[0].$value);
            }
          });

      $scope.cars = CarService.loadAllCars();

      reloadGasEntries();
    }
    function reloadGasEntries() {
      if($scope.entry.car) {
        GasService.loadAllEntriesByCar($scope.entry.car).$loaded().then(function(items) {
          $scope.gasEntries = items;
          if(items.length) {
            $scope.lastEntry = items[items.length - 1];
          } else {
            $scope.lastEntry = {kms: 0};
          }

        });
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
        ProfileService.setGasPrice(floatResult);
        $scope.gasPrice = floatResult;

      }, function() {
        if(!$scope.gasPrice) {
          $scope.gasPrice = '0';
        }
      });
    };

  }

})();
