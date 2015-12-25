
var app = angular.module('diko', []);

app.service('WordLoader', function($q, $http, $timeout) {

    var deferred = $q.defer();
    var fakeTimeSeconds = 0;

    var that = function() {

        this.GetWord = function(name, callback) {
            return $http.get("/getWord?word="+name)
                .then(function(response) {
                    if (response.data != "404") {
                        var wordJson = response.data;
                        callback(wordJson);
                    } else {
                        console.log("not found");
                        callback(null);
                    }
                });
        };

        $timeout(function() {
            deferred.resolve();
        }, fakeTimeSeconds * 1000);

    };

    var o = new that();
    o.promise = deferred.promise;
    return o;

});

app.controller('SearchController', function() {
    var that = this;

    that.word = "Chat"; // TODO
});

app.controller('WordController', function($http, $scope, WordLoader) {
    var that = this;

    that.word = {}; // Structure Mot, voir structure Go
    that.isLoad = false;
    that.listTypes = []; // Liste des types des relations, unique (label, name)

    var name = "chat"; // TODO

    // Contruit la liste unique des types depuis la liste des mot associés au mot chargé
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
            if (r.name !== null) {
                that.listTypes.push(r);
            }
        }
    };

    var buildStars = function() {
        var types = that.listTypes;
        for (var i in types) {
            var aliasType = types[i];
            var rels = that.getWordsFromType(aliasType.label);
            var sum = rels.length;
            for (var j in rels) {
                var rel = rels[j];
                var stars = 10 - (j / sum * 10);
                rels[j].Stars = Math.ceil(stars);
            }
        }
    };

    // typeNeedle string label dlf r_associated
    // Retourne un tableau de Ref (voir structures)
    that.getWordsFromType = function(typeNeedle) {
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

    that.loadWord = function() {
        WordLoader.GetWord(name, function(wordJson) {
            that.word = wordJson;
            buildTypes();
            buildStars();
            $('.ttip').tooltip(); // TODO async
            that.isLoad = true;
        });
    };

    that.loadWord();


});
