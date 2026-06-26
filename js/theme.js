/*
 * Dark/light theme toggle.
 *
 * Three states cycled in order: System -> Light -> Dark -> System.
 *   - "system" follows the OS (no data-theme attribute; CSS media query decides)
 *   - "light" / "dark" force that appearance and are remembered in localStorage
 *
 * The stored choice is also applied by a tiny inline snippet in each page's
 * <head> so there is no flash before this script runs. This file owns the
 * visible button and the cycle behavior.
 */
(function () {
    "use strict";

    var KEY = "pokejisho-theme";
    var MODES = ["system", "light", "dark"];
    var LABELS = { system: "System", light: "Light", dark: "Dark" };

    // Inline SVGs use currentColor so they inherit the button's text color.
    var ICONS = {
        // Half-filled circle (contrast) for "follow system".
        system:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none"></path></svg>',
        // Sun.
        light:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>',
        // Moon.
        dark:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
    };

    function getMode() {
        try {
            var v = localStorage.getItem(KEY);
            return v === "light" || v === "dark" ? v : "system";
        } catch (e) {
            return "system";
        }
    }

    function apply(mode) {
        if (mode === "system") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", mode);
        }
    }

    function store(mode) {
        try {
            if (mode === "system") {
                localStorage.removeItem(KEY);
            } else {
                localStorage.setItem(KEY, mode);
            }
        } catch (e) {
            /* storage unavailable (private mode) — toggle still works for the session */
        }
    }

    function build() {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "theme-toggle";
        document.body.appendChild(btn);

        var mode = getMode();

        function render() {
            btn.innerHTML = ICONS[mode];
            var label = "Theme: " + LABELS[mode] + " (click to change)";
            btn.setAttribute("aria-label", label);
            btn.title = label;
        }

        apply(mode); // already applied pre-paint; keeps state and DOM in sync
        render();

        btn.addEventListener("click", function () {
            mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
            apply(mode);
            store(mode);
            render();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", build);
    } else {
        build();
    }
})();
