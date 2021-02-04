import { Popup } from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image-zoom");
        this._imageName = this._popup.querySelector(".popup__title-zoom");
    }

    open(e) {
        super.open();
        this._image.src = e.src;
        this._image.alt = e.alt;
        this._imageName.textContent = this._image.alt;
    }
}
