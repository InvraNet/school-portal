while (!document.getElementById('promptSubmit')) {

}

document.getElementById('promptSubmit').addEventListener('click', () => {
    if (document.getElementById('schoolDD').value ="notSelected") {
    } else if (document.getElementById('schoolDD').value = "mfhs") {
        console.log('he')
        window.location.href = "https://modelfarms-h.sentral.com.au"
    } else {

    }
})