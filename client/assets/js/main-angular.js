
var app = angular.module('diko', []);

app.controller('WordController', function($http, $scope) {
    var that = this;

    that.word = {}; // Structure Mot, contenant un array rel[] (liste des mots en relation), Def, et Name
    that.isLoad = false;
    that.listTypes = []; // Liste des types des relations, unique

    var name = "chat"; // TODO

    // Contruit la liste unique des types
    var buildTypes = function() {
        var rel = that.word.ListRel;
        var list = [];
        for (var i in rel) {
            list.push(rel[i].Type);
        }
        list = $.unique(list);

        that.listTypes = [];
        for (i in list) {
            var r = {
                label: list[i],
                name: getFullNameOfType(list[i])
            };
            that.listTypes.push(r);
        }
    };

    // typeNeedle string label dlf r_associated
    // Retourne un tableau de Ref (voir structures)
    that.getWordsFromType = function(typeNeedle) {
        console.log("typeNeedle = "+typeNeedle);
        var rel = that.word.ListRel;
        var list = [];
        for (var i in rel) {
            var labelType = rel[i].Type;
            if (labelType == typeNeedle) {
                list.push(rel[i]);
            }
        }
        return list;
    };

    $http.get("/getWord?word="+name)
        .then(function(response) {
            that.word = response.data;
            buildTypes();
            // console.log(response);
            that.isLoad = true;
        });
});
