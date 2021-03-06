(function() {

angular.module('core')
  .config(['$translateProvider', function ($translateProvider) {
  $translateProvider
    .translations('en', {
      'LOGIN': {
        'TITLE': 'Login',
        'LOGIN_WITH': 'With'
      },
      'GENERAL': {
        'APP_NAME': 'Gas Tracker',
        'SAVE': 'Save',
        'ADD': 'Add',
        'CLEAR': 'Clear',
        'CANCEL': 'Cancel'
      },
      'MENU': {
        'HOME': 'Home',
        'MY_CARS': 'Your cars',
        'LOGOUT': 'Logout',
        'FEEDBACK': 'Feedback'
      },
      'GAS': {
        'TITLE': 'New gas entry',
        'CURRENT_GAS_PRICE': 'Current gas price',
        'ADD_CAR': 'Add your car',
        'YOUR_CAR': 'Select your car',
        'COST': 'Cost',
        'VOLUME': 'Lts',
        'MILEAGE': 'KMs',
        'VOLUME_UNIT': 'l',
        'DISTANCE_UNIT': 'km',
        'PERFORMANCE': 'Performance',
        'DISTANCE_DIFF': 'since last entry',
        'LOAD_STATS': 'Fuel load lasted',
        'DAYS': 'days ago',
        'USE_LOCATION': 'Activate GPS',
        'NO_RESULTS': 'No gas stations found',
        'SAVE': '@:GENERAL.ADD',
        'CLEAR': '@:GENERAL.CLEAR',
        'SAVE_SUCCESS': 'Info saved',
        'PRICE_PROMPT': {
          'TITLE': 'Want to set a new gas price?',
          'CANCEL': '@:GENERAL.CANCEL',
          'SAVE': 'Set price!'
        }
      },
      'CAR': {
        'TITLE': 'New car',
        'TITLE_CUSTOM': 'New custom car',
        'BRAND': 'Brand',
        'MODEL': 'Model',
        'YEAR': 'Year',
        'NO_CAR': 'Not found?',
        'ADD': '@:GENERAL.ADD',
        'ADD_SUCESS': 'Car saved',
        'CANCEL': '@:GENERAL.CANCEL'
      },
      'FEEDBACK': {
        'TITLE': 'Feedback',
        'PLACEHOLDER': 'Write here your feedback',
        'SEND': 'Send',
        'CANCEL': '@:GENERAL.CANCEL'
      }
    })
    .translations('es', {
      'LOGIN': {
        'TITLE': 'Iniciar sesión',
        'LOGIN_WITH': 'Con'
      },
      'GENERAL': {
        'APP_NAME': 'Gas Tracker',
        'SAVE': 'Guardar',
        'ADD': 'Agregar',
        'CLEAR': 'Limpiar',
        'CANCEL': 'Cancelar'
      },
      'MENU': {
        'HOME': 'Inicio',
        'MY_CARS': 'Tus vehículos',
        'LOGOUT': 'Cerrar sesión',
        'FEEDBACK': 'Feedback'
      },
      'GAS': {
        'TITLE': 'Nueva carga',
        'CURRENT_GAS_PRICE': 'Precio actual',
        'ADD_CAR': 'Agrega tu vehículo',
        'YOUR_CAR': 'Selecciona tu vehículo',
        'COST': 'Costo',
        'VOLUME': 'Lts',
        'MILEAGE': 'KMs',
        'VOLUME_UNIT': 'l',
        'DISTANCE_UNIT': 'km',
        'PERFORMANCE': 'Desempeño',
        'DISTANCE_DIFF': 'desde última carga hace',
        'LOAD_STATS': 'Esta carga rindió',
        'DAYS': 'días',
        'USE_LOCATION': 'Activar GPS',
        'NO_RESULTS': 'No se encontraron resultados',
        'SAVE': '@:GENERAL.ADD',
        'CLEAR': '@:GENERAL.CLEAR',
        'SAVE_SUCCESS': 'Información guardada',
        'PRICE_PROMPT': {
          'TITLE': '¿Quieres asignar un nuevo precio de gasolina?',
          'CANCEL': '@:GENERAL.CANCEL',
          'SAVE': 'Asignar!'
        }
      },
      'CAR': {
        'TITLE': 'Nuevo vehículo',
        'TITLE_CUSTOM': 'Nuevo vehículo',
        'BRAND': 'Marca',
        'MODEL': 'Modelo',
        'YEAR': 'Año',
        'NO_CAR': '¿No lo encuentras?',
        'ADD': '@:GENERAL.ADD',
        'ADD_SUCESS': 'Vehículo guardado',
        'CANCEL': '@:GENERAL.CANCEL'
      },
      'FEEDBACK': {
        'TITLE': 'Feedback',
        'PLACEHOLDER': 'Escribe aquí tus comentarios',
        'SEND': 'Enviar',
        'CANCEL': '@:GENERAL.CANCEL'
      }
    })
    .registerAvailableLanguageKeys(['en', 'es'], {
      'en_*': 'en',
      'es_*': 'es'
    })
    .determinePreferredLanguage()
    // .preferredLanguage('en')
    .useSanitizeValueStrategy('escape');
}]);

})();
