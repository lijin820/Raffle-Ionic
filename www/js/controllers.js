angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $state, $ionicPopup, ngFB, $rootScope) {
        $scope.user = {
          username: "lijin",
          password: "sheqjrh1991"
        };
        var vm=this;
        
        $scope.onLogin = function(data) {
          if (data.username == '' || data.password == '') 
          {
            $ionicPopup.alert({
                  title: 'Error',
                  template: 'Please fill out the form.'
              });
          }else{
            AuthService.login(data.username, data.password);
          };
        };
        
        $scope.gotoSignup = function() {
          $state.go('signup');
        };

        $scope.onForgetPassword = function() {
          $state.go('forget');
        };

        $scope.fbLogin = function() {
        ngFB.login({scope: 'public_profile, email'}).then(
          function (response) {
              console.log("response =" + response)
              if (response.status === 'connected') {
                 ngFB.api({
                      path: '/me',
                      params: {fields: 'id,name,email'}
                  }).then(
                      function (user) {
                          $scope.user = user;
                          $rootScope.username = $scope.user.name;
                          $rootScope.fuser_id = $scope.user.id;
                          $rootScope.facebookemail = $scope.user.email;
                          $scope.profile_url = "http://graph.facebook.com/" + $scope.user.id + "/picture?width=120&height=120";
                          AuthService.facebooksignup($scope.user.id, $scope.user.name, $scope.user.email, $scope.profile_url);  
                      },
                      function (error) {
                      alert('Facebook error: ' + error.error_description);
                  });

                  $state.go('sidemenu.category');
              } else {
                  alert('Facebook login failed');
              }
        });
      };
})

.controller('SignupCtrl', function($scope, AuthService, $ionicHistory, $state, $ionicPopup) {
    $scope.gotoLogin = function() {
       $state.go('login');
    };

    $scope.data = {
      username: "",
      email: "",
      phonenumber: "",
      password: "",
    };

    $scope.signup = function(data) {
        if (data.username == '' || data.email == '' || data.phonenumber == '' || data.password == '') 
        {
            $ionicPopup.alert({
                title: 'Error',
                template: 'Please fill out the form.'
            });
        }else{
            AuthService.signup(data.username, data.email, data.phonenumber, data.password);  
        }      
    };
})

.controller('ForgetCtrl', function($scope, AuthService, $ionicHistory, $state, $ionicPopup) {
  //   $scope.resetPassword = function(data) {
  //     console.log("1111111");
  //     var email = {
  //       "to" : "lijin1991820@gmail.com",
  //       "from" : "test@raffle.com",
  //       "subject" : "Test verified mail",
  //       "html" : "<h1>Your verification code is 12345</h1>",
  //       "text" : "Your verification code is 12345"
  //     };

  //     sendgrid.send(email, function(result){
  //           // openSuccessDialog();
  //       }, function(error){
  //           // openFailureDialog();
  //     });
  //   };
 
  // var openSuccessDialog = function() {
  //     var myPopup = $ionicPopup.show({
  //         template: 'Your message has been sent and a member of our team will be in touch.',
  //         title: 'Success!',
  //         cssClass: 'email-popup',
  //         buttons: [
  //             { text: 'CLOSE' }
  //         ]
  //     });
  //       myPopup.then(function(res) {
  //         console.log('Tapped!', res);
  //       });
  //   }

  //   var openFailureDialog = function() {
  //     var myPopup = $ionicPopup.show({
  //         template: 'Your message has been failed to send.',
  //         title: 'Failure!',
  //         cssClass: 'email-popup',
  //         buttons: [
  //             { text: 'CLOSE' }
  //         ]
  //     });
  //       myPopup.then(function(res) {
  //         console.log('Tapped!', res);
  //       });
  //   }

    $scope.resetPassword = function(data) {
      console.log(data.retrivemailtext);
    };

    $scope.gotoLogin = function(data) {
        $state.go('login');
    };
})

.controller('ProfileCtrl', function ($scope, ngFB) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
          console.log(user);
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });
})

