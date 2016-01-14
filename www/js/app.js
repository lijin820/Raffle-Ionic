// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngMessages', 'ngImgCrop', 'ngOpenFB'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
                       
    var clientIDs = {
        "PayPalEnvironmentProduction": "AbezvQ3K9DRF60uib2WlT6VXwBDvlXjqZ9RxocjGcQdjolPN2CYaTZxPO8NO1PJj_V8nW3bEypjQHjeD",
        "PayPalEnvironmentSandbox": "AbezvQ3K9DRF60uib2WlT6VXwBDvlXjqZ9RxocjGcQdjolPN2CYaTZxPO8NO1PJj_V8nW3bEypjQHjeD"
    };

    var configuration = function () {
      var config = new PayPalConfiguration({
           merchantName: "My test shop",
           merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
           merchantUserAgreementURL: "https://mytestshop.com/agreement"
      });
         
      return config;
    }

    PayPalMobile.init(clientIDs, function(){
        PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", configuration(), function(){

        });
    });
  });
})

.run(function ($ionicPlatform, ngFB) {
    ngFB.init({appId: '441023299430775'});
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('forget', {
    url: '/forget',
    templateUrl: 'templates/forgetpassword.html',
    controller: 'ForgetCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })
  .state('sidemenu', {
      url: "/sidemenu",
      abstract: true,
      templateUrl: "templates/sidemenu.html",
      controller: 'SideMenuCtrl'
    })
  .state('sidemenu.category', {
      url: "/category",
      views: {
        'menuContent' :{
          templateUrl: "templates/category.html",
          controller: 'CategoryCtrl'
        }
      }
    })

  .state('sidemenu.postitem', {
      url: "/postitem",
      views: {
        'menuContent' :{
          templateUrl: "templates/postitem.html",
          controller: 'PostItemCtrl'
        }
      }
    })

  .state('sidemenu.itempreview', {
      url: "/itempreview",
      views: {
        'menuContent' :{
          templateUrl: "templates/itempreview.html",
          controller: 'ItemPreviewCtrl'
        }
      }
    })

  .state('sidemenu.postpreview', {
      url: "/postpreview",
      views: {
        'menuContent' :{
          templateUrl: "templates/postpreview.html",
          controller: 'PostPreviewCtrl'
        }
      }
    })

  .state('sidemenu.paymentselect', {
      url: "/paymentselect",
      views: {
        'menuContent' :{
          templateUrl: "templates/paymentselect.html",
          controller: 'PaymentSelectCtrl'
        }
      }
    })

  .state('sidemenu.fetchitems', {
      url: "/fectchitems",
      views: {
        'menuContent' :{
          templateUrl: "templates/fetchitems.html",
          controller: 'FetchItemsCtrl'
        }
      }
    })

  .state('sidemenu.fetchcategoryitem', {
      url: "/fectchcategoryitem",
      views: {
        'menuContent' :{
          templateUrl: "templates/fetchcategoryitem.html",
          controller: 'FetchCategoryItemsCtrl'
        }
      }
    })

  .state('sidemenu.help', {
      url: "/help",
      views: {
        'menuContent' :{
          templateUrl: "templates/help.html",
          controller: 'HelpCtrl'
        }
      }
    })

  .state('sidemenu.maps', {
      url: "/maps",
      views: {
        'menuContent' :{
          templateUrl: "templates/maps.html",
          controller: 'MapsCtrl'
        }
      }
    })

  .state('sidemenu.myraffle', {
      url: "/myraffle",
      views: {
        'menuContent' :{
          templateUrl: "templates/myraffle.html",
          controller: 'MyRaffleCtrl'
        }
      }
    })

  .state('app.profile', {
      url: "/profile",
      views: {
          'menuContent': {
              templateUrl: "templates/profile.html",
              controller: "ProfileCtrl"
          }
      }
  });
  
  $urlRouterProvider.otherwise('/login');
 // $urlRouterProvider.otherwise('/sidemenu/fectchitems');
})

.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    
  });
});
