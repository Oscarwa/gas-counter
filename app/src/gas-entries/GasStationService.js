(function(){
  'use strict';

  angular.module('gas')
         .service('GasStationService', ['firebaseFactory', '$firebaseArray', GasStationService]);

  function GasStationService(firebaseFactory, $firebaseArray) {

    return {
      addStationEntry: function(entry) {
        var data = $firebaseArray(firebaseFactory.gasStations.child(entry.gasStation))

        data.$add({
          date: new Date().toISOString(),
          daysDiff: entry.daysDiff,
          gasPrice: entry.gasPrice,
          kmDiff: entry.kmDiff,
          l: entry.l
        });
      }
    };
  }
})();
