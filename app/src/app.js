angular
    .module('gasApp', [
      'ngMaterial',
      'ngSanitize',
      'ngRoute',
      'firebase',
      'pascalprecht.translate',
      'core',
      'gas',
      'car',
      'profile',
      'info',
      'setup'])
    .config(function($mdThemingProvider, $mdIconProvider, $routeProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue')
          .accentPalette('red');

        $routeProvider
          .when('/', {
            templateUrl: 'src/core/view/login.html',
            controller: 'MainController'
          })
          .when('/home', {
            templateUrl: 'src/gas-entries/view/gas-detail.html',
            controller: 'GasController'
          })
          .when('/car', {
            templateUrl: 'src/cars/view/car-add.html',
            controller: 'CarController'
          })
          .when('/feedback', {
            templateUrl: 'src/info/view/feedback.html',
            controller: 'feedbackController'
          })
          .otherwise({
            redirectTo: '/'
          });
    })
    .run(['$rootScope', '$location', 'AuthService', function ($rootScope, $location, AuthService) {
          $rootScope.$on('$routeChangeStart', function (event, next) {

          if (!AuthService.user && (next.originalPath && next.originalPath !== '/')) {
            //console.log('DENY : Redirecting to Login');
            event.preventDefault();
            $location.path('/');
          }
          else {
            //console.log('ALLOW');
          }
        });
    }]);
