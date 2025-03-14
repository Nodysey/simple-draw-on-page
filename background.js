var on = false
chrome.action.onClicked.addListener((tab) => {
    on = !on;
    if (on) {
        chrome.action.setIcon({ path: "icons/active_128.png" });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["script.js"],
        });
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ["styles.css"],
        });
    } else {
        chrome.action.setIcon({ path: "icons/inactive_128.png" });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { off: true });
        });
    }
});