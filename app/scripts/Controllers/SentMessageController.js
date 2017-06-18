/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('SentMessagesCtrl', function($scope, $location, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.adminLogin = function (user) {
            $state.go("index.dashboard");
        }
        function loadSendMessages() {
            var req_format = APIServices.getNegaritRequestFormat();
            req_format.service = "get_all_company_sent_messages";
            req_format.param = {};
            console.log("Sent Request:->", req_format);
            APIServices.requestNegaritServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var smsPorts = response.data.response;
                    if(smsPorts){
                        console.log("Company Send Messages->:",smsPorts);
                        $scope.SendMessages = smsPorts;
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        }
        function loadCampaigns() {
            var req_format = APIServices.getNegaritRequestFormat();
            req_format.service = "get_all_company_campaigns";
            req_format.param = {};
            console.log("Sent Request:->", req_format);
            APIServices.requestNegaritServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var smsPorts = response.data.response;
                    if(smsPorts){
                        console.log("Company Campaigns->:",smsPorts);
                        $scope.Campaigns = smsPorts;
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        }
        loadCampaigns();
        loadSendMessages();
        $scope.addNewSendMessage = function (sendMessage) {
            var req_format = APIServices.getNegaritRequestFormat();
            req_format.service = "add_new_send_message";
            req_format.param = {campaign_name:sendMessage.CampaignName,to:sendMessage.Phone,message:sendMessage.Message};
            console.log("Sent Request:->", req_format);
            APIServices.requestNegaritServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var smsPorts = response.data.response;
                    if(smsPorts){
                        console.log("Message Sent->:",smsPorts);
                        $scope.Campaigns = smsPorts;
                        swal("Message Sent!", "Your message has been sent.", "success");
                        $scope.Message = {};
                        loadCampaigns();
                        loadSendMessages();
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        };
        $scope.removeSendMessage = function (sendMessage) {
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
                        req_format.service = "remove_company_send_message";
                        req_format.param = {item_id:sendMessage.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestNegaritServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadSendMessages();
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