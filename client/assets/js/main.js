

function getFullNameOfType(typeRel) {
    return typeFulls[typeRel];
}

function unique(array) {
    return $.grep(array, function(el, index) {
        return index == $.inArray(el, array);
    });
}

$(function () {
    $('.ttip').tooltip();
});
