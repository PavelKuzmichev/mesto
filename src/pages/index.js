import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmDelete from "../components/PopupWithConfirmDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/api.js";
//конфиг валидации
const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_invalid",
    errorClass: "popup__input_invalid",
    errorSelector: ".popup__error",
};
//переменные
let userId = null;
let templateCard = null;
//классы API.....
//...обработка лайка/дизлайка
const like = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/cards/likes/",
    headers: {
        authorization: "4b4ac9ed-5313-4881-afac-1a610d770d12",
        "Content-Type": "application/json",
    },
});
//API...
const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/cards/",
    headers: {
        authorization: "4b4ac9ed-5313-4881-afac-1a610d770d12",
        "Content-Type": "application/json",
    },
});
//...добавления всех карточек
api.addAllCards().then((res) => {
    cardsList.renderItems(res);
});

//константы

const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__about");
const formInputName = document.querySelector(".popup__input_form_name");
const formInputAbout = document.querySelector(".popup__input_form_about");

//валидация
const formValidatorCard = new FormValidator(validationConfig, ".popup__form_area_newcard");
const formValidatorAuthor = new FormValidator(validationConfig, ".popup__form_area_editprofile");
const formValidatorAvatar = new FormValidator(validationConfig, ".popup__form_area_avatar");
formValidatorCard.enableValidation();
formValidatorAuthor.enableValidation();
formValidatorAvatar.enableValidation();

//Api отправка данных редактирования пользователя
const userInfoApi = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/users/me",
    headers: {
        authorization: "4b4ac9ed-5313-4881-afac-1a610d770d12",
        "Content-Type": "application/json",
    },
});
//APi отправка данных редактирования автара
const editAvatar = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-20/users/me/avatar",
    headers: {
        authorization: "4b4ac9ed-5313-4881-afac-1a610d770d12",
        "Content-Type": "application/json",
    },
});
//userInfo
const userInfo = new UserInfo({
    name: nameInput,
    job: jobInput,
});
//функция редактирования аватара
const avatarIcon = document.querySelector(".profile__avatar");
userInfoApi.addProfileInfo().then((res) => {
    (nameInput.textContent = res.name), (jobInput.textContent = res.about);
    avatarIcon.src = res.avatar;
    return (userId = res._id);
});
//начальное заполнение формы редактирования профиля
const createCard = (item) => {
    const card = new Card(item, handleCardClick, ".template", api, userId, like, popupDeleteCard, {
        handleDeleteCardClick: () => {
            templateCard = card;
            popupDeleteCard.open(item);
        },
    });

    const cardElement = card.generateCard();

    return cardElement;
};
const cardsList = new Section(
    {
        renderer: (item) => {
            cardsList.addItem(createCard(item));
        },
    },
    ".elements"
);
//Функция сабмита редактирования профиля
function submitFormEditProfile(formObject) {
    renderLoading(true, loadingBtnSubmitProfile);
    userInfoApi
        .editProfileInfo(formObject)
        .then((res) => {
            userInfo.setUserInfo({
                newUser: res.name,
                newJob: res.about,
            });
        })
        .finally(() => {
            renderLoading(false, loadingBtnSubmitProfile);
        });

    setTimeout(() => openPopupEditProfile.close(), 1500);
}
//функция сабмита добавления новой карточки
function submitFormAdd(item) {
    renderLoading(true, loadingBtnSubmitNewCard);
    api.addCard(item)
        .then((res) => {
            cardsList.addItem(createCard(res));
        })
        .finally(() => {
            renderLoading(false, loadingBtnSubmitNewCard);
        });
    setTimeout(() => popupWithFormNewCard.close(), 1500);
}
//функция сабмита редактирования аватара
function submitFormEditAvatar(data) {
    renderLoading(true, loadingBtnSubmitAvatar);
    editAvatar
        .editAvatarIcon(data)
        .then((res) => {
            avatarIcon.src = res.avatar;
        })
        .finally(() => {
            renderLoading(false, loadingBtnSubmitAvatar);
        });
    setTimeout(() => openPopupEditAvatar.close(), 1500);
}
//функции открытия для попапа...
const profileEditBtn = document.querySelector(".profile__edit-button");
const addNewCardBtn = document.querySelector(".profile__add-button");
const editAvatarBtn = document.querySelector(".profile__edit-avatar");
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
//...редактирования аватара
const openPopupEditAvatar = new PopupWithForm(".popup__avatar", submitFormEditAvatar);
editAvatarBtn.addEventListener("click", () => {
    formValidatorAvatar.clearSpanError();
    formValidatorAvatar.setButtonState();
    openPopupEditAvatar.open();
});
//...согласие на удаление карточки
const popupDeleteCard = new PopupWithConfirmDelete(".popup_delete-confirm", (data) => {
    api.removeCard(data._id)
        .then(() => {
            templateCard.removeItem();
        })
        .then(() => {
            popupDeleteCard.close();
        })
        .catch((err) => {
            console.log(err);
        });
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
//обработка индикации загрузки
const loadingBtnSubmitProfile = document.querySelector(".popup__submit-btn_edit-profile");
const loadingBtnSubmitNewCard = document.querySelector(".popup__submit-btn_add-element");
const loadingBtnSubmitAvatar = document.querySelector(".popup__submit-btn_avatar");
function renderLoading(isLoading, btn) {
    if (isLoading) {
        btn.textContent = "Сохранение";
    } else {
        btn.textContent = "Сохранить";
    }
}
//setEventListeners
popupDeleteCard.setEventListeners();
openPopupEditAvatar.setEventListeners();
popupWithImage.setEventListeners();
openPopupEditProfile.setEventListeners();
popupWithFormNewCard.setEventListeners();






















