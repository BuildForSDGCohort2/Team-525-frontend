
var zapp = angular.module('login.controller', [
  'angular-loading-bar'
,'ngSanitize'
,'ngAnimate'
,'angular.filter'
,'ngMaterial'
,'ngDialog'
,'app.factories'
,'app.filters'
]);

zapp.run([
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  function( 
  $rootScope,
  $timeout,
  $http,
  $window){
}]);//run

zapp.controller("loginCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'parse',
  'toast',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  parse,
  toast){
$scope.ldata = {};
$scope.hideForm = $scope.isLoading = $scope.reqDone = false; 
$scope.doLogin = function(data){
data.action = 'userLogin';
console.log(data)
$scope.isLoading = true;
$scope.reqDone = false;
var vUrl = 'modules/account/accountApp.php';
$http.post(vUrl,data).then(function(res) { 
console.log(res)
$scope.isLoading = false;
$scope.reqDone = true;
var rs = res.data;
$scope.login_message = parse.dress_notice(rs);
if(rs.status=='1' || rs.state=='1'){
$scope.hideForm = true;
$timeout(function() {
$window.location.replace('./account');  
}, 1500); 
}//ifStatus

},function(error){
$scope.isLoading = false;
$scope.hideForm = false;
$scope.reqDone = true;
var rs = {status:false,state:'0',message:`We have experienced Network Error. Please Try Again`} 
$scope.login_message = parse.dress_notice(rs);
 
});

}

$scope.modalData = [];



}]);//loginCtrl


zapp.controller("regCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'parse',
  'toast',
  'modal',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  parse,
  toast,
  modal){
$scope.ldata = {};
var app_url = 'modules/account/accountApp.php';
$scope.hideForm = $scope.isLoading = $scope.reqDone = false; 
$scope.doReg = function(data){
data.action = 'userRegister';
console.log(data)
$scope.isLoading = true;
$scope.reqDone = false;
$http.post(app_url,data).then(function(res) { 
console.log(res)
$scope.isLoading = false;
$scope.reqDone = true;
var rs = res.data;
$scope.login_message = parse.dress_notice(rs);
if(rs.status=='1' || rs.state=='1'){
$scope.hideForm = true;
$timeout(function() {
$window.location.replace('./account');  
}, 6500); 
}//ifStatus

},function(error){
$scope.isLoading = false;
$scope.hideForm = false;
$scope.reqDone = true;
var rs = {status:false,state:'0',message:`We have experienced Network Error. Please Try Again`} 
$scope.login_message = parse.dress_notice(rs);
 
});

}

$scope.modalData = [];
var descs = new Array();
descs['mentor'] = `<p>SLN Mentor account provides you with the opportunity
to mentor and educate other users.<br> You will be able to create free 
and premium articles that you can <b>sell</b> or share <b>freely</b> with your connections
</p>`;
descs['user'] = `As a regular user, you will be able to find <b>Mentors</b> who you can learn
from as well as interact with other users in finding answers.`;
$scope.lpc = function(mode){
title = 'About SLN '+mode +' Account';
toast.show({title:title,message:descs[mode]})
}

$scope.department_list = [];
$http.post(app_url,{action:'list_departments'}).then(function(res){
console.log(res)
$scope.department_list = res.data;
})



$scope.ldata.followed_departments = [];
$scope.toggleSelection = function(obj) {
var idx = $scope.ldata.followed_departments.indexOf(obj);
// Is currently selected
if (idx > -1) {
$scope.ldata.followed_departments.splice(idx, 1);
}
// Is newly selected
else {
$scope.ldata.followed_departments.push(obj);
}

};

$scope.lnc = function(){
var opts = {page:'templates/dialogs/register-followed-departments-preview.html',
data:$scope.ldata.followed_departments}
modal.show(opts,$scope);
}


}]);//regCtrl


zapp.controller("forgotCtrl", 
[
  '$scope',
  '$rootScope',
  '$timeout',
  '$http',
  '$window',
  'parse',
  function( 
  $scope,
  $rootScope,
  $timeout,
  $http,
  $window,
  parse){
$scope.ldata = {};
$scope.hideForm = $scope.isLoading = $scope.reqDone = false; 
$scope.doReset = function(data){
data.action = 'userPasswordReset';
console.log(data)
$scope.isLoading = true;
$scope.reqDone = false;
var vUrl = 'modules/account/accountApp.php';
$http.post(vUrl,data).then(function(res) { 
console.log(res)
$scope.isLoading = false;
$scope.reqDone = true;
var rs = res.data;
$scope.login_message = parse.dress_notice(rs);
if(rs.status=='1' || rs.state=='1'){
$scope.hideForm = true;
$timeout(function() {
$window.location.replace('./account');  
}, 1500); 
}//ifStatus

},function(error){
$scope.isLoading = false;
$scope.hideForm = false;
$scope.reqDone = true;
var rs = {status:false,state:'0',message:`We have experienced Network Error. Please Try Again`} 
$scope.login_message = parse.dress_notice(rs);
 
});

}

$scope.modalData = [];




}]);//loginCtrl