.controller('SideMenuCtrl', function($scope, $state, $rootScope, $ionicPopup, $ionicSideMenuDelegate, ngFB, $ionicViewService, $ionicHistory) {
  console.log("sidemenu controller comes...");
  $scope.goLogout = function() {
      var confirmPopup = $ionicPopup.confirm({
             title: 'Confirm',
             template: 'Do you want to log out?',
     });
      confirmPopup.then(function(res) {
          if(res) {
            $rootScope.categoryname = "";
            $ionicViewService.nextViewOptions({
                disableBack: true
            });

            $state.go('login');
            $ionicHistory.clearHistory();            

          } else {
            console.log('You are not sure');
          }
      });
      
  };

  $scope.goHome = function() {
    $state.go('sidemenu.category');
  };

  $scope.goSellPost = function() {
    $state.go('sidemenu.fetchitems');
  };

  $scope.goMyraffle = function() {
    $state.go('sidemenu.myraffle');
  };

  $scope.goLocation = function() {
    $state.go('sidemenu.maps');
  };

  $scope.goSortby = function() {
    $state.go('sidemenu.fetchitems');
  };

  $scope.goHelp = function() {
    $state.go('sidemenu.help');
  };

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('CategoryCtrl', function($scope, $state, AuthService, $ionicHistory, $ionicPopup, $rootScope, $timeout, $ionicSideMenuDelegate, ngFB) {
  console.log("category controller comes...");

    $rootScope.categoryname = "";
    $scope.data = {}
    $scope.goToArt = function() {
      $rootScope.categoryname = "Collectible/Art";
      // console.log($rootScope.categoryname);
      $state.go('sidemenu.fetchcategoryitem');
    };

    $scope.goToElectro = function() {
      $rootScope.categoryname = "Electronics";
      // console.log($rootScope.categoryname);
       $state.go('sidemenu.fetchcategoryitem');
    };

    $scope.goToFashion = function() {
      $rootScope.categoryname = "Fashion";
      // console.log($rootScope.categoryname);
       $state.go('sidemenu.fetchcategoryitem');
    };

    $scope.goToSport = function() {
      $rootScope.categoryname = "Sporting goods";
      // console.log($rootScope.categoryname);
       $state.go('sidemenu.fetchcategoryitem');
    };

    $scope.goToToy = function() {
      $rootScope.categoryname = "Toys";
      // console.log($rootScope.categoryname);
       $state.go('sidemenu.fetchcategoryitem');
    };

    $scope.goToGift = function() {
      $rootScope.categoryname = "Deals/Gift";
      // console.log($rootScope.categoryname);
       $state.go('sidemenu.fetchcategoryitem');
    };

})

.controller('PostItemCtrl', function($scope, $state, $rootScope, $ionicHistory, $cordovaCamera, DataService, BACKEND_URL, $ionicPopup, AuthService, UploadService) {
  $scope.goLogout = function() {
      var confirmPopup = $ionicPopup.confirm({
             title: 'Delete',
             template: 'Are you sure you want to delete this item?',
     });
      confirmPopup.then(function(res) {
          if(res) {
            console.log('You are not sure');
          } else {
            console.log('You are not sure');
          }
      });

      $state.go('login');
  };
   
  $scope.cameracount = 0;
  $rootScope.cameraImages = [];
  
  $scope.onClickCameraButton = function() {
    $scope.cameracount++;
      var options = {
          quality : 80,
          destinationType : Camera.DestinationType.DATA_URL,
          destinationType : Camera.DestinationType.FILE_URI,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 1000,
          targetHeight: 1000,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };
    
      $cordovaCamera.getPicture(options).then(function(imageData) {
          $rootScope.cameraImages.push(imageData);
          $rootScope.imgURI = imageData;
      }, function(err) {
          
      });
  };

  $scope.data = {
      itemname: "",
      itemdescription:"",
      itemkeyword:"",
      raffleduration:"",
      numberofslots:"",
      priceperslot:""
  };

  var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    $scope.todayDate = dd + "-" + mm + "-" + yyyy;
    $rootScope.dateStr = $scope.todayDate;

  $scope.onClickNextButton = function(data) {
    if ($scope.data.itemname == '' || $scope.data.itemdescription == '' || $scope.data.itemkeyword == '') 
    {
      $ionicPopup.alert({
          title: 'Error',
          template: 'Please fill out the form.'
      });
    }else{
      $rootScope.itemname = $scope.data.itemname;
      $rootScope.itemdescription = $scope.data.itemdescription;
      $rootScope.itemkeyword = $scope.data.itemkeyword;
      $rootScope.raffleduration = $scope.data.category0;
      $rootScope.numberofslots = $scope.data.category1;
      $rootScope.priceperslot = $scope.data.category2;
      
      $state.go('sidemenu.postpreview');  
    };
  };
})

.controller('PostPreviewCtrl', function($scope, $state, $rootScope, $ionicHistory, $cordovaCamera, DataService, BACKEND_URL, $ionicPopup, AuthService, UploadService) {
  console.log("PostPreview controller");
    $scope.goToPaymentSelect = function(){
      $state.go('sidemenu.paymentselect');
    };

    $scope.goToPostItem = function(){
      $state.go('sidemenu.postitem');
    };

  var tempday = $rootScope.raffleduration;
  $scope.totalcounter = 86400;
  $scope.hours   = Math.floor($scope.totalcounter / 3600);
  $scope.minutes = Math.floor(($scope.totalcounter - ($scope.hours * 3600)) / 60);
  $scope.seconds = $scope.totalcounter - ($scope.hours * 3600) - ($scope.minutes * 60);

    var mytimeout = null; // the current timeoutID
    $scope.onTimeout = function() {
        if ($scope.seconds == 0)
        {
          if ($scope.minutes == 0) 
          {
              if ($scope.hours == 0) 
              {
                  $scope.$broadcast('timer-stopped', 0);
                  $timeout.cancel(mytimeout);
                  return;
              }
              $scope.minutes = 60;
              $scope.hours--;
          }
          $scope.seconds = 60;
          $scope.minutes--;
        }
        $scope.seconds--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 90;
        $timeout.cancel(mytimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }
    });
    $scope.startTimer();

})

.controller('PaymentSelectCtrl', function($scope, $state, $rootScope, $ionicHistory, $cordovaCamera, DataService, BACKEND_URL, $ionicPopup, AuthService, UploadService) {
  console.log("Payment controller");
    $scope.goToPostItem = function(){
      $state.go('sidemenu.postitem');
    };

    $scope.AddCart = function(){
      console.log("add cart button clicked!!!");
    };

    $scope.onPostRaffle = function(){
        var item_id = Math.floor((Math.random() * 10000) + 1);
        for (var i = $rootScope.cameraImages.length - 1; i >= 0; i--) {
          UploadService.uploadImage($rootScope.fuser_id, $rootScope.categoryname,  $rootScope.itemname, $rootScope.itemdescription, $rootScope.itemkeyword, $rootScope.raffleduration, $rootScope.numberofslots, $rootScope.priceperslot, $rootScope.cameraImages[i], item_id);
        };
    };

    $scope.selectedPaypal = function(){

    };
})

.controller('FetchItemsCtrl', function($scope, $state, $rootScope, PopupService, FetchService, $ionicHistory, $cordovaCamera, DataService, BACKEND_URL, $ionicPopup, AuthService, UploadService) {
  console.log("FetchItemsCtrl controller")
  PopupService.showLoader("Loading");
  self.fetchAllItems = function() {
    FetchService.getAllItems(function(response) {
      PopupService.hideLoader();
       $scope.items = new Array();
       if(response == "null")
         return;
       else {
          var itemIDArray = [];
          for (var key in response) {
            if (response.hasOwnProperty(key)) {
              itemIDArray.push(key);
            }
          }
          var dataArray = [];
          for (var i = 0; i < itemIDArray.length; i++) {
            dataArray.push(response[itemIDArray[i]][0]);
          };
          $rootScope.itemArray = dataArray;
      }
    });
  };

  self.fetchAllItems();

  $scope.itemClicked = function(object) {
    $rootScope.senderItemID = object.item_id;
    $state.go('sidemenu.itempreview');
  };
})

.controller('FetchCategoryItemsCtrl', function($scope, $state, $rootScope, PopupService, FetchService, $ionicHistory, $cordovaCamera, DataService, BACKEND_URL, $ionicPopup, AuthService, UploadService) {
  console.log($rootScope.categoryname)
  var itemIDArray = [];
  var dataArray = [];
  PopupService.showLoader("Loading");
  self.fetchCategoryItems = function() {
      FetchService.getCategoryItems(function(response) {
        PopupService.hideLoader();
       $scope.items = new Array();
       if(response == "null")
         return;
       else {
          for (var key in response) {
            if (response.hasOwnProperty(key)) {
              itemIDArray.push(key);
            }
          }
          for (var i = 0; i < itemIDArray.length; i++) {
            dataArray.push(response[itemIDArray[i]][0]);
          };
          $rootScope.itemArray = dataArray;
      }
    });
  };

  self.fetchCategoryItems();

  $scope.gotoPost = function() {
    $state.go('sidemenu.postitem');
  };

  $scope.itemClicked = function(object) {
    // alert("1")
    $rootScope.senderItemID = object.item_id;
    $state.go('sidemenu.itempreview');
  };
})

.controller('HelpCtrl', function($scope, $state, $rootScope) {

})

.controller('MapsCtrl', function($scope, $state, $rootScope, $cordovaGeolocation) {
    var options = {timeout: 10000, enableHighAccuracy: true};
     
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     
        console.log(JSON.stringify(position))
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
     
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
     
      }, function(error){

      });
})

