import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../components/initialCards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const validationConfig = {
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
const formValidatorCard = new FormValidator(validationConfig, ".popup__form_area_newcard");
const formValidatorAuthor = new FormValidator(validationConfig, ".popup__form_area_editprofile");
formValidatorCard.enableValidation();
formValidatorAuthor.enableValidation();
//рендер стоковых карточек
function createCard(item) {
    const card = new Card(item, handleCardClick, ".template");
    const cardElement = card.generateCard();
    return cardElement;
}
const cardsList = new Section(
    {
        data: initialCards,
        renderer: (item) => {
            cardsList.addItem(createCard(item));
        },
    },
    ".elements"
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
    cardsList.addItem(createCard(item));
    popupWithFormNewCard.close();
}

//функции открытия для попапа...
const profileEditBtn = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const addNewCardBtn = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
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
const popupZoomImage = document.querySelector(".popup_zoom");
const popupWithImage = new PopupWithImage(".popup_zoom");
function handleCardClick(e) {
    popupWithImage.open(e.target);
}

popupWithImage.setEventListeners();
openPopupEditProfile.setEventListeners();
popupWithFormNewCard.setEventListeners();






















