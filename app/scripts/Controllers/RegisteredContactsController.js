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
                req_format.param = {first_name:newContact.FirstName,middle_name:newContact.MiddleName,
                    last_name:newContact.LastName,phone:newContact.Phone,
                    email:newContact.Email,age:newContact.Age,sex:newContact.Sex,
                    country:newContact.Country,region:newContact.Region,city:newContact.City,
                    wereda:newContact.Wereda,kebele:newContact.Kebele,house_num:newContact.HouseNum,
                    postal_box:newContact.PostalBox,synod:newContact.Synod,presbytery:newContact.Presbytery,
                    congregation:newContact.Congregation,other_congregation:newContact.OtherCongregation,
                    occupation:newContact.Occupation,educational_background:newContact.EducationalBackground,
                    qualification:newContact.Qualification,contribution_period:newContact.ContributionPeriod,
                    other_contribution:newContact.OtherCOntribution,special_gift:newContact.SpecialGift
                };
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
                req_format.service = "update_contact";
                req_format.param = {contact_id:newContact.id,
                    first_name:newContact.first_name,middle_name:newContact.middle_name,
                    last_name:newContact.last_name,phone:newContact.phone,
                    email:newContact.email,age:newContact.age,sex:newContact.sex,
                    country:newContact.country,region:newContact.region,city:newContact.city,
                    wereda:newContact.wereda,kebele:newContact.kebele,house_num:newContact.house_num,
                    postal_box:newContact.postal_box,synod:newContact.synod,presbytery:newContact.presbytery,
                    congregation:newContact.congregation,other_congregation:newContact.other_congregation,
                    occupation:newContact.occupation,educational_background:newContact.educational_background,
                    qualification:newContact.qualification,contribution_period:newContact.contribution_period,
                    other_contribution:newContact.other_contribution,special_gift:newContact.special_gift
                };
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
                size:'lg',
                controller: ModalInstanceCtrl
            });
        };
        $scope.editContact = function (contact) {
            $scope.SelectedContact = contact;
            console.log("Selected Contact:",$scope.SelectedContact);
            var modalInstance = $uibModal.open({
                templateUrl: 'views/Contacts/ModalEditContact.html',
                size:'lg',
                controller: ModalInstanceCtrl
            });
        };
    });