chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openFirst"){
        const firstResult = document.querySelector(".zReHs");
        if (firstResult){
            firstResult.click();
        }
    }
});
