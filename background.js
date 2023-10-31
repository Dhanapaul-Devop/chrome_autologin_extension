const loggedInTabs = {};

chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.storage.sync.get(["loginModeCheckboxState", "loginModeSelectValue"], function (data) {
        var loginModeCheckboxState = data.loginModeCheckboxState;
        var loginModeSelectValue = data.loginModeSelectValue;

        if (loginModeCheckboxState && loginModeSelectValue == 2) {
            handleActions("https://nova-neo.com", details);
        } else if (loginModeCheckboxState && loginModeSelectValue == 1) {
            handleActions("https://localhost:8080", details);
        } else {
            handleActions("https://jm-neo.com", details);
        }
    });
});

function handleActions(baseURL, details) {
    if (
        details.url.includes(`${baseURL}/StudentSupport/Logout.do`) ||
        details.url.includes(`${baseURL}/StudentSupport/Login.do`) ||
        (details.url.includes(`${baseURL}/StudentSupport/`) && !loggedInTabs[details.tabId])
    ) {
        chrome.storage.sync.get(["loginId", "loginPw", "checkboxState"], function (data) {
            if (data.checkboxState) {
                chrome.tabs.sendMessage(details.tabId, { action: "login", userData: data });
            }
        });
    } else if (details.url.includes(`${baseURL}/StudentSupport/Menu.do`)) {
        chrome.tabs.sendMessage(details.tabId, { action: "menuScreenAndClick" });
    } else if (details.url.includes(`${baseURL}/StudentSupport/StudentMenu.do`)) {
        chrome.tabs.sendMessage(details.tabId, { action: "retrieveAndClick" });
    } else if (details.url.includes(`${baseURL}/StudentSupport/LessonMenu.do`)) {
        chrome.tabs.sendMessage(details.tabId, { action: "retrieveAndClickMenu" });
    } else if (details.url.includes(`${baseURL}/StudentSupport/StudentSearch.do`)) {
        chrome.tabs.sendMessage(details.tabId, { action: "fillAndSubmit" });
    } else if (details.url.includes(`${baseURL}/StudentSupport/StudentData.do`)) {
        chrome.tabs.sendMessage(details.tabId, { action: "studentDataClick" });
    } else if (details.url.includes(`${baseURL}/StudentSupport/OperationSchool.do`)) {
        chrome.tabs.sendMessage(details.tabId, { action: "searchSchool" });
    }
}

// Stop once login success
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "loginSuccess") {
        loggedInTabs[sender.tab.id] = true;
    }
});
