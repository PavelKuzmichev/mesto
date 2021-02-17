
export default class Card {
    constructor(data, handleCardClick, cardTemplate, api, userID, like, disLike, popupDeleteCard, {handleDeleteCardClick} ) {
        this._title = data.name;
        this._link = data.link;
        this.focusCard = data._id;
        this._likes = data.likes;
        this._id = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = document.querySelector(cardTemplate);
        this._api = api;
        this.userID = userID;
        this._like = like;
        this._disLike = disLike;
        this._popupDeleteCard = popupDeleteCard;
        this._handleDeleteCardClick = handleDeleteCardClick;
       //this._submitFormDeleteCard = submitFormDeleteCard;
        
    }
   
    _getTemplate() {
        const cardElement = this._cardTemplate.content.querySelector(".element").cloneNode(true);
        return cardElement;
    }
    _checkUserID() {
        if (this.userID === this._id) {
            this._element.querySelector(".element__remove").classList.remove("element__remove_clear")
        }
    }
    _setListenersToItem() {
        this._element.querySelector(".element__remove").addEventListener("click",  this._handleDeleteCardClick)
        this._element.querySelector(".element__like").addEventListener("click", () => { this.likeOrDislike() });
        this._cardImage.addEventListener("click", this._handleCardClick);
    }
    removeItem() {
        
                this._element.remove();
                this._element = null;
            }
    
    _checkMyLike(res) {
        let userLikeEnablet = res.find(item => item._id == 'ca67b3c561070f21b7e4e0f1')
        if (userLikeEnablet) {
            this._element.querySelector('.element__like').classList.add("element__like_active");
            return true
        } else {
            this._element.querySelector('.element__like').classList.remove("element__like_active");
            return false
        }
    }
    likeOrDislike() {
        if (this._checkMyLike(this._likes)) {
            this._disLikeItem()}
        else {
            this._likeItem()}
    }
    _likeItem() {
            this._like.likeCard(this.focusCard)
            .then((res) => {
                this._element.querySelector('.element__likeSum').textContent = res.likes.length;
                this._element.querySelector('.element__like').classList.add("element__like_active");
                this._likes = res.likes})
    }
    _disLikeItem() {
            this._like.disLikeCard(this.focusCard)
            .then((res) => {
                this._element.querySelector('.element__likeSum').textContent = res.likes.length;
                this._element.querySelector('.element__like').classList.remove("element__like_active");
                this._likes = res.likes})
    }
  
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".element__image");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._likesSum = this._element.querySelector('.element__likeSum');
        this._likesSum.textContent = this._likes.length;
        this._element.querySelector(".element__title").textContent = this._title;
        this._setListenersToItem();
        this._checkUserID()
        
        this._checkMyLike(this._likes)
        return this._element;
    }
}


