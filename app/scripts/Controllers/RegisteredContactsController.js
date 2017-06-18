/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('RegisteredContactsCtrl', function($scope,DTOptionsBuilder, $location,$uibModal, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.Contacts = [];
        $scope.SelectedContact = null;
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
        function getSelectedContact() {
            return $scope.SelectedContact;
        }
        function loadContact() {
            var req_format = APIServices.getRequestFormat();
            req_format.service = "get_all_member_contacts";
            req_format.param = {};
            console.log("Sent Request:->", req_format);
            APIServices.requestServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var contacts = response.data.response;
                    if(contacts){
                        console.log("Contacts->:",contacts);
                        $scope.Contacts = contacts;
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        }
        loadContact();
        function ModalInstanceCtrl ($scope, $uibModalInstance) {
            $scope.Privileges = {};
            $scope.Contact = getSelectedContact();
            function getPrivileges() {
                var req_format = APIServices.getRequestFormat();
                req_format.service = "get_privileges";
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
            $scope.addContact = function (newContact) {
                console.log("Add New Member Contact:->", newContact);
                var req_format = APIServices.getRequestFormat();
                req_format.service = "add_new_contact";
                req_format.param = {first_name:newContact.FirstName,middle_name:newContact.MiddleName,last_name:newContact.LastName,phone:newContact.Phone,email:newContact.Email,age:newContact.Age,sex:newContact.Sex};
                console.log("Sent:",req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("Response:",response);
                    if(response !== null && response.data !== null){
                        var privileges = response.data.response;
                        if(privileges){
                            loadContact();
                        }
                    }
                });
                $uibModalInstance.close();
            };
            $scope.updateContact = function (newContact) {
                console.log("Update Contact:->", newContact);
                var req_format = APIServices.getRequestFormat();
                req_format.service = "update_company_contact";
                req_format.param = {contact_id:$scope.Contact.id,full_name:newContact.full_name,phone:newContact.phone_number,email:newContact.email,location:newContact.location,note:newContact.note,description:newContact.description};
                console.log("Sent Update Contact:",req_format);
                APIServices.requestServer(req_format).then(function (response) {
                    console.log("Response:",response);
                    if(response !== null && response.data !== null){
                        var privileges = response.data.response;
                        if(privileges){
                            loadContact();
                        }
                    }
                });
                $uibModalInstance.close();
            };
            $scope.removeContact = function (newContact) {
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
                            req_format.service = "remove_contact";
                            req_format.param = {item_id:$scope.Contact.id};
                            console.log("Sent Request:->", req_format);
                            APIServices.requestServer(req_format).then(function (response) {
                                console.log("Response:->", response);
                                if(response !== null && response.data !== null){
                                    var user = response.data.response;
                                    if(user){
                                        loadContact();
                                        swal("Deleted!", user, "success");
                                        $uibModalInstance.close();
                                    }else {
                                        var error = response.data.error;
                                        swal("Failed", error, "error");
                                        $uibModalInstance.close();
                                    }
                                }
                            });
                        } else {
                            swal("Cancelled", "The user is safe :)", "error");
                        }
                    });
            };
        }
        $scope.addNewContact = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Contacts/ModalAddContact.html',
                controller: ModalInstanceCtrl
            });
        };
        $scope.editContact = function (contact) {
            $scope.SelectedContact = contact;
            console.log("Selected Contact:",$scope.SelectedContact);
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Contacts/ModalEditContact.html',
                controller: ModalInstanceCtrl
            });
        };
    });