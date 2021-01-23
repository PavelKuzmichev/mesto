export default class FormValidator {
  
    constructor(config, formSelector) {
        this._config = config;
        this._form = document.querySelector(formSelector);
        this._inputList = this._form.querySelectorAll(config.inputSelector);
        this._button = this._form.querySelector(config.submitButtonSelector);
        console.log(this._button)
        
    }
    clearSpanError() {
        const errors = document.querySelectorAll(".popup__error"); 
        this._inputList.forEach((input) => input.classList.remove(this._config.errorClass));
        errors.forEach((error) => error.textContent = "");
  }
  

    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.errorClass);
    }
    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.remove(this._config.errorClass);
    }
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    }
    setButtonState() {
        if (this._form.checkValidity()) {
            this._button.classList.remove(this._config.inactiveButtonClass);
            this._button.disabled = false;
        } else {
            this._button.classList.add(this._config.inactiveButtonClass);
            this._button.disabled = true;
        }
    }
    _setEventListener() {       
        this._inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this.setButtonState();
            });
        });
    }
    enableValidation() {
           this._setEventListener();
               
    }
}








