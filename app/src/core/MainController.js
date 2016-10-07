(function(){

  angular
       .module('core')
       .controller('MainController', [
          '$scope', '$location', 'authService',
          MainController
       ]);

  function MainController($scope, $location, authService) {

    $scope.user = authService.user;

    authService.auth.$onAuthStateChanged(function(user) {
      if(!!user) {
        $scope.user = authService.user;
        $scope.goHome();
      }
    })

    $scope.login = function() {
      authService.auth.$signInWithPopup("facebook").then(function(user) {});
    }
    $scope.logout = function() {
      authService.auth.$signOut();
      authService.user = null;
      $location.path('/');
    }


    if(authService.user) {
      $scope.goHome();
    }


    $scope.goHome = function() {
      $location.path('/home');
    }
  }

})();
