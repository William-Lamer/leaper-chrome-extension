document.addEventListener("keydown", function(event) {
    if (event.altKey && event.key === "1") {
        const firstResult = document.querySelector(".zReHs");

        if (firstResult) {
            firstResult.click();
        }
    }
});
