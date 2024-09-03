/* Control */
const saveButton = document.getElementById('saveButton');
const autoHideCheckBox = document.getElementById('doeLoginEnabled');

/* Errors */
const managementSystemError = document.getElementById('managementError');
const schoolNameError = document.getElementById('schoolError');

saveButton.addEventListener('click', async () => {
    let hasErrors = false;

    managementSystemError.innerHTML = "";
    schoolNameError.innerHTML = "";

    const managementSystemValue = document.getElementById('schoolManagement').value;
    const schoolNameValue = document.getElementById('schoolSetting').value;
    const autoHideValue = autoHideCheckBox.checked;

    if (managementSystemValue === "notSelected") {
        managementSystemError.innerHTML = "You need to select a management system.";
        hasErrors = true;
    }
    
    if (schoolNameValue === "notSelected") {
        schoolNameError.innerHTML = "You need to select a school.";
        hasErrors = true;
    }

    if (!hasErrors) {
        const updatedConfig = {
            schoolName: schoolNameValue !== "notSelected" ? schoolNameValue : null,
            managementSystem: managementSystemValue !== "notSelected" ? managementSystemValue : null,
            autoHideDETNSW: autoHideValue,
        };
        for (const [key, value] of Object.entries(updatedConfig)) {
            if (value !== null) {
                await window.electron.writeConfig(key, value);
            }
        }
        await window.electron.resetApp();
    }
});
