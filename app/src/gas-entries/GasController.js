(function(){

  angular
       .module('gas')
       .controller('GasController', [
          'gasService', '$scope',
          GasController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function GasController( gasService, $scope ) {

    $scope.gasEntries   = [ ];
    $scope.addEntry     = addEntry;

    // Load all registered Gass

    reload();

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Select the current avatars
     * @param menuId
     */
    function addEntry (  ) {
      gasService.saveEntry($scope.entry);
      reload();
    }

    function reload() {
      gasService
        .loadAllEntries()
        .then( function( entries ) {
          $scope.gasEntries = [].concat(entries);
          // $scope.gasEntries = [
          //   {price: 12, l: 44, kms: 876234}
          // ];
        });
    }

  }

})();
