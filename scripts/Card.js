export class Card {
    constructor(name, link, alt, listContainerElement, zoomingImg) {
        this._name = name;
        this._link = link;
        this._alt = alt;
        this._zoomingImg = zoomingImg;
        this._listContainerElement = listContainerElement;

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
        this._element.querySelector(".element__remove").addEventListener("click", this._removeItem);
        this._element.querySelector(".element__like").addEventListener("click", this._likeItem);
        this._element.querySelector(".element__image").addEventListener("click", this._zoomingImg);
    }


    _likeItem(event) {
        event.target.classList.toggle("element__like_active");
    }

    _removeItem(event) {
        event.target.closest(".element").remove();

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




