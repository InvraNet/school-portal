var sentralURI = document.getAnimations('sentralLink')
var modal = document.getElementById('promptModal')

document.getElementById('sentralLink').addEventListener('click', () => {
    modal.innerHTML = `
    <div id="prompt">
        <h1>What school do you do to?</h1>
        <select></select>
    </div>
    `
})