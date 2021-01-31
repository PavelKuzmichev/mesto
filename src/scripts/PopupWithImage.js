import {Popup} from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        
        this._image = this._popup.querySelector('.element__image');
        this._imageName = this._popup.querySelector('.element__title');
        console.log(this._image)
    }
    open(item){
        super.open()
        this._image.src = item.src;
        this._image.alt = item.name;
        this._imageName.textContent = item.name;
    }
}