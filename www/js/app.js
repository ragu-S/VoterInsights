// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/sidemenu.html",
                controller: 'AppCtrl'
            })

            .state('app.question', {
                url: "/question",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/question.html",
                        controller: 'QuestionsCtrl'
                    }
                }
            })

            .state('app.candidate', {
                url: "/candidate/:candidateId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/candidate.html",
                        controller: 'CandidateCtrl'
                    }
                }
            })
            .state('app.candidateList', {
                url: "/candidateList",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/candidateList.html",
                        controller: 'CandidateListCtrl'
                    }
                }
            })
            .state('app.mainmenu', {
                url: "/mainmenu",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/mainmenu.html",
                        controller: 'MainMenuCtrl'
                    }
                }
            })

            .state('app.demographics', {
                url: "/demographics",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/demographics.html",
                        controller: 'DemographicsCtrl'
                    }
                }
            })
            .state('app.results', {
                url: "/results",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/results.html",
                        controller: 'ResultsCtrl'
                    }
                }
            })
            .state('app.single', {
                url: "/postalcode",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/postalcode.html",
                        controller: 'PostalCodeCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/postalcode');
    });

