/**
 * Created by bengeos on 3/3/17.
 */
angular
    .module('inspinia')
    .factory('APIServices', function ($http,$httpParamSerializer,$cookies) {

        var MainUser = {user_name:null,user_pass:null,privilege:git ,full_name:'',privilege_name:''};

        var Value = null;
        function requestFormat() {
            var req_format = {user_name:'',user_pass:'',service:'', param:''};
            req_format.user_name = $cookies.get('user_name');
            req_format.user_pass = $cookies.get('user_pass');
            req_format.service = "-";
            req_format.param = "-";
            return req_format;
        }
        var Services = {};
        Services.requestServer = function (request) {
            return $http({
                method:'POST',
                url:'http://localhost:8888/MembersManager_api/public/api',
                data:$httpParamSerializer(request),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            });
        };
        Services.getMainUser = function () {
            console.log("Getting Main User:->",{"UserPass":$cookies.get('user_pass'),"UserName":$cookies.get('user_name')});
            return {user_name:$cookies.get('user_name'),user_pass:$cookies.get('user_pass'),privilege:$cookies.get('privilege'),full_name:$cookies.get('full_name'),privilege_name:$cookies.get('privilege_name'),company_name:$cookies.get('company_name')};;
        };
        Services.setMainUser = function (user) {
            MainUser.user_name = user.user_name;
            MainUser.user_pass = user.user_pass;
            MainUser.privilege = user.privilege;
            MainUser.full_name = user.full_name;
            MainUser.email = user.email;
            MainUser.privilege_name = user.privilege_name;
            console.log("Saving Main User:->",MainUser);
            $cookies.put('user_name', user.user_name);
            $cookies.put('user_pass', user.user_pass);
            $cookies.put('privilege', user.privilege);
            $cookies.put('full_name', user.full_name);
            $cookies.put('email', user.email);
            $cookies.put('privilege_name', user.privilege_name);
            $cookies.put('company_name', user.company_name);

        };
        Services.setMainValue = function (newValue) {
            Value = newValue;
            console.log("Setting Value:->",Value);
        };
        Services.getMainValue = function () {
            return Value;
        };
        Services.getRequestFormat = function () {
            return requestFormat();
        };
        return Services;
    });