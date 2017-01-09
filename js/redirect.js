/* global getCookie */

var cookieLanguage = getCookie("lang");
var pageLanguage = window.location.href.indexOf("jisho.com/ja") !== -1 ? "en" : "";
var pageLanguage = window.location.href.indexOf("jisho.com/en") !== -1 ? "ja" : "";
var redirectDestination = cookieLanguage === "" ? pageLanguage : cookieLanguage;

if (redirectDestination !== "") {
    window.location.replace("http://www.pokejisho.com/"+redirectDestination+"/jisho");
}