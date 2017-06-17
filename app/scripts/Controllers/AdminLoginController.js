angular
    .module('inspinia')
    .controller('AdminLogInCtrl', function($scope, $location, $state,APIServices) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
        $scope.adminLogin = function (newUser) {
            var req_format = APIServices.getRequestFormat();
            req_format.user_name = newUser.UserName;
            req_format.user_pass = newUser.UserPass;
            req_format.service = "log_in";
            req_format.param = "[]";
            console.log("Sent Request:->", req_format);
            APIServices.requestServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var user = response.data.response;
                    if(user){
                        var MainUser = {user_name:newUser.UserName,user_pass:newUser.UserPass,privilege:user.privilege.id,full_name:user.full_name,email:user.email,privilege_name:user.privilege.name,company_name:user.company_name};
                        if(MainUser.user_name !== null && MainUser.user_pass !== null && MainUser.privilege !== null && MainUser.privilege_name !== null){
                            APIServices.setMainUser(MainUser);
                            console.log("Log in Response->:",user);
                            $scope.User = {};
                            $state.go("index.dashboard");
                        }else {
                            swal("Oops!", "Invalid Information provided! please enter a valid information", "error");
                        }
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                        swal("Oops!", error, "error");
                        $scope.User = {};
                    }
                }else {
                    swal("Oops!", "it seems like there is problem while trying to connect to server", "error");
                }
            });
        };
        $scope.userSignUp = function (newUser) {
            var req_format = APIServices.getRequestFormat();
            req_format.user_name = newUser.UserName;
            req_format.user_pass = newUser.UserPass;
            req_format.service = "register";
            req_format.param = {user_name:newUser.UserName,user_pass:newUser.UserPass,full_name:newUser.FullName,email:newUser.Email};
            console.log("Sent Request:->", req_format);
            APIServices.requestServer(req_format).then(function (response) {
                console.log("Response:->", response);
                if(response !== null && response.data !== null){
                    var user = response.data.response;
                    if(user){
                        console.log("Log in Response->:",user);
                        $state.go("admin_login");
                        swal("Congratulation!", "You are Successfully Registered", "success");
                        $scope.User = {};
                    }else {
                        var error = response.data.error;
                        console.log("Error Response->:",error);
                        swal("Oops!", "Invalid Information provided! please enter a valid information", "error");
                        $scope.User = {};
                    }
                }
            });
        }
    });
