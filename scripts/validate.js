

// функции валидации формы.

function showError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.errorClass);
}

function hideError(form, input, config) {
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.remove(config.errorClass);
}

function checkInputValidity(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config)
    } else {
        showError(form, input, config)
    }
}

function setButtonState(button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }

}

function setEventListener(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitBtn = form.querySelector(config.submitButtonSelector);
    inputList.forEach(input => {
        input.addEventListener('input', (evt) => {
            checkInputValidity(form, input, config);
            setButtonState(submitBtn, form.checkValidity(), config);

        })
    })
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach(form => {
        setEventListener(form, config);
        const submitBtn = form.querySelector(config.submitButtonSelector);
        setButtonState(submitBtn, form.checkValidity(), config);
    })

}
const ValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_invalid',
    errorClass: 'popup__input_invalid'
};

enableValidation(ValidationConfig);