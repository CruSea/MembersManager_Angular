/**
 * Created by bengeos on 6/17/17.
 */
angular
    .module('inspinia')
    .controller('RegisteredContactsCtrl', function($scope,DTOptionsBuilder, $location, $state) {
        console.log("AdminLog in controller loaded");
        var req_format = {user_name:'',userpass:'',service:'', param:''};
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
    });