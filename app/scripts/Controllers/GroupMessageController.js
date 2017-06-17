/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('GroupedMessagesCtrl', function($scope, $location, $state) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.adminLogin = function (user) {
            $state.go("index.dashboard");
        }
    });