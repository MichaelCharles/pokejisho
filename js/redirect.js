/* global getCookie */

var cookieLanguage = getCookie("pang");

var pageLanguage = window.location.href.indexOf("jisho.com/ja") !== -1 ? "ja" : "en";
var pageLanguage = window.location.href.indexOf("jisho.com/en") === -1 &&
    window.location.href.indexOf("jisho.com/ja") === -1 ? pageLanguage : "";
var redirectDestination = cookieLanguage === "" ? pageLanguage : cookieLanguage;

if (redirectDestination !== "") {
    window.location.replace("http://www.pokejisho.com/" + redirectDestination + "/jisho");
}
