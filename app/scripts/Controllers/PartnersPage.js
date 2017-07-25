/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('PartnersPageCtrl', function($scope, $location, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.NewMember = {};
        $scope.addNewContact = function (newContact) {
            console.log("Add New Member Contact:->", newContact);
            var req_format = APIServices.getRequestFormat();
            req_format.service = "add_new_contact";
            req_format.param = {first_name:newContact.FirstName,middle_name:newContact.MiddleName,last_name:newContact.LastName,phone:newContact.Phone,email:newContact.Email,age:"",sex:newContact.Sex};
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
    });