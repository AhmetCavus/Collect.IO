(function() {
  'use strict';

  angular
    .module('app')
    .controller('JoinCtrl', JoinCtrl);

  JoinCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];

  function JoinCtrl($location, $scope, $localStorage, socket) {
    $scope.clientId = 'admin@karpos.com';
    $scope.secretId = 'aK4A25ak.';
    $scope.channelId = 'collect';
    $scope.token = '';
    $scope.info = 'Info Panel';
    var account;

    $scope.join = function() {
        $.ajax({
            url: '/auth',
            method: 'POST',
            data: {
                clientId: $scope.clientId,
                secretId: $scope.secretId
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Basic YWhtZXQuY2F2dXNAZmlraXJkZWsuY29tOnRlc3R0ZXN0');
            },
            success: function(result) {
                $scope.token = result.token;
                $scope.info = $scope.token;
                $.ajax({
                    url: '/channel/collect',
                    method: 'POST',
                    data: {
                        token: $scope.token,
                        channelId: $scope.channelId
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic YWhtZXQuY2F2dXNAZmlraXJkZWsuY29tOnRlc3R0ZXN0');
                    },
                    success: function(result) {
                        $scope.info = JSON.stringify(result);
                        socket.connect($scope.token, $scope.channelId);
                        socket.on('connect', onSocketConnected);
                        socket.on('disconnect', onSocketDisconnected);
                        socket.on('error', onSocketError);
                        socket.on('unauthorized', onSocketUnauthorized);
                        account = parseJwt($scope.token);
                        $localStorage.account = account;
                    },
                    error: function(err) {
                        $scope.info = err.responseText;
                    }
    
                });
            },
            error: function(err) {
                $scope.info = err.responseText;
            }
        });
    };

    function onSocketConnected() {
        $scope.info = 'authenticated';
        $location.path('/main');
    }

    function onSocketDisconnected() {
        $scope.info = 'disconnected';
    }

    function onSocketError(err) {
        $scope.info = err;
    }

    function onSocketUnauthorized(err) {
        $scope.info = err;
    }

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

  }

})();
