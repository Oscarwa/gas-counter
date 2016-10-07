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

    $scope.login = function(provider) {
      authService.auth.$signInWithPopup(provider).then(function(user) {});
    }
    $scope.logout = function() {
      authService.auth.$signOut();
      authService.user = null;
      $scope.user = null;
      $location.path('/');
    }


    if(authService.user) {
      $scope.goHome();
    }


    $scope.goCars = function() {
      $location.path('/car')
    }
    $scope.goHome = function() {
      $location.path('/home');
    }

    $scope.showFeedback = function() {
      $location.path('/feedback')
    }
  }

})();
