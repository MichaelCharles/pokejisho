/* global $ */
/* global jisho */
/* global newJisho */
/* global moveData */

var i = 0;
var j = 0;
var compiledData = [];

$("document").ready(function() {
    checkMissingMoveData();
});

function checkMissingItemData() {
    for (i=0;i<newJisho.length; i++) {
        if (newJisho[i].type == "item") {
            if (newJisho[i].enDescription == "" || typeof(newJisho[i].enDescription) == "undefined") {
                compiledData.push(newJisho[i]);
            }
        }
    }
    
    var renderContent = JSON.stringify(compiledData);
    $("#render-area").html(renderContent);
}

function renderNewItems() {
    for (i = 0; i < jisho.length; i++) {
        var jishoParsedEnglish = jisho[i].english.toLowerCase().replace("é", "e").replace(/\W/g, '');
        for (j = 0; j < moveData.length; j++) {
            var moveParsedEnglish = moveData[j].english.toLowerCase().replace("é", "e").replace(/\W/g, '');
            if (jisho[i].type == "item") {
                if (moveParsedEnglish == jishoParsedEnglish) {
                    jisho[i].enDescription = moveData[j].enDescription.toString();
                }
            }
        }
    }

    var renderContent = JSON.stringify(jisho);
    $("#render-area").html(renderContent);
}

function checkMissingMoveData() {
    for (i=0;i<newJisho.length; i++) {
        if (newJisho[i].type == "move") {
            if (newJisho[i].enDescription == "" || typeof(newJisho[i].enDescription) == "undefined") {
                compiledData.push(newJisho[i]);
            }
        }
    }
    
    var renderContent = JSON.stringify(compiledData);
    $("#render-area").html(renderContent);
}

function renderNewMoves() {
    for (i = 0; i < jisho.length; i++) {
        var jishoParsedEnglish = jisho[i].english.toLowerCase().replace("é", "e").replace(/\W/g, '');
        for (j = 0; j < moveData.length; j++) {
            var moveParsedEnglish = moveData[j].english.toLowerCase().replace("é", "e").replace(/\W/g, '');
            if (jisho[i].type == "move") {
                if (moveParsedEnglish == jishoParsedEnglish) {
                    jisho[i].mType = moveData[j].mType.toString();
                    jisho[i].category = moveData[j].category.toString();
                    jisho[i].power = moveData[j].power.toString();
                    jisho[i].accuracy = moveData[j].accuracy.toString();
                    jisho[i].pp = moveData[j].pp.toString();
                    jisho[i].enDescription = moveData[j].enDescription.toString();
                }
            }
        }
    }

    var renderContent = JSON.stringify(jisho);
    $("#render-area").html(renderContent);
}