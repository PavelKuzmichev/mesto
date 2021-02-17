import { Popup } from "./Popup.js";

export default class PopupWithConfirmDelete extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll(".popup__input");
        
    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm(this._data);
            this.close();
        });
    }
    open(data) {
        this._data = data;
        super.open();
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
}
