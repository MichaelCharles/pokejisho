/* global jisho */
/* global $ */

var currentLanguage = "en";
var currentLocation = window.location.href;


$("document").ready(function() {
    //REWRITE THIS FOR MULTIPLE LANGUAGES
    /*    var placeholderID = Math.floor(Math.random() * jisho.length);
        var phD = jisho[placeholderID];
        var placeholderName = phD.english
        if (phD.english !== phD.roumaji) {
            placeholderName += ", " + phD.roumaji
        }
        placeholderName += ", " + phD.japanese;
        placeholderName += "...";
        $("#term").attr("placeholder", placeholderName); */


    $(".help-button").click(function() {
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

function searchFor(term) {
    var cTerm = term.toLowerCase().split(" ").join("").replace("é", "e");
    for (i = 0; i < jisho.length; i++) {
        $.each(jisho[i], function(key, value) {
            var cValue = value.toString().toLowerCase().split(" ").join("").replace("é", "e");
            if (key !== "type") {
                if (cValue.includes(cTerm)) {
                    var result = jisho[i];
                    if (cValue === cTerm) {
                        result.priority = 1;
                    }
                    activeData.push(result);
                }
            }
        });
    }

    var uniqueResults = [];
    $.each(activeData, function(i, el) {
        if ($.inArray(el, uniqueResults) === -1) uniqueResults.push(el);
    });

    renderResult(uniqueResults);
    activeData = [];
}

function renderResult(array) {
    //        REWORK WHEN GLOBAL FORM IS CREATED
    //    if (array.length === 0 &&
    //        $("#alert").text() === "") {
    //        $("#alert").hide();
    //        $("#alert").html("<a href='https://goo.gl/forms/437m5RF1bPmflbJp1' target='_blank' class='alert'>Can't find what you're looking for? Tell us what's missing!");
    //        $("#alert").fadeIn(500);
    //    }
    //    if (array.length > 0) {
    //        $("#alert").html("");
    //    }
    
    var lang1 = $("#lang1").val();
    var lang2 = $("#lang2").val();

    for (i = 0; i < array.length; i++) {
        var result = array[i];
        result.us = result.english.replace(/ /g, "_"); // Underscored Result Name for URL
        if (result.type === "move") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us + "_(move)";
        }
        else if (result.type === "Pokémon") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us + "_(Pok%C3%A9mon)";
        }
        else if (result.type === "item") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us;
        }
        else if (result.type === "Ability") {
            result.url = "http://bulbapedia.bulbagarden.net/wiki/" + result.us + "_(Ability)";
        }
        else {
            result.url = result.type;
        }
        $resultRow = $("<a href='" + result.url + "' target='_blank'></a>")
        $resultRow.html('<div class="result"><div class="english-result">' + result[lang1] + '</div><div class="japanese-result">' + result[lang2] + '</div></div>')
        if (result.priority === 1) {
            $("#priority").append($resultRow);
        }
        else {
            $("#results").append($resultRow);
        }
    }
}

var activeData = [];
