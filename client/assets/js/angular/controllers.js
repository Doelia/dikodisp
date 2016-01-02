app.controller('PageController', function($scope, $location, $window, $routeParams, $rootScope) {
    console.log('Init PageController');

    $rootScope.currentPage = "/";

    $rootScope.goPage = function(page) {
        console.log("go page "+page);
        $rootScope.currentPage = page;
        $location.path(page);
        $window.scrollTo(0,0);
    };

    $rootScope.loadWord = function(word) {
        $rootScope.goPage('word/'+word);
    };

    $scope.$on('$routeChangeSuccess', function(next, current) {
        console.log('routeChangeSuccess');
        initJquery();
     });

});

app.controller('SearchController', function($scope, $routeParams, $rootScope) {
    var that = this;

    that.word = "Chargement...";

    $scope.$on('$routeChangeSuccess', function() {
        that.word = $routeParams.word;
    });

});

app.controller('WordController', function($http, $scope, WordLoader, $routeParams) {
    var that = this;

    that.word = {}; // Structure Mot, voir structure Go
    that.isLoad = false; // Contenu chargé ?
    that.notFound = false;
    that.listTypes = []; // Liste des types des relations, unique (label, name)
    that.activeCat = "";
    that.activeAllCats = false;
    that.limite = 10;

    $scope.predicate = '-Content';
    $scope.reverse = true;

    $scope.order = function() {
        $scope.reverse = ($scope.predicate == '-Content');
    };

    var name = $routeParams.word;

    // Contruit la liste unique des types depuis la liste des mot associés au mot chargé
    var buildTypes = function() {
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
            if (r.name !== undefined && r.name !== null && r.name !== "") {
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

    $scope.range = function(n) {
        return new Array(n);
    };

    that.fullsStarsNumber = function(score) {
        return Math.floor(score / 2);
    };

    that.halfStarsNumber = function(score) {
        return score % 2;
    };

    that.emptyStarsNumber = function(score) {
        return Math.floor((10 - score) / 2);
    };

    that.hashMapWords = {};

    // typeNeedle string label dlf r_associated
    // Retourne un tableau de Ref (voir structures)
    that.getWordsFromType = function(typeNeedle) {

        if (that.hashMapWords[typeNeedle] !== undefined) {
            return that.hashMapWords[typeNeedle];
        }

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

    that.nbWordsForType = function(typeNeedle) {
        return that.getWordsFromType(typeNeedle).length;
    };

    that.loadWord = function() {
        that.hashMapWords = {};
        that.isLoad = false;
        that.notFound = false;
        WordLoader.GetWord(name, function(wordJson) {
            if (wordJson !== null) {
                that.word = wordJson;
                buildTypes();
                buildStars();
                that.isLoad = true;
                that.notFound = false;
            } else {
                that.isLoad = true;
                that.notFound = true;
            }

        });
    };

    that.loadWord();


});
