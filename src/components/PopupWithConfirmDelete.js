import { Popup } from "./Popup.js";
import Card from "../components/Card.js";
export default class PopupWithConfirmDelete extends Popup {
    constructor(popupSelector, submitForm, api) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._submitForm = submitForm;
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._api = api
       // console.log(Card.removeItem())
    }

    _getInputValues() {
        
        this._formValues = {};
        this._inputList.forEach((input) => (this._formValues[input.name] = input.value));

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        
 
        this._popup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            
             this._submitForm(this._getInputValues())
             //() => {Card.removeItem}
            //console.log(Card.focusCard)
            
            

        })
    }
    close() {
        super.close();
        this._popupForm.reset();
    }}
