
var app = angular.module('diko', []);

app.service('WordLoader', function($q, $http, $timeout) {

    var deferred = $q.defer();

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

        deferred.resolve();

    };

    var o = new that();
    o.promise = deferred.promise;
    return o;

});

app.controller('SearchController', function() {
    var that = this;

    that.word = "chien"; // TODO
});

app.controller('WordController', function($http, $scope, WordLoader) {
    var that = this;

    that.word = {}; // Structure Mot, voir structure Go
    that.isLoad = false;
    that.listTypes = []; // Liste des types des relations, unique (label, name)

    $scope.predicate = '-Content';
    $scope.reverse = true;

    $scope.order = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = (predicate == '-Content');
    }

    var name = "chat"; // TODO

    // Contruit la liste unique des types depuis la liste des mot associés au mot chargé
    var buildTypes = function() {
        console.log("buildTypes...");
        var rel = that.word.ListRel;
        var list = [];
        for (var i in rel) {
            list.push(rel[i].Type);
        }
        list = unique(list);

        that.listTypes = [];
        for (i in list) {
            var r = {
                label: list[i],
                name: getFullNameOfType(list[i])
            };
            if (r.name !== null && r.name !== "") {
                that.listTypes.push(r);
            }
        }
    };

    var buildStars = function() {
        console.log("buildStars...");
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

    $scope.range = function(n) {
        return new Array(n);
    };

    that.fullsStarsNumber = function(score) {
        return Math.floor(score / 2);
    }

    that.halfStarsNumber = function(score) {
        return score % 2;
    }

    that.emptyStarsNumber = function(score) {
        return Math.floor((10 - score) / 2);
    }

    that.hashMapWords = {};

    // typeNeedle string label dlf r_associated
    // Retourne un tableau de Ref (voir structures)
    that.getWordsFromType = function(typeNeedle) {
        if (that.hashMapWords[typeNeedle] !== undefined) {
            return that.hashMapWords[typeNeedle];
        }

        console.log("getWordsFromType");
        var rel = that.word.ListRel;
        var list = [];
        for (var i in rel) {
            var labelType = rel[i].Type;
            if (labelType == typeNeedle) {
                list.push(rel[i]);
            }
        }
        that.hashMapWords[typeNeedle] = list;
        return list;
    };

    that.loadWord = function() {
        console.log("wget du mot "+name)
        WordLoader.GetWord(name, function(wordJson) {
            console.log("Mot reçu.");
            that.word = wordJson;
            buildTypes();
            buildStars();
            $('.ttip').tooltip(); // TODO async
            that.isLoad = true;
        });
    };

    that.loadWord();


});
