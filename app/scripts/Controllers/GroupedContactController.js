/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('GroupedContactCtrl', function($scope, $location, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.adminLogin = function (user) {
            $state.go("index.dashboard");
        }
        $scope.ContactGroups = [];
        $scope.GroupContacts = [];
        $scope.GroupNewContacts = [];
        function loadGroups() {
            var req_format = APIServices.getRequestFormat();
            req_format.service = "get_all_groups";
            req_format.param = {};
            console.log("Sent Request:->", req_format);
            APIServices.requestServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var groups = response.data.response;
                    if(groups){
                        console.log("Groups->:",groups);
                        $scope.ContactGroups = groups;
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        }
        loadGroups();
    });