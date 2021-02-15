import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../components/initialCards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js"
const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_invalid",
    errorClass: "popup__input_invalid",
    errorSelector: ".popup__error",
};
const cardsList = new Section(
    {
        
        renderer: (item) => {
            cardsList.addItem(createCard(item));
        },
    },
    ".elements"
);

//API
const api = new Api ( 
    {url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards/',
     headers: {
         authorization: '4b4ac9ed-5313-4881-afac-1a610d770d12',
         'Content-Type': 'application/json'}
         }
)
api
   .addAllCards()
   .then((res)=> {
       console.log(res)
       cardsList.renderItems(res)})
//константы

const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__about");
const formInputName = document.querySelector(".popup__input_form_name");
const formInputAbout = document.querySelector(".popup__input_form_about");

//валидация
const formValidatorCard = new FormValidator(validationConfig, ".popup__form_area_newcard");
const formValidatorAuthor = new FormValidator(validationConfig, ".popup__form_area_editprofile");
formValidatorCard.enableValidation();
formValidatorAuthor.enableValidation();
//рендер стоковых карточек
function createCard(item) {
    const card = new Card(item, handleCardClick, ".template", api);
    const cardElement = card.generateCard();
    return cardElement;
}

const userInfo1 = new  Api ( 
    {url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me',
     headers: {
         authorization: '4b4ac9ed-5313-4881-afac-1a610d770d12',
         'Content-Type': 'application/json'}
         }
)
const userInfo = new UserInfo({
    name: nameInput,
    job: jobInput,
});
const avatarIcon = document.querySelector('.profile__avatar');
userInfo1.addProfileInfo()
.then(res=> {nameInput.textContent = res.name,
    jobInput.textContent = res.about
avatarIcon.src = res.avatar})
//начальное заполнение формы редактирования профиля


//Функция сабмита редактирования профиля
function submitFormEditProfile(formObject) {
    userInfo1.editProfileInfo(formObject)
    .then(res =>{
        userInfo.setUserInfo({
        newUser: res.name,
        newJob: res.about
    })});
    openPopupEditProfile.close();
}
//функция сабмита добавления новой карточки
function submitFormAdd(item) {
    api
    .addCard(item)
    .then(res =>{cardsList.addItem(createCard(res))})
    
    popupWithFormNewCard.close();
}

//функции открытия для попапа...
const profileEditBtn = document.querySelector(".profile__edit-button");
const addNewCardBtn = document.querySelector(".profile__add-button");
//... редактировния профиля
const openPopupEditProfile = new PopupWithForm(".popup_edit-profile", submitFormEditProfile);
profileEditBtn.addEventListener("click", () => {
    const userInfoNew = userInfo.getUserInfo();
    formInputName.value = userInfoNew.userName;
    formInputAbout.value = userInfoNew.aboutMe;
    formValidatorAuthor.clearSpanError();
    formValidatorAuthor.setButtonState();
    openPopupEditProfile.open();
});
//... добавления новой карточки
const popupWithFormNewCard = new PopupWithForm(".popup_add-element", submitFormAdd);
addNewCardBtn.addEventListener("click", () => {
    formValidatorCard.clearSpanError();
    formValidatorCard.setButtonState();
    popupWithFormNewCard.open();
});
//... увеличенной картинки
const popupWithImage = new PopupWithImage(".popup_zoom");
function handleCardClick(e) {
    popupWithImage.open(e.target);
}

popupWithImage.setEventListeners();
openPopupEditProfile.setEventListeners();
popupWithFormNewCard.setEventListeners();






















