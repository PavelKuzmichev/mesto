export class Popup {
    constructor (popupSelector){
        
 this._popupSelector = popupSelector;
 this._handleEscClose = this._handleEscClose.bind(this);
 this._closeByClick =this._closeByClick.bind(this);
    }
    open (){
        this._popupSelector.classList.add("popup_visible");
        document.addEventListener("keydown", this._handleEscClose);
        document.addEventListener("click", this._closeByClick);
    }
    close (){
        this._popupSelector.classList.remove("popup_visible");
        document.removeEventListener("keydown", this._handleEscClose);
        document.removeEventListener("click", this._closeByClick);
        
    }

    _closeByClick(e) {
        if (e.target.classList.contains("popup_visible")) {
            this.close();
        }}
    _handleEscClose  (e) 
    
         {
            if (e.key === "Escape" && document.querySelector(".popup_visible")) {
                this.close();
            }
    
    
}
setEventListeners (){
     this._popupSelector.querySelector(".popup__close-btn").addEventListener("click", () =>
        this.close())
      
       // closeBtn.removeEventListener("click", this.close())
            }
            
            
                
      }  
/*export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image-zoom');
        this._imageName = this._popup.querySelector('.popup__title-zoom');
    }
    open(item){
        super.open()
        this._image.src = item.src;
        this._image.alt = item.name;
        this._imageName.textContent = item.name;
    }
}*/