import "./pages/index.css"
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { initialCards } from "./scripts/initialCards.js";
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import Section from "./scripts/Section.js";
import {Popup} from "./scripts/Popup.js"
export const listContainerElement = ".elements";

const ValidationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_invalid",
    errorClass: "popup__input_invalid",
    errorSelector: ".popup__error",
    
};
//константы
const forms = document.querySelectorAll(".popup__form");
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__about");
const formInputName = document.querySelector(".popup__input_form_name");
const formInputAbout = document.querySelector(".popup__input_form_about");
const formInputTitle = document.querySelector(".popup__input_form_title");
const formInputLink = document.querySelector(".popup__input_form_link");
//валидация
const formValidatorCard = new FormValidator(ValidationConfig, ".popup__form_area_newcard");
const formValidatorAuthor = new FormValidator(ValidationConfig, ".popup__form_area_editprofile");
formValidatorCard.enableValidation();
formValidatorAuthor.enableValidation();
//функция создания стоковых карточек.
const cardsList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, clickImage);
        const cardElement = card.generateCard();
        cardsList.setItem(cardElement);
    }}
  ,
  listContainerElement)
;

cardsList.renderItems(); 

//функция создания новой карточки с данными от пользователя.
function submitFormAdd ()  {
    const  profileForm = [
        {
            name:  formInputTitle.value,
            link: formInputLink.value
        }];
    const userCard = new Section({
        data: profileForm,
        renderer: (item) => {
              const card = new Card(item.name, item.link, clickImage);
            const userCardElement = card.generateCard();
            userCard.setItem(userCardElement);
        }}
      ,
      listContainerElement)
      userCard.renderItems();
      popupWithFormNewCard.close();
}
//функции открытия/закрытия попапа.
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const addNewCardBtn = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
const createButtonElement = document.querySelector(".popup__submit-btn_add-element");
const editProfileButton = document.querySelector(".popup__submit-btn_edit-profile");
const formNewCard = document.querySelector(".popup__form_area_newcard");
const openPopupEditProfile = new PopupWithForm (popupEditProfile, submitFormEditProfile);
profileEditBtn.addEventListener("click",  () => {
    formInputName.value = nameInput.textContent;
    formInputAbout.value = jobInput.textContent;
    formValidatorAuthor.clearSpanError();
    formValidatorAuthor.setButtonState();
    openPopupEditProfile.open();
    
});
const popupWithFormNewCard = new PopupWithForm(popupAddElement, submitFormAdd) 
addNewCardBtn.addEventListener("click", () => {
    //formNewCard.reset();
    formValidatorCard.clearSpanError();
    formValidatorCard.setButtonState();
    
    popupWithFormNewCard.open();
});
//функция попап редактирования профиля.





function formSubmitHandler(evt) {
    evt.preventDefault();
}
forms.forEach((form) => {
    form.addEventListener("submit", formSubmitHandler);
});
//функция попапа добавления новой карточки.



//функция попапа зум картинки.
const popupZoomImage = document.querySelector(".popup_zoom");
const zoomedImg = document.querySelector(".popup__image-zoom");
const zoomedTitle = document.querySelector(".popup__title-zoom");


function clickImage() { 
    const popupWithImage = new PopupWithImage (popupZoomImage, formInputName.value)
      const xx = document.querySelector('.popup__window-zoom');
    popupWithImage.open(xx); 
} 

const closeBtnZoomImg = document.querySelector(".popup__close-btn_zoom-image");

closeBtnZoomImg.addEventListener("click", function () {
    closePopup(popupZoomImage);
});

//Сабмиты

const formProfile = document.querySelector(".popup__form_area_editprofile");
function submitFormEditProfile() {
    nameInput.textContent = formInputName.value;
    jobInput.textContent = formInputAbout.value;
    openPopupEditProfile.close();
}


openPopupEditProfile.setEventListeners();
popupWithFormNewCard.setEventListeners()

