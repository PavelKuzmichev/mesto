import { Card } from './Card.js'
import { FormValidator, ValidationConfig } from './FormValidator.js'
import {initialCards} from './initialCards.js'

const forms = document.querySelectorAll(".popup__form");

const nameInput = document.querySelector(".profile__name");

const jobInput = document.querySelector(".profile__about");

const formInputName = document.querySelector(".popup__input_form_name");

const formInputAbout = document.querySelector(".popup__input_form_about");

const formInputTitle = document.querySelector(".popup__input_form_title");

const formInputLink = document.querySelector(".popup__input_form_link");

const card = new Card;


const formValidator = new FormValidator(ValidationConfig, '.popup__form_area_newcard');
const formValidator1 = new FormValidator(ValidationConfig, '.popup__form_area_editprofile');
formValidator.enableValidation();
formValidator1.enableValidation();


const listContainerElement = document.querySelector(".elements");
initialCards.forEach((item) => {


    const card = new Card(item.name, item.link, item.alt, listContainerElement, zoomingImg);


    listContainerElement.append(card.generateCard());
});






//функции открытия/закрытия попапа.
function openPopup(popup) {
    popup.closest('.popup').classList.add("popup_visible");
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByClick);
};
function closePopup(popup) {
    popup.closest('.popup').classList.remove("popup_visible");
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByClick);
};

//функция попап редактирования профиля. 
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupCloseBtnEditProfile = document.querySelector(".popup__close-btn_edit-profile");



profileEditBtn.addEventListener("click", function () {

    formInputName.value = nameInput.textContent;
    formInputAbout.value = jobInput.textContent;
    formValidator1.setButtonState(editProfileButton, formProfile.checkValidity());
    openPopup(popupEditProfile);
});

popupCloseBtnEditProfile.addEventListener("click", function () {
    closePopup(popupEditProfile);
});
function formSubmitHandler(evt) {
    evt.preventDefault();
};
forms.forEach((formNode) => {
    formNode.addEventListener("submit", formSubmitHandler)
})

//функция попапа добавления новой карточки. 

const addNewCardBtn = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
const createButtonElement = document.querySelector(".popup__submit-btn_add-element");
const editProfileButton = document.querySelector('.popup__submit-btn_edit-profile')
addNewCardBtn.addEventListener("click", () => {

    formInputTitle.value = '';
    formInputLink.value = '';
    formValidator.setButtonState(createButtonElement, formNewCard.checkValidity());
    openPopup(popupAddElement);
});

const popupCloseBtnAddElement = document.querySelector(".popup__close-btn_add-new-element");

popupCloseBtnAddElement.addEventListener("click", function () {
    closePopup(popupAddElement);
});

//функция создания новой карточки с данными от пользователя. 
function addNewItem() {


    const card = new Card(formInputTitle.value, formInputLink.value, formInputTitle.value, listContainerElement, zoomingImg)
    listContainerElement.prepend(card.generateCard())
}


//функция попапа зум картинки. 
function zoomingImg(e) {
    const zoomedImg = document.querySelector(".popup__image-zoom");
    zoomedImg.src = e.target.src;
    zoomedImg.alt = e.target.alt;
    const zoomedTitle = document.querySelector(".popup__title-zoom");
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
    if (e.keyCode === 27 && document.querySelector('.popup_visible')) {
        const popupActive = document.querySelector('.popup_visible');
        closePopup(popupActive);
    }
};

function closeByClick(e) {
    if (e.target.classList.contains('popup_visible')) { closePopup(e.target) }
};
//Сабмиты
const formProfile = document.querySelector('.popup__form_area_editprofile');
const formNewCard = document.querySelector('.popup__form_area_newcard');

formProfile.addEventListener('submit', function () {
    nameInput.textContent = formInputName.value;
    jobInput.textContent = formInputAbout.value;
    closePopup(popupEditProfile);
})

formNewCard.addEventListener('submit', function () {
    addNewItem();
    closePopup(popupAddElement);
});

