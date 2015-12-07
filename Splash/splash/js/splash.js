(function (angular, window, document) {

    'use strict';
    var app = angular.module('theApp', []);

    var mainCtrl = app.controller('MainCtrl', [
        '$scope', 'mainModel',
        function ($scope, mainModel) {
            mainModel.loadUser().then(
                function (data) {
                    $scope.initData = data.data[0];
                },
                function (data) {
                    alert('loading data is failed!');
                }
            );

            $scope.saveUser = function (user) {
                mainModel.saveUser(user).then(
                    function() {/*success...*/},
                    function() {/*else...*/}
                );
            };

            $scope.onsubmit = function() {

            };
    }]);

    app.factory('mainModel', ['$http', '$q', function ($http, $q) {
        function MainModel() {}

        MainModel.prototype.loadUser = function () {
            var deferred = $q.defer();
            $http.get('data/user.json').then
            (
                function (a) {deferred.resolve(a.data);},
                function (a) {deferred.reject(a.data);}
            );

            return deferred.promise;
        };

        MainModel.prototype.saveUser = function (user) {
            var deferred = $q.defer();
            $http.post('data/saveUser.json', user).then(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject();
            });

            return deferred.promise;
        };

        return new MainModel();
    }]);

})(angular, window, document);
