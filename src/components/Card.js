export default class Card {
    constructor(data, handleCardClick, cardTemplate, api, userID) {
        this._title = data.name;
        this._link = data.link;
        this.cardId1 = data._id
        this._id = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = document.querySelector(cardTemplate);
        this._api = api;
        this.userID = userID;
        //console.log(this.cardId1)
    }
    _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector(".element").cloneNode(true);
        return cardElement;
    }
    _checkUserID ()  {
        if (this.userID !== this._id) {
            //console.log(this.userID)
            this._element.querySelector(".element__remove").classList.add("element__remove_clear")
        }
        
    }
    _setListenersToItem() { 
        
        this._element.querySelector(".element__remove").addEventListener("click", () => this._removeItem());
        this._element.querySelector(".element__like").addEventListener("click", this._likeItem);
        this._cardImage.addEventListener("click", this._handleCardClick);
    }
    _likeItem(event) {
        event.target.classList.toggle("element__like_active");
    }
    _removeItem() {
        
        this._api
        .removeCard(this.cardId1)
        .then (()=>{
            
            this._element.remove();
            this._element = null;})
        
    }
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".element__image");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._element.querySelector(".element__title").textContent = this._title;
        this._setListenersToItem();
        this._checkUserID()
        return this._element;
    }
}


