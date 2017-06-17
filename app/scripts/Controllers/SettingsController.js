/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('SettingsCtrl', function($scope, $location, $state,$uibModal,APIServices) {
        console.log("Settings controller loaded");
        $scope.Users = [];
        $scope.Privilege = APIServices.getMainUser().privilege;
        function loadUsers() {
            var req_format = APIServices.getRequestFormat();
            req_format.service = "get_all_users";
            req_format.param = {};
            console.log("Sent Request:->", req_format);
            APIServices.requestServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var users = response.data.response;
                    if(users){
                        console.log("Users->:",users);
                        $scope.Users = users;
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        }
        loadUsers();
        $scope.removeUser = function (user) {
            swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this user back!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, remove it!",
                    cancelButtonText: "No, cancel please!",
                    closeOnConfirm: false,
                    closeOnCancel: false },
                function (isConfirm) {
                    if (isConfirm) {
                        var req_format = APIServices.getRequestFormat();
                        req_format.service = "remove_user";
                        req_format.param = {item_id:user.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadUsers();
                                    swal("Deleted!", user, "success");
                                }else {
                                    var error = response.data.error;
                                    swal("Failed", error, "error");
                                }
                            }
                        });
                    } else {
                        swal("Cancelled", "The user is safe :)", "error");
                    }
                });
        };
        $scope.activateUser = function (user) {
            swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this user back!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, remove it!",
                    cancelButtonText: "No, cancel please!",
                    closeOnConfirm: false,
                    closeOnCancel: false },
                function (isConfirm) {
                    if (isConfirm) {
                        var req_format = APIServices.getRequestFormat();
                        req_format.service = "activate_user";
                        req_format.param = {item_id:user.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadUsers();
                                    swal("Deleted!", user, "success");
                                }else {
                                    var error = response.data.error;
                                    swal("Failed", error, "error");
                                }
                            }
                        });
                    } else {
                        swal("Cancelled", "The user is safe :)", "error");
                    }
                });
        };
        $scope.deActivateUser = function (user) {
            swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this user back!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, remove it!",
                    cancelButtonText: "No, cancel please!",
                    closeOnConfirm: false,
                    closeOnCancel: false },
                function (isConfirm) {
                    if (isConfirm) {
                        var req_format = APIServices.getRequestFormat();
                        req_format.service = "deactivate_user";
                        req_format.param = {item_id:user.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadUsers();
                                    swal("Deleted!", user, "success");
                                }else {
                                    var error = response.data.error;
                                    swal("Failed", error, "error");
                                }
                            }
                        });
                    } else {
                        swal("Cancelled", "The user is safe :)", "error");
                    }
                });
        };
        function ModalInstanceCtrl ($scope, $uibModalInstance) {
            $scope.Privileges = {};
            function getPrivileges() {
                var req_format = APIServices.getRequestFormat();
                req_format.service = "get_user_privilege";
                req_format.param = {};
                console.log("Sent:",req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("Recieved:",response);
                    if(response !== null && response.data !== null){
                        var privileges = response.data.response;
                        if(privileges){
                            $scope.Privileges = privileges;
                        }
                    }
                });
            }
            getPrivileges();
            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };
            $scope.addUser = function (newUser) {
                console.log("Add New User:->", newUser);
                var req_format = APIServices.getRequestFormat();
                req_format.service = "add_user";
                req_format.param = {user_name:newUser.UserName,user_pass:newUser.UserPass,full_name:newUser.FullName,email:newUser.Email,privilege_id:newUser.Privilege};
                console.log("Sent:",req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("Response:",response);
                    if(response !== null && response.data !== null){
                        var privileges = response.data.response;
                        if(privileges){
                            loadUsers();
                        }
                    }
                });
                $uibModalInstance.close();
            };
        }
        $scope.addNewUser = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Settings/ModalAddUser.html',
                controller: ModalInstanceCtrl
            });
        };
    });