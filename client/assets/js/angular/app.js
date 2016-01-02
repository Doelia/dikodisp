
var app = angular.module('diko', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'content/home.html'

    })
    .when('/word/:word', {
        templateUrl: 'content/word.html',
        resolve: {
            promise: function (WordLoader) {
                return WordLoader.promise;
            }
        }
    });
});
