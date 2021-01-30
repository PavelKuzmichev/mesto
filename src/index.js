import "./pages/index.css"
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { initialCards } from "./scripts/initialCards.js";
import Section from "./scripts/Section.js";
//import {Popup} from "./scripts/Popup.js"
export const listContainerElement = ".elements";

const ValidationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_invalid",
    errorClass: "popup__input_invalid",
    errorSelector: ".popup__error",
    
};

const forms = document.querySelectorAll(".popup__form");
const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__about");
const formInputName = document.querySelector(".popup__input_form_name");
const formInputAbout = document.querySelector(".popup__input_form_about");
const formInputTitle = document.querySelector(".popup__input_form_title");
const formInputLink = document.querySelector(".popup__input_form_link");
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
function addNewItem(title, link) {
    const card = new Card(title, link, clickImage);
    return card.generateCard();
}
//функции открытия/закрытия попапа.
/*function openPopup(popup) {
    popup.classList.add("popup_visible");
    document.addEventListener("keydown", closeByEsc);
    document.addEventListener("click", closeByClick);
}*/
function openPopup(popup) {
    popup.classList.add("popup_visible");
    document.addEventListener("keydown", closeByEsc);
    document.addEventListener("click", closeByClick);
}
function closePopup(popup) {
    popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", closeByEsc);
    document.removeEventListener("click", closeByClick);
}
//const openPopup11 = new Popup ();
//функция попап редактирования профиля.
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupCloseBtnEditProfile = document.querySelector(".popup__close-btn_edit-profile");
profileEditBtn.addEventListener("click", function () {
    formInputName.value = nameInput.textContent;
    formInputAbout.value = jobInput.textContent;
    formValidatorAuthor.clearSpanError();
    formValidatorAuthor.setButtonState();
    openPopup(popupEditProfile);
});
popupCloseBtnEditProfile.addEventListener("click", function () {
    closePopup(popupEditProfile);
});
function formSubmitHandler(evt) {
    evt.preventDefault();
}
forms.forEach((form) => {
    form.addEventListener("submit", formSubmitHandler);
});
//функция попапа добавления новой карточки.
const addNewCardBtn = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
const createButtonElement = document.querySelector(".popup__submit-btn_add-element");
const editProfileButton = document.querySelector(".popup__submit-btn_edit-profile");
addNewCardBtn.addEventListener("click", () => {
    formNewCard.reset();
    formValidatorCard.clearSpanError();
    formValidatorCard.setButtonState();
    openPopup(popupAddElement);
});
const popupCloseBtnAddElement = document.querySelector(".popup__close-btn_add-new-element");
popupCloseBtnAddElement.addEventListener("click", function () {
    closePopup(popupAddElement);
});
//функция попапа зум картинки.
const zoomedImg = document.querySelector(".popup__image-zoom");
const zoomedTitle = document.querySelector(".popup__title-zoom");
function clickImage(e) {
    zoomedImg.src = e.target.src;
    zoomedImg.alt = e.target.alt;
    zoomedTitle.textContent = e.target.alt;
    openPopup(popupZoomImage);
}
const closeBtnZoomImg = document.querySelector(".popup__close-btn_zoom-image");
const popupZoomImage = document.querySelector(".popup_zoom");
closeBtnZoomImg.addEventListener("click", function () {
    closePopup(popupZoomImage);
});
//Функции закрытия попап по ESC и по клику вне окна.
function closeByEsc(e) {
    if (e.key === "Escape" && document.querySelector(".popup_visible")) {
        const popupActive = document.querySelector(".popup_visible");
        closePopup(popupActive);
    }
}
function closeByClick(e) {
    if (e.target.classList.contains("popup_visible")) {
        closePopup(e.target);
    }
}
//Сабмиты
const formProfile = document.querySelector(".popup__form_area_editprofile");
const formNewCard = document.querySelector(".popup__form_area_newcard");
formProfile.addEventListener("submit", function () {
    nameInput.textContent = formInputName.value;
    jobInput.textContent = formInputAbout.value;
    closePopup(popupEditProfile);
});
formNewCard.addEventListener("submit",  () => {
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
    closePopup(popupAddElement);
});
