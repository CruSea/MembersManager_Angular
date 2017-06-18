/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('GroupedMessagesCtrl', function($scope, $location, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.adminLogin = function (user) {
            $state.go("index.dashboard");
        }
        function loadContactGroup() {
            var req_format = APIServices.getRequestFormat();
            req_format.service = "get_all_groups";
            req_format.param = {};
            console.log("Load Contact Group Sent Request:->", req_format);
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
        function loadGroupMessages() {
            var req_format = APIServices.getRequestFormat();
            req_format.service = "get_all_group_messages";
            req_format.param = {};
            console.log("Sent Request:->", req_format);
            APIServices.requestServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var smsPorts = response.data.response;
                    if(smsPorts){
                        console.log("Company Send Messages->:",smsPorts);
                        $scope.GroupMessages = smsPorts;
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        }
        loadCampaigns();
        loadContactGroup();
        loadGroupMessages();
        $scope.addNewGroupMessage = function (groupMessage) {
            console.log("Add Group Messages->:",groupMessage);
            var req_format = APIServices.getRequestFormat();
            req_format.service = "add_new_group_message";
            req_format.param = {campaign_name:groupMessage.CampaignID,group_id:groupMessage.GroupID,message:groupMessage.Message};
            console.log("Sent Request:->", req_format);
            APIServices.requestServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var smsPorts = response.data.response;
                    if(smsPorts){
                        console.log("Message Sent->:",smsPorts);
                        $scope.Campaigns = smsPorts;
                        swal("Message Sent!", "Your message has been sent.", "success");
                        $scope.Message = {};
                        loadCampaigns();
                        loadContactGroup();
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                    }
                }
            });
        };
        $scope.removeGroupMessage = function (sendMessage) {
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
                        var req_format = APIServices.getRequestFormat();
                        req_format.service = "remove_group_message";
                        req_format.param = {item_id:sendMessage.id};
                        console.log("Sent Request:->", req_format);
                        APIServices.requestServer(req_format).then(function (response) {
                            console.log("Response:->", response);
                            if(response !== null && response.data !== null){
                                var user = response.data.response;
                                if(user){
                                    loadGroupMessages();
                                    swal("Deleted!", "Your Group Message has been deleted.", "success");
                                }else {
                                    swal("Failed", "unable to remove this Group Message", "error");
                                }
                            }
                        });
                    } else {
                        swal("Cancelled", "The Campaign is safe :)", "error");
                    }
                });
        };
    });

