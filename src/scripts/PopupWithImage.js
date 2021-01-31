import {Popup} from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup__image-zoom');
        this._imageName = this._popupSelector.querySelector('.popup__title-zoom');
       console.log(this._image)
    }
        
        
    
    open(e){
        super.open()
        this._image.src = e.src;
        this._image.alt = e.alt;
        this._imageName.textContent = this._image.alt;
    }
    close(){
        super.close()
        

    }
    setEventListeners(){
        super.setEventListeners()
        
        
        
    }
}