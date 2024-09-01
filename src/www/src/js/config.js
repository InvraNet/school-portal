var SchoolName;
var GeoState;
var SchoolType;

async function initialize() {
    try {
        const config = await window.electron.getConfig();
        if (typeof config === 'string') {
            const data = JSON.parse(config);
            SchoolType = data.type;
            SchoolName = data.schoolName;
            GeoState = data.state;
        } else if (typeof config === 'object') {
            SchoolType = config.type;
            SchoolName = config.schoolName;
            GeoState = config.state;
        } else {
            throw new Error('Unexpected config format');
        }
    } catch (error) {
        console.log(error);
    }
}

initialize();