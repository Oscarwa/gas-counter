(function(){

  angular
       .module('info')
       .controller('feedbackController', [
          '$scope', '$location', '$mdDialog', 'FeedbackService',
          FeedbackController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function FeedbackController($scope, $location, $mdDialog, FeedbackService) {

    $scope.sendFeedback = sendFeedback;
    $scope.cancel = cancel;

    function sendFeedback() {
      FeedbackService.sendFeedback($scope.feedback);
      $scope.feedback = null;
      showAlert();
    }

    function cancel() {
      $location.path('/');
    }

    function showAlert(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        //.parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Thank you!')
        .textContent('Your opinion will be reviewed by our product team.')
        //.ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        //.targetEvent(ev)
    ).finally(function() {
      $location.path('/');
    });
  };

  }

})();
