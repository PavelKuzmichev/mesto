export default class Card {
    constructor(data, handleCardClick, cardTemplate, api) {
        this._title = data.name;
        this._link = data.link;
        this._id = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = document.querySelector(cardTemplate);
        this._api = api;
        console.log(this._id);
        
    }
    _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector(".element").cloneNode(true);
        return cardElement;
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
        .removeCard(this._id)
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
        return this._element;
    }
}


