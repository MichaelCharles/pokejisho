/*
 * One-time "app updated" banner.
 *
 * The banner markup ships hidden (inline display:none) and carries a
 * data-banner-id (the update date). This script reveals it unless the visitor
 * has already dismissed that exact id, and remembers dismissal in localStorage.
 *
 * To announce a future update: change the banner's text and bump its
 * data-banner-id in the HTML. The new id won't match the stored dismissal, so
 * the banner shows again for everyone.
 */
(function () {
    "use strict";

    var KEY = "pokejisho-banner-dismissed";
    var el = document.getElementById("update-banner");
    if (!el) {
        return;
    }

    var id = el.getAttribute("data-banner-id") || "";

    // Auto-expire safety net: never show past data-banner-expires (YYYY-MM-DD),
    // so a forgotten banner disappears on its own. Remove the markup to retire it.
    var expires = el.getAttribute("data-banner-expires");
    if (expires) {
        var expiry = new Date(expires + "T23:59:59"); // end of that day, local time
        if (!isNaN(expiry.getTime()) && new Date() > expiry) {
            return; // expired; leave it hidden
        }
    }

    var dismissed = null;
    try {
        dismissed = localStorage.getItem(KEY);
    } catch (e) {
        /* storage unavailable — fall through and show the banner this session */
    }

    if (dismissed === id) {
        return; // already dismissed this update; leave it hidden
    }

    el.style.display = ""; // revert to the stylesheet's display value

    var close = el.querySelector(".update-banner-close");
    if (close) {
        close.addEventListener("click", function () {
            el.style.display = "none";
            try {
                localStorage.setItem(KEY, id);
            } catch (e) {
                /* dismissal won't persist without storage, but the banner closes for now */
            }
        });
    }
})();
