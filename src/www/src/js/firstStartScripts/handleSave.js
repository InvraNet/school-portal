/* Control */
const saveButton = document.getElementById('saveButton');

/* Errors */
const managementSystemError = document.getElementById('managementError');
const schoolNameError = document.getElementById('schoolError');

saveButton.addEventListener('click', () => {
    let hasErrors = false;

    // Clear previous error messages
    managementSystemError.innerHTML = "";
    schoolNameError.innerHTML = "";

    // Collect values from dropdowns
    const managementSystemValue = schoolManagementSystemDropdown.value;
    const schoolNameValue = schoolNamesDropdown.value;

    // Validate values
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
        };
        for (const [key, value] of Object.entries(updatedConfig)) {
            if (value !== null) {
                window.electron.writeConfig(key, value);
            }
        }
    }
});