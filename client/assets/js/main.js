var w;

function loadWord(name) {
    $.getJSON( "/getWord?word="+name, function(data) {
        w = data;
        displayWord();
        displayListType();
    });
}

function getListTypes() {
    var rel = w.ListRel;
    var list = [];
    for (var i in rel) {
        var r = rel[i];
        list.push(r.Type);
    }
    list = $.unique(list);
    return list;
}

function getFullNameOfType(typeRel) {
    return typeFulls[typeRel];
}

function displayWord() {
    var nameWord = w.Name;
    var def = w.Def;
    var rel = w.ListRel;
    console.log("Nom du mot : "+nameWord);
    console.log("Définition : "+def);

    $('#name').html(nameWord);
    $('#definition').html(def);
}

function displayListType() {
    var list = getListTypes();
    for (var i in list) {
        var t = list[i];
        var fullName = getFullNameOfType(t);
        if (fullName && fullName !== '') {
            $('#list-types').append($('<div>'+fullName+'</div>'));
            var el = $('#list-types div:last');
            el.click((function(t) {
                return function() {
                    var tabRels = getRelsFromType(t);
                    for (var j in tabRels) {
                        var r = tabRels[j];
                        $(this).append(r.Content+' - ');
                    }
                };
            })(t));
        }
    }
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
