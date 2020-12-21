
// функции валидации формы.

function showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add('popup__input_invalid');
}

function hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.remove('popup__input_invalid');
}

function checkInputValidity(form, input) {
    if (input.validity.valid) {
        hideError(form, input)
    } else {
        showError(form, input)
    }
}

function setButtonState(button, isActive) {
    if (isActive) {
        button.classList.remove('popup__submit-btn_invalid');
        button.disabled = false;
    } else {
        button.classList.add('popup__submit-btn_invalid');
        button.disabled = true;
    }

}

function setEventListener(form) {
    const inputList = form.querySelectorAll('.popup__input');
    const submitBtn = form.querySelector('.popup__submit-btn');

    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input);
            setButtonState(submitBtn, form.checkValidity());

        })
    })
}

function enableValidation() {
    const forms = document.querySelectorAll('.popup__form');
    forms.forEach(form => {
        setEventListener(form);
    })
}

enableValidation();
