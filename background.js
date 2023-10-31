const loggedInTabs = {};
chrome.webNavigation.onCompleted.addListener(function(details) {
    
    if (details.url.includes("https://nova-neo.com/StudentSupport/Logout.do") || details.url.includes("https://nova-neo.com/StudentSupport/") && !loggedInTabs[details.tabId])
     {
        chrome.storage.sync.get(["loginId", "loginPw", "checkboxState"], function(data) {
            if (data.checkboxState) {
            chrome.tabs.sendMessage(details.tabId, { action: "login", userData: data });
            }
        });
    }//menu screen
    else if (details.url.includes("https://nova-neo.com/StudentSupport/Menu.do")) {
        chrome.tabs.sendMessage(details.tabId, { action: "menuScreenAndClick" });
    }//student menu
    else if (details.url.includes("https://nova-neo.com/StudentSupport/StudentMenu.do")) {
        chrome.tabs.sendMessage(details.tabId, { action: "retrieveAndClick" });
    }//lesson screen
    else if (details.url.includes("https://nova-neo.com/StudentSupport/LessonMenu.do")) {
        chrome.tabs.sendMessage(details.tabId, { action: "retrieveAndClickMenu" });
    }//student search
    else if (details.url.includes("https://nova-neo.com/StudentSupport/StudentSearch.do")) {
        chrome.tabs.sendMessage(details.tabId, { action: "fillAndSubmit" });
    }//student data popup
    else if (details.url.includes("https://nova-neo.com/StudentSupport/StudentData.do")) {
        chrome.tabs.sendMessage(details.tabId, { action: "studentDataClick" });
    }//school search
    else if (details.url.includes("https://nova-neo.com/StudentSupport/OperationSchool.do")) {
        chrome.tabs.sendMessage(details.tabId, { action: "searchSchool" });
    }
});



//Stop once login success
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "loginSuccess") {
        loggedInTabs[sender.tab.id] = true;
    }
});
