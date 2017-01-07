/* global jisho */
/* global $ */

var currentLanguage = "en";
var currentLocation = window.location.href;


$("document").ready(function() {
    var placeholderID = Math.floor(Math.random() * jisho.length);
    var phD = jisho[placeholderID];
    var placeholderName = phD.english
    if (phD.english !== phD.roumaji) {
        placeholderName += ", " + phD.roumaji
    }
    placeholderName += ", " + phD.japanese;
    if (phD.katakana !== phD.japanese) {
        placeholderName += ", " + phD.katakana
    }
    placeholderName += "...";
    $("#term").attr("placeholder", placeholderName);
    
    
    if (currentLocation.indexOf("/ja/") !== -1) {
        currentLanguage = "ja";
    }
    
    $(".help-button").click(function(){
        $("#content").fadeIn(500);
        $(".help-button").fadeOut(500);
    });
    
    $("#term").keyup(function() {
        $("#content").fadeOut(500);
        $(".help-button").fadeIn(500);
        $("#priority").html("");
        $("#results").html("");
        if (this.value.length > 2) {
            $("#content").hide();
            $(".help-button").show();
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
    if (array.length === 0 &&
        $("#alert").text() === "") {
        $("#alert").hide(); 
        if (currentLanguage === "en") {
            $("#alert").html("<a href='https://goo.gl/forms/437m5RF1bPmflbJp1' target='_blank' class='alert'>Can't find what you're looking for? Tell us what's missing!");
        } else {
            $("#alert").html("<a href='https://goo.gl/forms/437m5RF1bPmflbJp1' target='_blank' class='alert'>見つけませんでしたか？　見つけられなかったものを教えてください！");
        }
        $("#alert").fadeIn(500);
    }
    if (array.length > 0) {
        $("#alert").html("");
    }
    for (i = 0; i < array.length; i++) {
        var result = array[i];
        result.us = result.english.replace(/ /g, "_"); // Underscored Result Name for URL
        result.urlJA = "http://wiki.xn--rckteqa2e.com/wiki/" + result.japanese;
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
        $resultRow = $('<div class="result"></div>')
        $resultRow.html('<a href="' + result.url + '" target="_blank"><div class="english-result">' + result.english + '</div></a><a href="' + result.urlJA + '" target="_blank"><div class="japanese-result">' + result.japanese + '</div></a>')
        if (result.priority === 1) {
            $("#priority").append($resultRow);
        } else {
            $("#results").append($resultRow);
        }
    }
}

var activeData = [];