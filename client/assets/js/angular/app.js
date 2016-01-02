
var app = angular.module('diko', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'PageController',
        templateUrl: 'content/home.html'

    })
    .when('/word/:word', {
        controller: 'PageController',
        templateUrl: 'content/word.html',
        resolve: {
            promise: function (WordLoader) {
                return WordLoader.promise;
            }
        }
    });
});
