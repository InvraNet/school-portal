var settingsClientInfo = document.getElementById('clientInfo');

async function populateSettings() {
    try {
        const config = await window.electron.getConfig();
        console.log(config);
        settingsClientInfo.innerHTML = `
            <p>Your School: ${config.schoolName}</p>
            <p>Your Manager: ${config.managementSystem}</p>
        `;
    } catch (error) {
        console.error("Error populating settings:", error);
    }
}

populateSettings();