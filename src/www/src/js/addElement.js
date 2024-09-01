window.addEventListener('DOMContentLoaded', () => {
    const host = 'https://detnsw.win';

    window.electron.pingServer(host).then((isAlive) => {
        if (!isAlive) {
            const element = document.getElementById('doeLoginLink');
            if (element) {
                element.remove();
            }
        }
    }).catch((error) => {
        console.error('Error pinging server:', error);
    });
});