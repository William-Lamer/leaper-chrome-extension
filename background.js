chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: command });
    });

});


chrome.runtime.onMessage.addListener((message) => {
    if (message.openBackgroundTab) {
        chrome.tabs.create({
            url: message.openBackgroundTab,
            active: false
        });
    }
});
