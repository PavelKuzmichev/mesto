
export default class Card {
    constructor(data, handleCardClick, cardTemplate, api, userID, like, disLike) {
        this._title = data.name;
        this._link = data.link;
        this.cardId1 = data._id;
        this._likes = data.likes;
        this._id = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._cardTemplate = document.querySelector(cardTemplate);
        this._api = api;
        this.userID = userID;
        this._like = like;
        this._disLike = disLike;
        console.log( this._likes)
        console.log(this.cardId1)
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
        this._element.querySelector(".element__like").addEventListener("click", ()=> this._likeItem());
        this._cardImage.addEventListener("click", this._handleCardClick);
    }
    _likeItem () {
        console.log(this._like)
        this._like.likeCard(this.cardId1)
        .then((res)=>{
            console.log(this._element.querySelector('.element__likeSum'))
            this._element.querySelector('.element__likeSum').textContent = res.likes.length;
            this._element.querySelector('.element__like').classList.toggle("element__like_active");
        })
            
        }
    _disLikeItem    

                //
        
        
    
    _confirmRemoveItem(){

    }
    _removeItem() {
        console.log(this._like)
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
        this._likesSum = this._element.querySelector('.element__likeSum');
        this._likesSum.textContent = this._likes.length;
        this._element.querySelector(".element__title").textContent = this._title;
        this._setListenersToItem();
        this._checkUserID()
        return this._element;
    }
}


