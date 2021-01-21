export default class Card {
    constructor(name, link, clickImage) {
        this._name = name;
        this._link = link;
        this._alt = this._name;
        this._clickImage = clickImage;
            }

    _getTemplate() {
        const cardElement = document
            .querySelector('.template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }
    _setListenersToItem() {
        this._element.querySelector(".element__remove").addEventListener("click", () =>{ this._removeItem()});
        this._element.querySelector(".element__like").addEventListener("click", this._likeItem);
        this._element.querySelector(".element__image").addEventListener("click", this._clickImage);
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
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._alt;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setListenersToItem();

        return this._element;
    }
}