/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('RegisteredContactsCtrl', function($scope,DTOptionsBuilder, $location, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.Contacts = [];
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
    });