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
            document.getElementById('doespecsettings').style.display = "block";
            break;

        case "CSDP":
            schoolNamesDropdown.innerHTML = `
            <option value="notSelected" selected="true" disabled="true">Please select a school</option>
            <option value="GCC">Gilroy Catholic College</option>
            <option value="PMB">Marist Brothers Parramatta</option>
            `;
            document.getElementById('doespecsettings').style.display = "none";
            break;
        default:
            break;
    }
})

schoolNamesDropdown.addEventListener('change', () => {
    schoolNameError.innerHTML = ""
})