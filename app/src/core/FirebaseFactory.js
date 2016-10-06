(function() {
  'use strict';

  angular
    .module('core')
    .factory('firebaseFactory', FirebaseFactory);

  function FirebaseFactory() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      cars: root.child('cars'),
      gasEntries: root.child('gas')
    };

    return service;
  }

})();
