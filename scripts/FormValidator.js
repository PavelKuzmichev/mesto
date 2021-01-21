
export default class FormValidator {
    constructor(config, formSelector) {
        this._config = config;
        this._formSelector = formSelector;
    }

    _showError(form, input) {
        const error = form.querySelector(`#${input.id}-error`);

        error.textContent = input.validationMessage;
        input.classList.add(this._config.errorClass);
    }

    _hideError(form, input) {
        const error = form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.remove(this._config.errorClass);
    }

    _checkInputValidity(form, input) {
        if (input.validity.valid) {
            this._hideError(form, input, this._config);
        } else {
            this._showError(form, input, this._config);
        }
    }

    setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.inactiveButtonClass);
            button.disabled = true;
        }
    }

    _setEventListener(form) {
        const inputList = form.querySelectorAll(this._config.inputSelector);
        const submitBtn = form.querySelector(this._config.submitButtonSelector);

        inputList.forEach((input) => {
            input.addEventListener("input", (evt) => {
                this._checkInputValidity(form, input);
                this.setButtonState(submitBtn, form.checkValidity());
            });
        });
    }

    enableValidation(form) {
        form = document.querySelector(this._formSelector);
        this._setEventListener(form);
        const submitBtn = form.querySelector(this._config.submitButtonSelector);
        this.setButtonState(submitBtn, form.checkValidity());
    }
}









