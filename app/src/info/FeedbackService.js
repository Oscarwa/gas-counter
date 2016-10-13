(function(){
  'use strict';

  angular.module('info')
         .service('FeedbackService', ['$firebaseArray', 'authService', FeedbackService]);

  function FeedbackService($firebaseArray, AuthService) {
    // Promise-based API

    return {
      sendFeedback: function(feedback) {
        var ref = firebase.database().ref('/feedback');
        var feedbackRef = $firebaseArray(ref);
        feedback.user = AuthService.user || null;
        feedbackRef.$add(feedback);
      }
    };
  }
})();
