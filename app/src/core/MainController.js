(function(){

  angular
       .module('core')
       .controller('MainController', [
          '$scope', '$location', 'AuthService',
          MainController
       ]);

  function MainController($scope, $location, AuthService) {

    $scope.user = AuthService.user;

    AuthService.auth.$onAuthStateChanged(function(user) {
      if(!!user) {
        $scope.user = AuthService.user;
        $scope.goHome();
      }
    })

    $scope.login = function(provider) {
      AuthService.auth.$signInWithPopup(provider).then(function(user) {});
    }
    $scope.logout = function() {
      AuthService.auth.$signOut();
      AuthService.user = null;
      $scope.user = null;
      $location.path('/');
    }


    if(AuthService.user) {
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
