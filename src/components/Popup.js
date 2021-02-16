export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeByClick = this._closeByClick.bind(this);
        this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
        
    }
    open() {
        this._popup.classList.add("popup_visible");
        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener("click", this._closeByClick);
    }
    close() {
        this._popup.classList.remove("popup_visible");
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("click", this._closeByClick);
    }

    _closeByClick(e) {
        if (e.target.classList.contains("popup_visible")) {
            this.close();
        }
    }
    _handleEscClose(e) {
        if (e.key === "Escape" && document.querySelector(".popup_visible")) {
            this.close();
        }
    }
    setEventListeners() {
        
        this._popupCloseBtn.addEventListener("click", () => this.close());
    }
   
}

