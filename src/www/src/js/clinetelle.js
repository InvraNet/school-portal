var settingsClientInfo = document.getElementById('clientInfo');

var data = window.electron.getConfig()

settingsClientInfo.innerHTML = `
    <p>Your School: ${SchoolName}</p>
    <p>Your Manager: ${data.managementSystem}</p>
`;