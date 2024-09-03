window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('doeLoginLink');
    window.electron.getConfig().then(config => {
        try {
            if (config.autoHideDETNSW === true) {
                element.remove();
            }
        } catch (error) {
            console.error(error);
        }
    }).catch(error => {
        console.error(error);
    });
});
