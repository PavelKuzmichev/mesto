import {Popup} from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormAdd){
        super(popupSelector);
        
          this._submitFormAdd =  submitFormAdd   
        console.log()
    }
    open(){
        super.open()
        
    }
    _getInputValues()
    {}
    setEventListeners(){
        super.setEventListeners()
        console.log(this._popupSelector.querySelector(".popup__close-btn"))
        this._popupSelector.addEventListener("submit", this._submitFormAdd )
    }
    close(){
        super.close()
    }
}