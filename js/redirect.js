/* global getCookie */

var cookieLanguage = getCookie("language");

var pageLanguage = window.location.href.indexOf("jisho.com/ja") !== -1 ? "ja" : "en";
var pageLanguage = window.location.href.indexOf("jisho.com/en") === -1 &&
    window.location.href.indexOf("jisho.com/ja") === -1 ? "" : pageLanguage;
var redirectDestination = pageLanguage === "" ? cookieLanguage : pageLanguage;

if (redirectDestination !== "") {
    window.location.replace("https://old.pokejisho.com/" + redirectDestination + "/jisho");
}
