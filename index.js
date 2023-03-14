const form = document.forms.comments
const nameInput = form.elements.name
const textInput = form.elements.text

// delete and like

const comments = document.querySelector(".comments__list")

comments.addEventListener("click", (e) => {
    if(e.target.classList.contains("comments__delete")) {
        e.target.parentElement.parentElement.remove()
    } else if(e.target.classList.contains("comments__like")) {
        e.target.classList.toggle("liked")
    }
})

// adding comment

function addComment(name, date, text) {
    const newItem = document.createElement("div")
    newItem.classList.add("comments__item")
    newItem.innerHTML = `
        <div class="comments__name">${name}</div>
        <div class="comments__date">${date}</div>
        <div class="comments__text">${text}</div>
        <div class="comments__icons">
            <div class="comments__like"></div>
            <div class="comments__delete"></div>
        </div>
    `
    comments.append(newItem)
}

function dateTransform(dateValue) {

    function addZero(number) {
        return number < 10 ? "0" + number: number;
    }

    
    const hours = addZero(new Date().getHours())
    const minutes = addZero(new Date().getMinutes())

    let date = null;

    if(dateValue === '' || new Date(dateValue).getDate() === new Date().getDate()) {
        return `сегодня ${hours}:${minutes}`
    } else {
        date = new Date(dateValue)
    }


    const year = date.getFullYear()
    const day = date.getDate()
    let month = null

    if(new Date().getDate() - day === 1) {
        return `вчера ${hours}:${minutes}`
    }

    switch(date.getMonth()) {
        case 0:
            month = "Январь"
            break
        case 1:
            month = "Февраль"
            break
        case 2:
            month = "Март"
            break
        case 3:
            month = "Апрель"
            break
        case 4:
            month = "Май"
            break
        case 5:
            month = "Июнь"
            break
        case 6:
            month = "Июль"
            break
        case 7:
            month = "Август"
            break
        case 8:
            month = "Сентябрь"
            break
        case 9:
            month = "Октябрь"
            break
        case 10:
            month = "Ноябрь"
            break
        case 11:
            month = "Декабрь"
            break
    }

    return `${day} ${month} ${year} ${hours}:${minutes}`

}

function showError(inputSelector, text) {
    const error = document.querySelector(inputSelector)
    error.innerHTML = text
    error.style.display = "block"
}

function hideError(inputSelector) {
    const error = document.querySelector(inputSelector)
    error.style.display = "none"
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = nameInput.value
    const text = textInput.value

    if (name === "" || text === "" || name.length > 70) {
        if(name === "") {
            showError(".error-name", "Введите более одного символа")
        } 
        if(text === ""){
            showError(".error-text", "Введите более одного символа")
        }
        if(name.length > 70){
            showError(".error-name", "Введите менее 70 символов")
        }
    } else {
        addComment(name, dateTransform(form.elements.date.value), text)
    }
})

textInput.addEventListener("keydown", (e) => {
    if(e.code === "Enter") {
        e.preventDefault()
        const name = nameInput.value
        const text = textInput.value

        if (name === "" || text === "" || name.length > 70) {
            if(name === "") {
                showError(".error-name", "Введите более одного символа")
            } 
            if(text === ""){
                showError(".error-text", "Введите более одного символа")
            }
            if(name.length > 70){
                showError(".error-name", "Введите менее 70 символов")
            }
        } else {
            addComment(name, dateTransform(form.elements.date.value), text)
        }
    }
})

// watch errors

nameInput.addEventListener("input", (e) => {
    if(e.target.value === "") {
        showError(".error-name", "Введите более одного символа")
    } else if (e.target.value.length > 70){
        showError(".error-name", "Введите менее 70 символов")
    } else {
        hideError(".error-name")
    }
})

textInput.addEventListener("input", (e) => {
    if(e.target.value === "") {
        showError(".error-text", "Введите более одного символа")
    } else {
        hideError(".error-text")
    }
})


