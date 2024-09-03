var schoolManagementSystemDropdown = document.getElementById('schoolManagement');
var schoolNamesDropdown = document.getElementById('schoolSetting');

schoolManagementSystemDropdown.addEventListener('change', () => {
    switch (schoolManagementSystemDropdown.value) {
        case "DoE":
            managementSystemError.innerHTML = ""
            schoolNamesDropdown.innerHTML = `
            <option value="notSelected" selected="true" disabled="true">Please select a school</option>
            <option value="MFHS">Model Farms High School</option>
            <option value="RHHS">Rouse Hill High School</option>
            `;
            document.getElementById('doespecsettings').innerHTML = `
            <h3>Other settings</h3>
            <div id="labTick" dragabble="false">
                
                <label for="doeLoginEnabled">Enable visibility for login for https://detnsw.net.<label>
            </div>
            `;
            break;

        case "CSDP":
            schoolNamesDropdown.innerHTML = `
            <option value="notSelected" selected="true" disabled="true">Please select a school</option>
            <option value="GCC">Gilroy Catholic College</option>
            <option value="PMB">Marist Brothers Parramatta</option>
            `;
            document.getElementById('doespecsettings').innerHTML = ``;
            break;
        default:
            break;
    }
})

schoolNamesDropdown.addEventListener('change', () => {
    schoolNameError.innerHTML = ""
})