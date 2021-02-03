export default class Card {
    constructor(data, handleCardClick) {
        this._title = data.title;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document.querySelector(".template").content.querySelector(".element").cloneNode(true);
        return cardElement;
    }
    _setListenersToItem() {
        this._element.querySelector(".element__remove").addEventListener("click", () => this._removeItem());
        this._element.querySelector(".element__like").addEventListener("click", this._likeItem);
        this._element.querySelector(".element__image").addEventListener("click", this._handleCardClick);
    }
    _likeItem(event) {
        event.target.classList.toggle("element__like_active");
    }
    _removeItem() {
        this._element.remove();
        this._element = null;
    }
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector(".element__image").src = this._link;
        this._element.querySelector(".element__image").alt = this._title;
        this._element.querySelector(".element__title").textContent = this._title;
        this._setListenersToItem();
        return this._element;
    }
}

