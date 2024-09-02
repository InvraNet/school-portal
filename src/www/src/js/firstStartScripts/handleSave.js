/* Control */
const saveButton = document.getElementById('saveButton');

/* Errors */
const managementSystemError = document.getElementById('managementError');
const schoolNameError = document.getElementById('schoolError');

saveButton.addEventListener('click', () => {
    if (schoolManagementSystemDropdown.value == "notSelected")
    {
        managementSystemError.innerHTML = "You need to select a management system."
    } else if (schoolNamesDropdown.value == "notSelected")
    {
        schoolNameError.innerHTML = "You need to select a school."
    } else {
        window.electron.writeConfig()
    }
})