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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function toKatakana(string) {
    string = string.replaceAll("あ", "ア");
    string = string.replaceAll("い", "イ");
    string = string.replaceAll("う", "ウ");
    string = string.replaceAll("え", "エ");
    string = string.replaceAll("お", "オ");
    string = string.replaceAll("か", "カ");
    string = string.replaceAll("き", "キ");
    string = string.replaceAll("く", "ク");
    string = string.replaceAll("け", "ケ");
    string = string.replaceAll("こ", "コ");
    string = string.replaceAll("さ", "サ");
    string = string.replaceAll("し", "シ");
    string = string.replaceAll("す", "ス");
    string = string.replaceAll("せ", "セ");
    string = string.replaceAll("そ", "ソ");
    string = string.replaceAll("た", "タ");
    string = string.replaceAll("ち", "チ");
    string = string.replaceAll("つ", "ツ");
    string = string.replaceAll("て", "テ");
    string = string.replaceAll("と", "ト");
    string = string.replaceAll("な", "ナ");
    string = string.replaceAll("に", "ニ");
    string = string.replaceAll("ぬ", "ヌ");
    string = string.replaceAll("ね", "ネ");
    string = string.replaceAll("の", "ノ");
    string = string.replaceAll("は", "ハ");
    string = string.replaceAll("ひ", "ヒ");
    string = string.replaceAll("ふ", "フ");
    string = string.replaceAll("へ", "ヘ");
    string = string.replaceAll("ほ", "ホ");
    string = string.replaceAll("ま", "マ");
    string = string.replaceAll("み", "ミ");
    string = string.replaceAll("む", "ム");
    string = string.replaceAll("め", "メ");
    string = string.replaceAll("も", "モ");
    string = string.replaceAll("や", "ヤ");
    string = string.replaceAll("ゆ", "ユ");
    string = string.replaceAll("よ", "ヨ");
    string = string.replaceAll("ら", "ラ");
    string = string.replaceAll("り", "リ");
    string = string.replaceAll("る", "ル");
    string = string.replaceAll("れ", "レ");
    string = string.replaceAll("ろ", "ロ");
    string = string.replaceAll("わ", "ワ");
    string = string.replaceAll("を", "ヲ");
    string = string.replaceAll("ん", "ン");
    string = string.replaceAll("が", "ガ");
    string = string.replaceAll("ぎ", "ギ");
    string = string.replaceAll("ぐ", "グ");
    string = string.replaceAll("げ", "ゲ");
    string = string.replaceAll("ご", "ゴ");
    string = string.replaceAll("ざ", "ザ");
    string = string.replaceAll("じ", "ジ");
    string = string.replaceAll("ず", "ズ");
    string = string.replaceAll("ぜ", "ゼ");
    string = string.replaceAll("ぞ", "ゾ");
    string = string.replaceAll("だ", "ダ");
    string = string.replaceAll("ぢ", "ヂ");
    string = string.replaceAll("づ", "ヅ");
    string = string.replaceAll("で", "デ");
    string = string.replaceAll("ど", "ド");
    string = string.replaceAll("ば", "バ");
    string = string.replaceAll("び", "ビ");
    string = string.replaceAll("ぶ", "ブ");
    string = string.replaceAll("べ", "ベ");
    string = string.replaceAll("ぼ", "ボ");
    string = string.replaceAll("ぱ", "パ");
    string = string.replaceAll("ぴ", "ピ");
    string = string.replaceAll("ぷ", "プ");
    string = string.replaceAll("ぺ", "ペ");
    string = string.replaceAll("ぽ", "ポ");
    string = string.replaceAll("ゃ", "ャ");
    string = string.replaceAll("ゅ", "ュ");
    string = string.replaceAll("ょ", "ョ");
    string = string.replaceAll("っ", "ッ");
    return string;
}

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