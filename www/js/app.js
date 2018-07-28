// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;

var app = angular.module('starter', ['ionic','ngResource', 'ngCordova']);

app.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    /*if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }*/

    //Conexión a la db de SQLite
    db = $cordovaSQLite.openDB({ name: "alfaNotas.db", iosDatabaseLocation:'default'}); 

    //Creación de la tabla para las notas
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS notas (idNota INTEGER PRIMARY KEY AUTOINCREMENT,FechaCreacion DATETIME, Contenido VARCHAR (200));');
  });
});

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('agenda', {
          url: '/agenda',
          templateUrl: 'views/agenda.html',
          controller: 'agendaController'
      });


  $urlRouterProvider.otherwise('/agenda');
});
