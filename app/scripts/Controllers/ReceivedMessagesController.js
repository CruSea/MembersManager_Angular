/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('ReceivedMessagesCtrl', function($scope, $location, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.adminLogin = function (user) {
            $state.go("index.dashboard");
        }
        function loadReceivedMessages() {
            var req_format = APIServices.getNegaritRequestFormat();
            req_format.service = "get_all_company_received_messages";
            req_format.param = {};
            console.log("Sent Request:->", req_format);
            APIServices.requestNegaritServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var smsPorts = response.data.response;
                    if(smsPorts){
                        console.log("Company Received Messages->:",smsPorts);
                        $scope.ReceivedMessages = smsPorts;
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        }
        loadReceivedMessages();
        $scope.removeReceivedMessage = function (sendMessage) {
            swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this message!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, remove it!",
                    cancelButtonText: "No, cancel please!",
                    closeOnConfirm: false,
                    closeOnCancel: false },
                function (isConfirm) {
                    if (isConfirm) {
                        var req_format = APIServices.getNegaritRequestFormat();
                        req_format.service = "remove_company_received_message";
                        req_format.param = {item_id:sendMessage.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestNegaritServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadReceivedMessages()
                                    swal("Deleted!", "Your Send Message has been deleted.", "success");
                                }else {
                                    swal("Failed", "unable to remove this Send Message", "error");
                                }
                            }
                        });
                    } else {
                        swal("Cancelled", "The Campaign is safe :)", "error");
                    }
                });
        };
    });