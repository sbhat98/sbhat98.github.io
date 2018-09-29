var fancyText = document.getElementById('fancy');
var intervalTime = 150;
var initialPause = 1000;
var callbackPause = 500;

function deleteContent(callback) {

    var intervalId = setInterval(() => {
        if (fancyText.innerHTML.length == 0) {
            clearInterval(intervalId);

            if (callback) {
                setTimeout(callback, callbackPause);
            }
        }

        fancyText.innerHTML = fancyText.innerHTML.substring(0, fancyText.innerHTML.length - 1);
    }, intervalTime);

}

function addContent(contentToAdd, callback) {
    var currentIndex = 0;

    var intervalId = setInterval(() => {
        if (currentIndex == contentToAdd.length) {
            clearInterval(intervalId);

            if (callback) {
                setTimeout(callback, callbackPause);
            }
        }

        fancyText.innerHTML = contentToAdd.substring(0, currentIndex);
        currentIndex++;
    }, intervalTime);
}

let phrases = ['Shishir', 'a developer', 'a student', 'a teacher', 'a musician']
let index = 0

const nextPhrase = () => {
    index++
    if (index === phrases.length) {
        index = 0
    }
    return phrases[index]
}

s = new Promise(r => setTimeout(() => r(), initialPause))

setInterval(() => {
    s = s.then(() => new Promise(r => deleteContent(r)))
    s = s.then(() => new Promise(r => addContent(nextPhrase(), r)))
    s = s.then(() => new Promise(r => setTimeout(r, 400)))
    if (!index) {
        s = s.then(() => new Promise(r => setTimeout(r, 4000)))
    }
}, 6000)
