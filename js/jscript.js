//* Themes Section
let blueBtn = document.querySelector(".colorsLinks div.blue");
let orangeBtn = document.querySelector(".colorsLinks div.orange");
let greenBtn = document.querySelector(".colorsLinks div.green");
let grayBtn = document.querySelector(".colorsLinks div.gray");
let darkBtn = document.querySelector(".colorsLinks div.dark");
let root = document.documentElement;// === document.querySelector(':root')
let svgStoredColor

window.onload = function () {
    changeThemeColors('#90CAF9'); //=svgColorToCheck (we want to change just the SVG colored parts and leave the dark&light ones unchanged)
}
blueBtn.onclick = function () {
    svgStoredColor = JSON.parse(window.localStorage.getItem("Site.Themes")).svgColor || '#90CAF9'; // Take svg Stored Color before changing it. (NB: '#90CAF9' is the original SVG images fill color)
    storeThemesColors('#74b9ff', '#ffffff', '#0984e3', '#295c83ad', '#f9f9f9', '#2d3436', '#90CAF9'); // in the LocalStorage And ...
    changeThemeColors(svgStoredColor); // Pass it into the function and changing the window theme
};
orangeBtn.onclick = function () {
    svgStoredColor = JSON.parse(window.localStorage.getItem("Site.Themes")).svgColor || '#90CAF9';
    storeThemesColors('#ffc107', '#ffffff', '#ff5a02', '#aa1b01', '#f6eb88', '#8c2f00', '#ffc107');
    changeThemeColors(svgStoredColor)
};
greenBtn.onclick = function () {
    svgStoredColor = JSON.parse(window.localStorage.getItem("Site.Themes")).svgColor || '#90CAF9';
    storeThemesColors('#8afd61', '#ffffff', '#3dc300', '#34792c', '#d3fdc0', '#34792c', '#8afd61');
    changeThemeColors(svgStoredColor)
};
darkBtn.onclick = function () {
    svgStoredColor = JSON.parse(window.localStorage.getItem("Site.Themes")).svgColor || '#90CAF9';
    storeThemesColors('rgb(0 0 0)', 'rgb(80 80 80)', '#cccccc', '#ffffff', 'rgb(50 50 50)', 'rgb(70 70 70)', '#000000');
    changeThemeColors(svgStoredColor)
}
function storeThemesColors(clr1, clr2, clr3, clr4, clr5, clr6, clr7) {
    let themeColors = { mainColor: clr1, sdMainColor: clr2, fontColor: clr3, boxShad: clr4, bgColor1: clr5, bgColor2: clr6, svgColor: clr7 }
    window.localStorage.setItem("Site.Themes", JSON.stringify(themeColors))
}

function changeThemeColors(svgColorToCheck) {
    let theme_Colors = JSON.parse(window.localStorage.getItem("Site.Themes"))
        || {
        mainColor: '#74b9ff',
        sdMainColor: '#ffffff',
        fontColor: '#0984e3',
        boxShad: '#295c83ad',
        bgColor1: '#f9f9f9',
        bgColor2: '#2d3436',
        svgColor: '#90CAF9'
    }
    root.style.setProperty('--main-color', theme_Colors.mainColor);
    root.style.setProperty('--sd-main-color', theme_Colors.sdMainColor);
    root.style.setProperty('--font-color', theme_Colors.fontColor);
    root.style.setProperty('--boxShad', theme_Colors.boxShad);
    root.style.setProperty('--bg-color', theme_Colors.bgColor1);
    root.style.setProperty('--bg-color2', theme_Colors.bgColor2);
    svgColorChange(svgColorToCheck, theme_Colors.svgColor);
}
/* Changin the color of all the part of the svg image that are colored with "svgColorToCheck" */
function svgColorChange(svgColorToCheck, svgNewColor) {
    let svgObj = document.querySelectorAll("object"); // SVG files

    svgObj.forEach(function (el) {
        let svg = el.contentDocument.firstChild.querySelectorAll("g"); // <object> => #Document => <svg> => all <g> tags
        for (let i = 0; i < svg.length; i++) {
            let gTagChildren = svg[i].childNodes; // fill elements[] with <g> children[]
            for (let x = 0; x < gTagChildren.length; x++) {
                if (gTagChildren[x].hasAttribute("style")) {
                    if (gTagChildren[x].getAttribute("style").includes(`fill:${svgColorToCheck}`)) { // if there is a color set...
                        gTagChildren[x].setAttribute("style", `fill:${svgNewColor}`)        // so change it with this
                    }
                }
            }
        }
    })
}
grayBtn.addEventListener("click", () => {
    grayScale();
});
function grayScale() {
    if (root.style.filter == "grayscale()") {
        root.style.filter = "none";
        grayBtn.innerText = "Grayscale";
    } else {
        root.style.filter = "grayscale()";
        grayBtn.innerText = "Normal";
    }
};

//* Contact Form Checks Section

let nameInput = document.forms["contactForm"]["fullName"] // OR: document.contactForm.fullName
let emailInput = document.forms["contactForm"]["email"]
let phoneInput = document.contactForm.tel
let msgInput = document.contactForm.message
let sbmtBtn = document.contactForm.querySelector("#sbmt")

// check inputs validity
sbmtBtn.onclick = function (event) {
    // Name doesn't contain a number
    for (i = 0; i < nameInput.value.length; i++) {
        if (!isNaN(nameInput.value[i])) {
            ev.preventDefault()
            nameInput.focus()
            ErrorMsg(nameInput.value, nameInput) // Display Error Message
            return
        }
    }
    // Phone number contains just numbers
    if (phoneInput.value.trim()) {  // there is a value after remouving white space at the start & the end
        for (i = 0; i < phoneInput.value.length; i++) {
            if (isNaN(phoneInput.value[i])) {
                ev.preventDefault()
                phoneInput.focus()
                ErrorMsg(phoneInput.value, phoneInput)
                return
            }
        }
    }
}


function ErrorMsg(value, place) {
    let span = document.createElement("SPAN")
    let errorText = document.createTextNode(`${value} is not a valid entry.`)
    span.appendChild(errorText)
    place.parentElement.appendChild(span)
    span.classList.add("errorSpan")
    place.addEventListener("input", () => span.remove()) // Remove error Message when correcting the values
}