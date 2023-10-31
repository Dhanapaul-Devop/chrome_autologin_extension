document.addEventListener("DOMContentLoaded", function () {
  //環境
  var loginModeCheckbox = document.getElementById("loginModeCheckbox");
  var loginModeSelect = document.getElementById("loginModeSelect");
  //ログイン画面
  var checkbox = document.getElementById("autoLoginCheckbox");
  var usernameInput = document.getElementById("popupUsername");
  var passwordInput = document.getElementById("popupPassword");
  //コメニュー画面
  var menuScreenCheckbox = document.getElementById("menuScreenCheckbox");
  //生徒メニュー画面
  var seitoMenuCheckbox = document.getElementById("seitoMenuCheckbox");
  var firstSelect = document.getElementById("firstSelect");
  var secondSelect = document.getElementById("secondSelect");
  //生徒検索画面
  var Studentcheckbox = document.getElementById("Studentcheckbox");
  var studentid = document.getElementById("studentid");
  //生徒詳細画面
  var studentDataCheckBox = document.getElementById("studentDataCheckBox");
  var studentDataSelect = document.getElementById("studentDataSelect");
  //校舎一覧画面
  var operationSchoolCheckbox = document.getElementById("operationSchoolCheckbox");
  var schoolId = document.getElementById("schoolId");
  //口授業メニュー画面
  var lessonMenuCheckBox = document.getElementById("lessonMenuCheckBox");
  var lessonMenuSelect = document.getElementById("lessonMenuSelect");

  

  chrome.storage.sync.get([
    "checkboxState",
    "loginId",
    "loginPw",
    "menuScreenCheckboxState",
    "seitoMenuCheckboxState",
    "firstSelectValue",
    "secondSelectValue",
    "StudentcheckboxState", 
    "studentidValue",
    "studentDataCheckBoxState",
    "studentDataSelectValue",
    "operationSchoolCheckboxState",
    "schoolIdValue",
    "lessonMenuCheckBoxState",
    "lessonMenuSelectValue",
    "loginModeCheckboxState",
    "loginModeSelectValue"

  ], function (data) {
    //環境
    loginModeCheckbox.checked = data.loginModeCheckboxState || false;
    loginModeSelect.value = data.loginModeSelectValue || "1";
    //ログイン画面
    checkbox.checked = data.checkboxState || false;
    usernameInput.value = data.loginId || "";
    passwordInput.value = data.loginPw || "";
    //コメニュー画面
    menuScreenCheckbox.checked = data.menuScreenCheckboxState || false;
    firstSelect.value = data.firstSelectValue || "1";
    //生徒メニュー画面
    seitoMenuCheckbox.checked = data.seitoMenuCheckboxState || false;
    secondSelect.value = data.secondSelectValue || "1";
    //生徒検索画面
    Studentcheckbox.checked = data.StudentcheckboxState || false; 
    studentid.value = data.studentidValue || ""; 
    //生徒詳細画面
    studentDataCheckBox.checked = data.studentDataCheckBoxState || false;
    studentDataSelect.value = data.studentDataSelectValue || "1";
    //校舎一覧画面
    operationSchoolCheckbox.checked = data.operationSchoolCheckboxState || false;
    schoolId.value = data.schoolIdValue || ""; 
    //口授業メニュー画面
    lessonMenuCheckBox.checked = data.lessonMenuCheckBoxState || false; 
    lessonMenuSelect.value = data.lessonMenuSelectValue || "1";

    
   
  });

  // Save data to Chrome storage when the checkbox or input fields change
  //ログイン画面
  checkbox.addEventListener("change", saveData);
  usernameInput.addEventListener("input", saveData);
  passwordInput.addEventListener("input", saveData);
  //コメニュー画面
  menuScreenCheckbox.addEventListener("change", saveData);
  firstSelect.addEventListener("change", saveData);
  //生徒メニュー画面
  seitoMenuCheckbox.addEventListener("change", saveData);
  secondSelect.addEventListener("change", saveData);
  //生徒検索画面
  Studentcheckbox.addEventListener("change", saveData); 
  studentid.addEventListener("input", saveData); 
  //生徒詳細画面
  studentDataCheckBox.addEventListener("change", saveData);
  studentDataSelect.addEventListener("change", saveData);
  //校舎一覧画面
  operationSchoolCheckbox.addEventListener("change", saveData);
  schoolId.addEventListener("input", saveData); 
  //口授業メニュー画面
  lessonMenuCheckBox.addEventListener("change", saveData);
  lessonMenuSelect.addEventListener("change", saveData);
  //環境
  loginModeCheckbox.addEventListener("change", saveData);
  loginModeSelect.addEventListener("change", saveData);

  function saveData() {
    //ログイン画面
    var checkboxState = checkbox.checked;
    var loginId = usernameInput.value;
    var loginPw = passwordInput.value;
    //コメニュー画面
    var menuScreenCheckboxState = menuScreenCheckbox.checked;
    var firstSelectValue = firstSelect.value;
    //生徒メニュー画面
    var seitoMenuCheckboxState = seitoMenuCheckbox.checked;
    var secondSelectValue = secondSelect.value;
    //生徒検索画面
    var StudentcheckboxState = Studentcheckbox.checked; 
    var studentidValue = studentid.value; 
    //生徒詳細画面
    var studentDataCheckBoxState = studentDataCheckBox.checked;
    var studentDataSelectValue = studentDataSelect.value;
    //校舎一覧画面
    var operationSchoolCheckboxState = operationSchoolCheckbox.checked;
    var schoolIdValue = schoolId.value; 
    //口授業メニュー画面
    var lessonMenuCheckBoxState = lessonMenuCheckBox.checked;
    var lessonMenuSelectValue = lessonMenuSelect.value;
    //環境
    var loginModeCheckboxState = loginModeCheckbox.checked;
    var loginModeSelectValue = loginModeSelect.value;

    // Save data to Chrome storage
    chrome.storage.sync.set(
      {
        //ログイン画面
        checkboxState: checkboxState,
        loginId: loginId,
        loginPw: loginPw,
        //コメニュー画面
        menuScreenCheckboxState: menuScreenCheckboxState,
        firstSelectValue: firstSelectValue,
        //生徒メニュー画面
        seitoMenuCheckboxState: seitoMenuCheckboxState,
        secondSelectValue: secondSelectValue,
        //生徒検索画面
        StudentcheckboxState: StudentcheckboxState, 
        studentidValue: studentidValue,
        //生徒詳細画面
        studentDataCheckBoxState: studentDataCheckBoxState,
        studentDataSelectValue: studentDataSelectValue,
        //校舎一覧画面
        operationSchoolCheckboxState: operationSchoolCheckboxState,
        schoolIdValue: schoolIdValue ,
        //口授業メニュー画面
        lessonMenuCheckBoxState: lessonMenuCheckBoxState,
        lessonMenuSelectValue: lessonMenuSelectValue,
        //環境
        loginModeCheckboxState: loginModeCheckboxState,
        loginModeSelectValue: loginModeSelectValue
        

      },
      function () {
        console.log("Data stored successfully");

      }
    );
  }
});
