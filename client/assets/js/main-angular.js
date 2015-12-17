
var app = angular.module('diko', []);

app.controller('WordController', function($http, $scope) {
    var that = this;

    that.word = {};
    that.isLoad = false;
    that.listTypes = [];

    var name = "chat"; // TODO

    var buildTypes = function() {
        var rel = that.word.ListRel;
        var list = [];
        for (var i in rel) {
            var r = rel[i];
            list.push(r.Type);
        }
        list = $.unique(list);
        that.listTypes = list;
    }

    var getWordsFromType = function(typeNeedle) {
        var rel = that.listTypes;
        var list = [];
        for (var i in rel) {
            var r = rel[i];
            if (r.Type == typeNeedle) {
                list.push(r);
            }
        }
        return list;
    }

    $http.get("/getWord?word="+name)
        .then(function(response) {
            that.word = response.data;
            buildTypes();
            console.log(response);
            that.isLoad = true;
        });
});
