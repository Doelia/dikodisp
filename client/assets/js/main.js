var w;


var typeFulls = {
    r_associated: "idées associés",
    r_raff_sem: "Rafinement sémantique",
    r_domain:"Domaines correspondant",
    r_syn:"Synonymes",
    r_anto:"Antonymes",
    r_has_part:"Est constitué de",
    r_locution:"Locutions",
    r_agent:"Sujets correspondant",
    r_lieu:"Lieux",
    r_carac:"Caractéristiques",
    r_lemma: "Lemmes",
    r_antimagn: "Anti magnification",
    r_carac_1: "A ce mot pour caractéristique",
    r_instr_1: "Instruments inverses",
    r_domain_1: "Domaines correspondant inverses",
    // r_chunk_pred: "Chunk",
    r_action_lieu: "Lieux où on peut faire l'action",
    r_error: "liens d'erreur",
    r_meaning: "Sens",
    r_telic_role: "Roles téliques",
    r_verbe_action: "Actions correspondant au verbe",
    r_conseq: "Conséquences",
    r_adj_verbe: "Adjectifs de potentialité",
    r_time: "Valeurs temporelles",
    r_mater_object: "Composés de cette matières",
    r_make: "Peut produire",
    r_against: "s'oppose à",
    r_implication: "Qu'est ce que le terme implique logiquement",
    r_masc: "Masculin",
    r_equiv: "Équivalent à",
    r_agentive_implication: "Impliquer dans la construction de l'objet",
    r_verb_real: "Celui qui réalise l'action",
    r_similar: "Ressemble à",
    r_item_set: "Quel est l'ensemble qui est composé de cet element ?",
    r_variante: "Variantes",
    r_bigger_than: "Plus gros que",
    r_accomp: "Est accompagné de",
    r_der_morpho: "Dérivé morphologique",
    r_has_personnage: "Personnage de l'oeuvre",
    r_has_actors: "Acteurs participant",
    r_cible: "Cible de la maladie",
    r_predecesseur_time: "Peut précéder temporellement",
    r_predecesseur_space: "Peut précéder spatialement",
    r_social_tie: "Relations sociales entre individus",
    r_sentiment_1: "Termes associés à ce sentiment",
    r_foncteur: "Fonction de ce terme",
    r_but: "But de l'action",
    r_own: "Que possède le terme suivant ?",
    r_compl_agent: "Complément agent",
    r_descend_de: "Descend de",
    r_prop: "Propriétés",
    r_wiki: "Associations issues de wikipédia",
    r_isa: "Hypenonymes",
    r_hypo: "Hyponymes",
    r_holo: "Holonymes",
    r_patient: "Patients",
    r_instr: "Instruments",
    r_data: "Informations diversers",
    r_magn: "Magnétude",
    r_family: "Même famille lexicale",
    r_agent_1: "Agents",
    r_patient_1: "Que peut_on faire avec ?",
    r_lieu_1: "Que peut_on y trouver ?",
    r_lieu_action: "Que peut-on y faire ?",
    r_sentiment: "Sentiments associés",
    r_manner: "De quelle manière l'utiliser ?",
    r_infopot: "Information sémantique potentielle",
    r_agentif_role: "De quel manière le crééer ?",
    r_action_verbe: "Actions vers le verbe",
    r_causatif: "Causes",
    r_verbe_adj:"Adjectifs de potentialité/possibilité",
    r_object_mater: "Matières composants",
    r_successeur_time: "Suivit dans le temps par",
    r_product_of: "Produit/résultant de quoi/qui",
    r_against_1: "S'oppose à",
    r_quantificateur: "Quantifie",
    r_fem: "Équivalent féminen",
    r_manner_1: "Actions possibles",
    r_instance: "Instance de",
    r_set_item: "Compose",
    r_processus_agent: "Acteurs",
    r_syn_strict: "Sustituable par",
    r_smaller_than: "Plus petit que",
    r_has_auteur: "Auteurs",
    r_can_eat: "Se nourrit de",
    r_deplac_mode: "Modes de déplacement",
    r_color: "Couleurs associées",
    r_symptomes: "Symptomes",
    r_diagnostique: "Diagnostiques",
    r_successeur_space: "Suivit de",
    r_linked_with: "Relié physiquement par",
    r_own_1: "Possédé par",
    r_beneficiaire: "Bénéficiares",
    r_domain_subst: "Domaines de substitutions",
    r_activvoice: "Voix actives",
    r_aki: "Équivalents",
    r_inhib: "Inhibations"
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
