$("document").ready(function() {

    $("#term").keyup(function() {
        $("#priority").html("");
        $("#results").html("");
        console.log(this.value.length)
        if (this.value.length > 2) {
            searchFor(this.value, true);
        }
    });

});

function searchFor(term, convertKana) {
    term = term.replace("é", "e");
    var katakanaTerm = toKatakana(term);
    if (convertKana) {
        for (i = 0; i < jisho.length; i++) {
            if (jisho[i].english.toLowerCase().includes(term.toLowerCase()) ||
                jisho[i].katakana.includes(katakanaTerm) ||
                jisho[i].roumaji.toLowerCase().includes(term.toLowerCase())) {
                var result = jisho[i];
                if (result.english.toLowerCase() === term.toLowerCase() ||
                    result.katakana === katakanaTerm ||
                    result.roumaji.toLowerCase() === term.toLowerCase()) {
                    result.priority = 1;
                }
                activeData.push(result);
            }
        }
    } else {

        for (i = 0; i < jisho.length; i++) {
            if (jisho[i].english.toLowerCase().includes(term.toLowerCase()) ||
                jisho[i].japanese.includes(term) ||
                jisho[i].roumaji.toLowerCase().includes(term.toLowerCase())) {
                var result = jisho[i];
                if (result.english.toLowerCase() === term.toLowerCase() ||
                    result.japanese === term ||
                    result.roumaji.toLowerCase() === term.toLowerCase()) {
                    result.priority = 1;
                }
                activeData.push(result);
            }
        }

    }
    renderResult(activeData);
    activeData = [];
}

function renderResult(array) {

    for (i = 0; i < array.length; i++) {
        var result = array[i];
        result.us = result.english.replace(/ /g, "_"); // Underscored Result Name for URL
        if (result.type === "move") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us + "_(move)";
        } else if (result.type === "Pokémon") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us + "_(Pok%C3%A9mon)";
        } else if (result.type === "item") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us;
        } else if (result.type === "Ability") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us + "_(Ability)";
        } else {
            result.url = result.type;
        }
        $resultRow = $("<a href='" + result.url + "' target='_blank'></a>")
        $resultRow.html('<div class="result"> <div class="english-result">' + result.english + '</div> <div class="japanese-result">' + result.japanese + '</div> </div>')
        if (result.priority === 1) {
            $("#priority").append($resultRow);
        } else {
            $("#results").append($resultRow);
        }
    }
}

var activeData = [];