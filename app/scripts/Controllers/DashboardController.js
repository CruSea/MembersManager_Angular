/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('DashboardCtrl', function($scope, $location, $state,APIServices) {
        console.log("Dashboard controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.LogOut = function () {
            APIServices.setMainUser({});
            $state.go("admin_login");
        };
    });