
var app = angular.module('diko', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'PageController',
        templateUrl: 'content/home.html'

    })
    .when('/word', {
        controller: 'PageController',
        templateUrl: 'content/word.html',
        resolve: {
            promise: function (Loader) {
                return WordLoader.promise;
            }
        }
    });
});
