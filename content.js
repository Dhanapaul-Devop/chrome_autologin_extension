chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //ログイン画面
    if (request.action === "login") {
        // Check if the login form has not been submitted yet
        if (!$('form[name="loginForm"]').data('submitted')) {
            // Retrieve user data from the request object
            var userData = request.userData || {};
            var loginId = userData.loginId || '';
            var loginPw = userData.loginPw || '';
            var checkboxState = userData.checkboxState || false;

            $('input[name="loginId"]').val(loginId);
            $('input[name="loginPw"]').val(loginPw);
            $('input[name="checkboxName"]').prop('checked', checkboxState);
            // Mark the form as submitted to prevent multiple submissions
            $('form[name="loginForm"]').data('submitted', true);
            $('form[name="loginForm"]').submit();
            chrome.runtime.sendMessage({ action: "loginSuccess" });
        }
    } 
    //コメニュー画面
    else  if (request.action === "menuScreenAndClick") {
        chrome.storage.sync.get(["menuScreenCheckboxState", "firstSelectValue"], function (data) {
            var menuScreenCheckboxState = data.menuScreenCheckboxState;
            var firstSelectValue = data.firstSelectValue;
            console.log(firstSelectValue);
            if (menuScreenCheckboxState) {
            var listItem = document.querySelectorAll(".menu_list a")[firstSelectValue - 1];
            if (listItem) {
                listItem.click();
            }
        } 
        });
    }
    //生徒メニュー画面
    else  if (request.action === "retrieveAndClick") {
        chrome.storage.sync.get(["seitoMenuCheckboxState", "secondSelectValue"], function (data) {
            var seitoMenuCheckboxState = data.seitoMenuCheckboxState;
            var secondSelectValue = data.secondSelectValue;
            console.log(secondSelectValue);
            if (seitoMenuCheckboxState) {
            var listItem = document.querySelectorAll(".menu_list a")[secondSelectValue - 1];
            if (listItem) {
                listItem.click();
            }
        } 
        });
    }
    //口授業メニュー画面
    else  if (request.action === "retrieveAndClickMenu") {
        chrome.storage.sync.get(["lessonMenuCheckBoxState", "lessonMenuSelectValue"], function (data) {
            var lessonMenuCheckBoxState = data.lessonMenuCheckBoxState;
            var lessonMenuSelectValue = data.lessonMenuSelectValue;
            console.log(lessonMenuSelectValue);
            if (lessonMenuCheckBoxState) {
            var listItem = document.querySelectorAll(".menu_list a")[lessonMenuSelectValue - 1];
            if (listItem) {
                listItem.click();
            }
        } 
        });
    }
//生徒検索画面
    else if (request.action === "fillAndSubmit") {
        chrome.storage.sync.get(["StudentcheckboxState", "studentidValue"], function (data) {
            var StudentcheckboxState = data.StudentcheckboxState;
            var studentidValue = data.studentidValue;
            
            if (StudentcheckboxState) {
                var inputElement = document.querySelector('#inputStudentCode');
                var searchButton = document.querySelector('#btnSearchStudent');
                if (inputElement && searchButton) {
                    inputElement.value = studentidValue; 
                    searchButton.click();
    
                    setTimeout(function() {
                        var detailButton = document.querySelector('input[value="詳細"]');
                        if (detailButton) {
                            detailButton.click();
                        } else {
                            console.error("詳細 button not found.");
                        }
                    }, 1000); 
                } else {
                    // Log an error if the input element or search button is not found
                    console.error("Input element or search button not found.");
                }
            }
        });
    }
    //生徒詳細画面
    else if (request.action === "studentDataClick") {
        chrome.storage.sync.get(["studentDataCheckBoxState", "studentDataSelectValue"], function (data) {
            var studentDataCheckBoxState = data.studentDataCheckBoxState;
            var studentDataSelectValue = data.studentDataSelectValue;
            if (studentDataCheckBoxState) {
                var buttonValues = {
                    1: "ネームプレート印刷(NOVA)",
                    2: "皆勤賞印刷(NOVA)",
                    3: "パスワード再発行",
                    4: "対応状況",
                    5: "カルテ",
                    6: "請求",
                    7: "入金",
                    8: "予約",
                    9: "うさぎC",
                    10: "退会・解約・返金",
                    11: "レベコン結果入力",
                    12: "NBK_GBSレベコン結果",
                    13: "一覧へ戻る"
                };
                var buttonValue = buttonValues[studentDataSelectValue];
                var detailButton1 = document.querySelector('input[value="' + buttonValue + '"]');
                
                if (detailButton1) {
                    detailButton1.click();
                } else {
                    console.error(buttonValue + " button not found.");
                }
            }
        });
    }
    //校舎一覧画面
    else if (request.action === "searchSchool") {
        chrome.storage.sync.get(["operationSchoolCheckboxState", "schoolIdValue"], function (data) {
            var operationSchoolCheckboxState = data.operationSchoolCheckboxState;
            var schoolIdValue = data.schoolIdValue;
            
            if (operationSchoolCheckboxState) {
                setTimeout(function() {        
                var inputElement1 = document.querySelector('#searchWord');
                var schoolsearchButton = document.querySelector('#searchButton');
                if (inputElement1 && schoolsearchButton) {
                    inputElement1.value = schoolIdValue; 
                    // Click the search button
                    schoolsearchButton.click();
                } 
            }, 1000);
            }
            
        });
    }


});


