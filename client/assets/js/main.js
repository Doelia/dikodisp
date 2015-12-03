var w;

var typeFulls = {
    r_associated:"Idées associées",
    r_color:"Couleurs",
    r_chunk_sujet:"",
    r_chunk_objet:"",
    r_instance:"Instances",
    r_has_part:"",
    r_isa:"",
    r_agent_1:"",
    r_flpot:"",
    r_infopot:"",
    r_locution:"",
    r_hypo:"",
    r_pos:"",
    r_carac:"",
    r_raff_sem:"",
    r_lieu_1:"",
    r_chunk_head:"",
    r_domain:"",
    r_sentiment:"",
    r_can_eat:"",
    r_fem:"",
    r_meaning:"",
    r_lieu:"",
    r_causatif:"",
    r_syn:"",
    r_telic_role:"",
    r_smaller_than:"",
    r_conseq:"",
    r_lieu_action:"",
    r_coocurrence:"",
    r_magn:"",
    r_lemma:"",
    r_bigger_than:"Plus grand que",
    r_aki:"",
    r_holo:"",
    r_patient_1:"",
    r_raff_morpho:"",
    r_variante:"",
    r_domain_1:"",
    r_wiki:"Wikipedia",
    r_inhib:"",
    r_agent:"",
    r_family:"",
    r_carac_1:"",
    r_patient:"",
    r_antimagn:"",
    r_compl_agent:"",
    r_anto:"",
    r_instr:"",
    r_action_lieu:"",
    r_sentiment_1:"",
    r_against_1:"",
    r_cible:""
};

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
        if (fullName && fullName != '') {
            $('#list-types').append($('<div>'+fullName+'</div>'));
            var el = $('#list-types div:last');
            el.click((function(t) {
                return function() {
                    var tabRels = getRelsFromType(t);
                    for (var j in tabRels) {
                        var r = tabRels[j];
                        $(this).append(r.Content+' - ')
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
