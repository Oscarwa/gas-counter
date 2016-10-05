(function(){

  angular
       .module('core')
       .service('authService', [
          '$firebaseAuth',
          AuthService
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AuthService($firebaseAuth) {

    this.auth   = $firebaseAuth();
    this.user   = null;
    this.auth.$onAuthStateChanged(function(user) {
      if(user){
        this.user = {
          name: user.displayName,
          picture: user.photoURL,
          email: user.email,
          uid: user.uid
        }
      }
    }.bind(this))
  }

})();