import "./pages/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import { initialCards } from "./scripts/initialCards.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import Section from "./scripts/Section.js";
export const listContainerElement = ".elements";
import UserInfo from "./scripts/UserInfo.js";

const ValidationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_invalid",
    errorClass: "popup__input_invalid",
    errorSelector: ".popup__error",
};
//константы

const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__about");
const formInputName = document.querySelector(".popup__input_form_name");
const formInputAbout = document.querySelector(".popup__input_form_about");

//валидация
const formValidatorCard = new FormValidator(ValidationConfig, ".popup__form_area_newcard");
const formValidatorAuthor = new FormValidator(ValidationConfig, ".popup__form_area_editprofile");
formValidatorCard.enableValidation();
formValidatorAuthor.enableValidation();
//рендер стоковых карточек
const cardsList = new Section(
    {
        data: initialCards,
        renderer: (item) => {
            const card = new Card(item, handleCardClick);
            const cardElement = card.generateCard();
            cardsList.addItem(cardElement);
        },
    },
    listContainerElement
);
cardsList.renderItems();

//начальное заполнение формы редактирования профиля
const userInfo = new UserInfo({
    name: nameInput,
    job: jobInput,
});

//Функция сабмита редактирования профиля
function submitFormEditProfile(formObject) {
    userInfo.setUserInfo({
        newUser: formObject.name,
        newJob: formObject.about,
    });
    openPopupEditProfile.close();
}
//функция сабмита добавления новой карточки
function submitFormAdd(item) {
    const card = new Card(item, handleCardClick);
    const userCardElement = card.generateCard();
    cardsList.addItem(userCardElement);
    popupWithFormNewCard.close();
}

//функции открытия для попапа...
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const addNewCardBtn = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
//... редактировния профиля
const openPopupEditProfile = new PopupWithForm(popupEditProfile, submitFormEditProfile);
profileEditBtn.addEventListener("click", () => {
    const userInfoNew = userInfo.getUserInfo();
    formInputName.value = userInfoNew.userName;
    formInputAbout.value = userInfoNew.aboutMe;
    formValidatorAuthor.clearSpanError();
    formValidatorAuthor.setButtonState();
    openPopupEditProfile.open();
});
//... добавления новой карточки
const popupWithFormNewCard = new PopupWithForm(popupAddElement, submitFormAdd);
addNewCardBtn.addEventListener("click", () => {
    formValidatorCard.clearSpanError();
    formValidatorCard.setButtonState();
    popupWithFormNewCard.open();
});
//... увеличенной картинки
const popupZoomImage = document.querySelector(".popup_zoom");
const popupWithImage = new PopupWithImage(popupZoomImage);
function handleCardClick(e) {
    popupWithImage.open(e.target);
}
//слушатель закрытия попа зум-картинки
const closeBtnZoomImg = document.querySelector(".popup__close-btn_zoom-image");
closeBtnZoomImg.addEventListener("click", function () {
    popupWithImage.close();
});

popupWithImage.setEventListeners();
openPopupEditProfile.setEventListeners();
popupWithFormNewCard.setEventListeners();





















