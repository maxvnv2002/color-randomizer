
// -----------------------------------=- Title -=-------------------------------------
const title = document.querySelector('.header__title'),
    strTitle = 'Color Randomizer',
    strTitleArr = strTitle.split(''),
    colorsArr = [
        '#FEF7EC',
        '#FEB958',
        '#FD6E50',
        '#E15A8C',
        '#5A5A95'
    ]

function createBackgroundLayers() {
    let fontSize = 60
    for (let i = 1; i < colorsArr.length; i++) {
        fontSize = fontSize - 2
        let fontSizeStyle = `font-size:${fontSize}px`
        title.innerHTML += `
            <div class="header__layer header__layer_back" style="${fontSizeStyle}; color: ${colorsArr[i]}; z-index: -${i}">
                Color Randomizer
            </div>
        `
    }
}
createBackgroundLayers()

document.addEventListener('mousemove', (e) => {
    const backLayers = document.querySelectorAll('.header__layer_back')

    let percentOfVert = ((e.clientY / window.innerHeight) * 100),
        percentOfHoriz = ((e.clientX / window.innerWidth) * 100)

    let fontSize = 60

    backLayers.forEach((item , i) => {
        fontSize = fontSize - 2

        let fontSizeStyle = `font-size:${fontSize}px`

        item.style.cssText = `${fontSizeStyle}; color: ${colorsArr[i + 1]}; z-index: -${i + 1}; transform: rotate(${-(i + 1) * calcHoriz(percentOfHoriz)}deg) translateY(${(i + 1) * calcVert(percentOfVert)}px);`
    })
})

function calcVert (percent) {
    if (percent < 20) {
        return -7
    } else if (percent >= 20 && percent < 40) {
        return -5
    } else if (percent >= 40 && percent < 60) {
        return 0
    } else if (percent >= 60 && percent < 80) {
        return 3
    } else {
        return 5
    }
}

function calcHoriz (percent) {
    if (percent < 34) {
        return 1
    } else if (percent >= 34 && percent < 66) {
        return 0
    } else {
        return -1
    }
}
// -----------------------------------=- end of Title code -=-------------------------------------
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// -----------------------------------=- Generate color -=----------------------------------------

const cards = document.querySelectorAll('.main__card'),
    cardLocks = document.querySelectorAll('.main__lock')
let activeLocks = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
    }
function generateColor () {
    const arr = [getRandomInt(255), getRandomInt(255), getRandomInt(255)]

    function decToHex(num){
        return Number(num).toString(16)
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getZero (num) {
        if (num < 10 || num.length === 1) {
            return `0${num}`
        } else return `${num}`
    }

    let hex = `#${getZero(decToHex(arr[0]))}${getZero(decToHex(arr[1]))}${getZero(decToHex(arr[2]))}`
    return hex.toUpperCase()
}
generateColor()

document.addEventListener('keydown', (e) => {
    let tempArr = Object.entries(activeLocks)
    fillCard(e, tempArr)
})

cards.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        let target = e.target,
            tempArr = Object.entries(activeLocks)
        if (target.matches('main__lock') || target.matches('svg')) {
            if (target.classList.contains('unlocked')|| target.parentElement.classList.contains('unlocked')) {
                cardLocks[i].innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0-beta1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M384 192h-32V127.1c0-70.58-57.42-127.1-128-127.1s-128 57.42-128 127.1V192H64C28.65 192 0 220.7 0 256v191.1c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V256C448 220.7 419.3 192 384 192zM144 128c0-44.11 35.89-80 80-80s80 35.89 80 80v64h-160V128zM400 448c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V256c0-8.822 7.178-16 16-16h320c8.822 0 16 7.178 16 16V448zM224 304c-13.25 0-24 10.75-24 24v48c0 13.25 10.75 23.1 24 23.1S248 389.3 248 376v-48C248 314.8 237.3 304 224 304z"/></svg>
                `
                cardLocks[i].classList.add('locked')
                cardLocks[i].classList.remove('unlocked')
                tempArr[i][1] = true
            } else if (target.classList.contains('locked')|| target.parentElement.classList.contains('locked')) {
                cardLocks[i].innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.0.0-beta1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M432 0c-70.58 0-128 57.42-128 128v64H64C28.65 192 0 220.7 0 256v192c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V256c0-35.35-28.65-64-64-64h-32V128c0-44.11 35.89-80 80-80S512 83.89 512 128v72C512 213.3 522.8 224 536 224s24-10.75 24-24V128C560 57.42 502.6 0 432 0zM384 240c8.822 0 16 7.178 16 16v192c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V256c0-8.822 7.178-16 16-16H384zM224 400c13.25 0 24-10.75 24-24v-48C248 314.8 237.3 304 224 304s-24 10.75-24 24v48C200 389.3 210.8 400 224 400z"/></svg>
                `
                cardLocks[i].classList.add('unlocked')
                cardLocks[i].classList.remove('locked')
                tempArr[i][1] = false
            }


            activeLocks = Object.fromEntries(tempArr)
        }
    })
})

function fillCard (e, arr) {
    if (e.keyCode === 32) {
        cards.forEach((item, i) => {
            if (arr[i][1] === false) {
                item.style.cssText = `background: ${generateColor()}`
                item.querySelector('.main__text').innerHTML = `
                <div class="main__hex">${generateColor()}</div>
                <div class="main__copy">
                    Click to copy to the clipboard
                </div>
            `
            }
        })
    }
}
// -----------------------------------=- end of Generate color code -=----------------------------
// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// -----------------------------------=- Copy color -=--------------------------------------------
const colorText = document.querySelectorAll('.main__text')

colorText.forEach(item => {
    item.addEventListener('click', () => {
        copyHex(item.querySelector('.main__hex').textContent)

        let copiedText = document.createElement('div')
        copiedText.textContent = `* Copied *`
        copiedText.classList.add('main__copied','show')
        item.append(copiedText)
        setTimeout(() => {
            copiedText.classList.remove('show')
            setTimeout(() => {
                item.removeChild(copiedText)
            },  400)
        }, 500)
    })
})

function copyHex(text) {
    const tempInput = document.createElement('input')
    tempInput.value = text
    document.body.appendChild(tempInput)
    tempInput.select()

    if (document.execCommand('copy')) {

    }
    document.body.removeChild(tempInput)
}