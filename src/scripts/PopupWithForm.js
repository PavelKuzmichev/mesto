import {Popup} from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm){
        super(popupSelector);
        
          this._submitForm =  submitForm  
        
    }
    open(){
        super.open()
        
    }
    _getInputValues()
    {}
    setEventListeners(){
        super.setEventListeners()
        
        this._popupSelector.addEventListener("submit", this._submitForm )
        
    }
    close(){
        super.close()
        this._popupSelector.querySelector('.popup__form').reset()

    }
}