(function(){

  angular
       .module('core')
       .factory('AuthService', [
          '$rootScope', '$firebaseAuth',
          AuthService
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AuthService($rootScope, $firebaseAuth) {

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
        //$rootScope.$emit('user_logon', this.user);
      }
    }.bind(this));

    return this;
  }

})();
