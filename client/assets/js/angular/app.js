
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

app.directive('ttip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // console.log(attrs);
            $(element).tooltip(scope.$eval(attrs.ttip));
        }
    };
});
