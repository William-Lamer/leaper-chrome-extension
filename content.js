
let hintElements = [];

chrome.runtime.onMessage.addListener((request) => {
    if (request.action == "activate_search_mode") {
    }
});




document.addEventListener('keydown', (e) => {
    if (e.key == "Alt") {
        e.preventDefault();
        e.stopPropagation();
        showHints();
    }
    if (!e.altKey) return;
    if (!e.code.startsWith("Digit")) return;

    e.preventDefault();
    e.stopPropagation();

    const num = parseInt(e.code.replace("Digit", ""));
    if (isNaN(num) || num < 1 || num > 9) return;


    const results = getSearchResults();
    const target = results[num - 1];

    if (target && !e.shiftKey) {
        window.open(target.href, '_self');
    }

    if (e.shiftKey) {
        for (let i = 0; i < Math.min(num, results.length); i++) {
            chrome.runtime.sendMessage({
                openBackgroundTab: results[i].href
            });
        }
    }

    hideHints();
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Alt") {
        e.preventDefault();
        e.stopPropagation();
        hideHints();
    }
});

function getSearchResults() {
    const rso = document.querySelector('#rso');
    if (!rso) return [];

    return [...rso.querySelectorAll('a[jsname="UWckNb"]')]
        .filter(a => {
            if (!a.href.startsWith('http')) return false;
            if (a.closest('[jsname="yEVEwb"]')) return false; //People Also Ask section
            return true;
        });

}

window.addEventListener("scroll", () => {
    if (hintElements.length > 0) {
        showHints();
    }
})

function showHints() {
    hideHints();

    const results = getSearchResults();

    results.forEach((link, index) => {
        if (index >= 9) return;
        const rect = link.getBoundingClientRect();

        const hint = document.createElement("div");
        hint.textContent = index + 1;

        hint.style.position = "fixed";
        hint.style.left = `${rect.left - 28}px`;
        hint.style.top = `${rect.top + 4}px`;
        hint.style.zIndex = "999";
        hint.style.background = "#ffeb3b";
        hint.style.color = "black";
        hint.style.fontWeight = "bold";
        hint.style.fontSize = "14px";
        hint.style.padding = "2px 6px";
        hint.style.border = "1px solid black";
        hint.style.borderRadius = "4px";
        hint.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
        hint.style.pointerEvents = "none";

        document.body.appendChild(hint);
        hintElements.push(hint);

    })
}

function hideHints() {
    hintElements.forEach(hint => hint.remove());
    hintElements = [];
}
