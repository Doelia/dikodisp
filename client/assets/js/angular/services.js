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
                        console.log("Service WordLoader:: Mot introuvable");
                        callback(null);
                    }
                }, function() {
                    console.log("Service WordLoader:: Erreur HTTP");
                    callback(null);
                });
        };

        deferred.resolve();

    };

    var o = new that();
    o.promise = deferred.promise;
    return o;

});
