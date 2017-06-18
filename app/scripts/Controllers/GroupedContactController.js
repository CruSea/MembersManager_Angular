/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('GroupedContactCtrl', function($scope, $location,$uibModal,DTOptionsBuilder, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.adminLogin = function (user) {
            $state.go("index.dashboard");
        }
        $scope.ContactGroups = [];
        $scope.GroupContacts = [];
        $scope.GroupNewContacts = [];
        var SelectedGroup = APIServices.getMainValue();
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                {extend: 'excel', title: 'Negart SMS Gateway'},
                {extend: 'pdf', title: 'Negart SMS Gateway'},
                {extend: 'print',
                    customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');
                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);
        $scope.dtOption = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
            ]);
        function getSelectedGroup() {
            return SelectedGroup;
        }
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
        function loadGroupedContacts() {
            console.log("Load Group Contact->:",SelectedGroup);
            if(SelectedGroup !== null){
                $scope.SelectedGroup = SelectedGroup;
                var req_format = APIServices.getRequestFormat();
                req_format.service = "get_all_member_contacts_in_group";
                req_format.param = {item_id:SelectedGroup.id};
                console.log("Group Contact Sent Request:->", req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("In Group Response:->", response);
                    if(response !== null && response.data !== null){
                        var groups = response.data.response;
                        if(groups){
                            console.log("IN Groups->:",groups);
                            $scope.GroupContacts = groups;
                        }else {
                            var error = response.data.error;
                            console.log("Error Response->:",error);
                        }
                    }
                });
                loadContactsNotInGroup();
            }
        }
        function loadContactsNotInGroup() {
            if(SelectedGroup !== null){
                $scope.SelectedGroup = SelectedGroup;
                var req_format = APIServices.getRequestFormat();
                req_format.service = "get_all_member_contacts_not_in_group";
                req_format.param = {item_id:SelectedGroup.id};
                console.log("Grouped Not in Sent Request:->", req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("Not In Group Response:->", response);
                    if(response !== null && response.data !== null){
                        var groups = response.data.response;
                        if(groups){
                            console.log("Not in Group ->:",groups);
                            $scope.GroupNewContacts = groups;
                        }else {
                            var error = response.data.error;
                            console.log("Error Response->:",error);
                        }
                    }
                });
            }
        }
        loadGroups();
        loadGroupedContacts();
        $scope.showDetail = function (group) {
            console.log("Selected Group -> ",group);
            APIServices.setMainValue(group);
            SelectedGroup = group.id;
            $state.go("contact.detail");
        }
        $scope.addNewGroupContact = function (contact) {
            swal({
                    title: "Are you sure?",
                    text: "You are adding this contact to your group",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, Add it!",
                    cancelButtonText: "No, cancel please!",
                    closeOnConfirm: false,
                    closeOnCancel: false },
                function (isConfirm) {
                    if (isConfirm) {
                        var req_format = APIServices.getRequestFormat();
                        req_format.service = "add_group_contact";
                        req_format.param = {group_id:getSelectedGroup().id,contact_id:contact.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadGroupedContacts();
                                    swal("Contact Added!", "Contact Added Successfully", "success");
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
        $scope.removeGroup = function (group) {
            swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this Group back!",
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
                        req_format.service = "remove_group";
                        req_format.param = {item_id:group.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadGroups();
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
        $scope.removeGroupContact = function (contact) {
            swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this contact back!",
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
                        req_format.service = "remove_grouped_contact";
                        req_format.param = {item_id:contact.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadGroupedContacts();
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
            $scope.addGroup = function (newGroup) {
                console.log("Add New Group:->", newGroup);
                var req_format = APIServices.getRequestFormat();
                req_format.service = "add_new_group";
                req_format.param = {name:newGroup.Name,description:newGroup.Description};
                console.log("Sent:",req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("Response:",response);
                    if(response !== null && response.data !== null){
                        var privileges = response.data.response;
                        if(privileges){
                            loadGroups();
                        }
                    }
                });
                $uibModalInstance.close();
            };
            $scope.addGroupContact = function (newContact) {
                console.log("Add Group Contact:->", newContact);
                var req_format = APIServices.getRequestFormat();
                req_format.service = "add_new_company_group_contact";
                req_format.param = {group_id:SelectedGroup.id,full_name:newContact.FullName,phone:newContact.Phone,email:newContact.Email,location:newContact.Location,note:newContact.Note,description:newContact.Description};
                console.log("Sent:",req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("Response:",response);
                    if(response !== null && response.data !== null){
                        var privileges = response.data.response;
                        if(privileges){
                            loadGroups();
                            loadGroupedContacts();
                        }
                    }
                });
                $uibModalInstance.close();
                $uibModalInstance.close();
            };
        }
        $scope.addNewGroup = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Contacts/ModalAddGroup.html',
                controller: ModalInstanceCtrl
            });
        };
        $scope.addGroupContact = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Contacts/ModalAddGroupContact.html',
                controller: ModalInstanceCtrl
            });
        };
    });