.controller('MyRaffleCtrl', function($scope, $state, $rootScope, PopupService, FetchService) {
  var itemIDArray = [];
  var dataArray = [];
  PopupService.showLoader("Loading");
  self.fetchMyRaffle = function() {
      FetchService.fetchMyItems(function(response) {
        PopupService.hideLoader();
       $scope.items = new Array();
       if(response == "null")
         return;
       else {
          for (var key in response) {
            if (response.hasOwnProperty(key)) {
              itemIDArray.push(key);
            }
          }
          for (var i = 0; i < itemIDArray.length; i++) {
            dataArray.push(response[itemIDArray[i]][0]);
          };
          $rootScope.itemArray = dataArray;
      }
    });
  };

  self.fetchMyRaffle();

  // $scope.gotoPost = function() {
  //   $state.go('sidemenu.postitem');
  // };

  // $scope.itemClicked = function(object) {
  //   $rootScope.senderItemID = object.item_id;
  //   $state.go('sidemenu.itempreview');
  // };
})

.controller('ItemPreviewCtrl', function($scope, $state, $rootScope, PopupService, FetchService, $timeout) {
  console.log("ItemPreview controller");
    self.fetchOneItem = function() {
      FetchService.getOneItem(function(response) {
         $scope.items = new Array();
         if(response == "null")
         {
           return;
         }
         else {
          var onedataArray = [];
          for (var i = 0; i < response.length; i++) {
            onedataArray.push(response[i]);
          };
          $rootScope.oneitemArray = onedataArray;
          $rootScope.detailCategoryname = onedataArray[0].category;
          $rootScope.detailItemname = onedataArray[0].itemname;
          $rootScope.detailItemdescription = onedataArray[0].itemdescription;
          $rootScope.detailItemKeyword = onedataArray[0].itemkeyword;
          $rootScope.detailNumberofslot = onedataArray[0].numberofslots;
          $rootScope.detailPriceperslot = onedataArray[0].priceperslot;
        }
    });
  };

  self.fetchOneItem();

  $scope.createPayment = function() {
    var paymentDetails = new PayPalPaymentDetails($rootScope.detailPriceperslot, "0.00", "0.00");
    var payment = new PayPalPayment($rootScope.detailPriceperslot, "USD", $rootScope.detailItemname, "Sale",paymentDetails);
    return payment;
  }

  $scope.onBuyRaffle = function(){
      PayPalMobile.renderSinglePaymentUI($scope.createPayment(), function( res ){
          alert(JSON.stringify(res))
     },
     function(){
     
     });
  };

  var tempday = $rootScope.raffleduration;
  alert(tempday)
  $scope.totalcounter = 86400;
  $scope.hours   = Math.floor($scope.totalcounter / 3600);
  $scope.minutes = Math.floor(($scope.totalcounter - ($scope.hours * 3600)) / 60);
  $scope.seconds = $scope.totalcounter - ($scope.hours * 3600) - ($scope.minutes * 60);

    var mytimeout = null; // the current timeoutID
    $scope.onTimeout = function() {
        if ($scope.seconds == 0)
        {
          if ($scope.minutes == 0) 
          {
              if ($scope.hours == 0) 
              {
                  $scope.$broadcast('timer-stopped', 0);
                  $timeout.cancel(mytimeout);
                  return;
              }
              $scope.minutes = 60;
              $scope.hours--;
          }
          $scope.seconds = 60;
          $scope.minutes--;
        }
        $scope.seconds--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 90;
        $timeout.cancel(mytimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }
    });
    $scope.startTimer();
});