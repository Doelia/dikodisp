var w;


function loadWord(name) {
    $.getJSON( "/getWord?word="+name, function(data) {
        w = data;
        displayWord();
    });
}

function displayWord() {
    var nameWord = w.Name;
    var def = w.Def;
    var rel = w.ListRel;
    console.log("Nom du mot : "+nameWord);
    console.log("Définition : "+def);
}

function getRelsFromType(typeNedle) {
    var rel = w.ListRel;
    var list = [];
    for (var i in rel) {
        var r = rel[i];
        if (r.Type == typeNedle) {
            list.push(r);
        }
    }
    return list;
}

$(document).ready(function() {
    loadWord('chat');
});
