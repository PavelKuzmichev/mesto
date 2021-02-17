import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmDelete from "../components/PopupWithConfirmDelete.js"
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {Api} from "../components/api.js"
const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-btn",
    inactiveButtonClass: "popup__submit-btn_invalid",
    errorClass: "popup__input_invalid",
    errorSelector: ".popup__error",
};
let userId = null
let templateCard = null
const like = new Api(
    {
        url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards/likes/',
        headers: {
            authorization: '4b4ac9ed-5313-4881-afac-1a610d770d12',
            'Content-Type': 'application/json'
        }
    }
)
const disLike = new Api(
    {
        url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards/likes/',
        headers: {
            authorization: '4b4ac9ed-5313-4881-afac-1a610d770d12',
            'Content-Type': 'application/json'
        }
    }
)


const cardsList = new Section(
    {

        renderer: (item) => {
            cardsList.addItem(createCard(item));
        },
    },
    ".elements"
);

//API
const api = new Api(
    {
        url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards/',
        headers: {
            authorization: '4b4ac9ed-5313-4881-afac-1a610d770d12',
            'Content-Type': 'application/json'
        }
    }
)
api
    .addAllCards()
    .then((res) => {

        cardsList.renderItems(res)

    })
    

//константы

const nameInput = document.querySelector(".profile__name");
const jobInput = document.querySelector(".profile__about");
const formInputName = document.querySelector(".popup__input_form_name");
const formInputAbout = document.querySelector(".popup__input_form_about");
const formInputAvatar = document.querySelector(".popup__input_form_avatar")

//валидация
const formValidatorCard = new FormValidator(validationConfig, ".popup__form_area_newcard");
const formValidatorAuthor = new FormValidator(validationConfig, ".popup__form_area_editprofile");
const formValidatorAvatar = new FormValidator(validationConfig, ".popup__form_area_avatar")
formValidatorCard.enableValidation();
formValidatorAuthor.enableValidation();
formValidatorAvatar.enableValidation();
//рендер стоковых карточек


const userInfo1 = new Api(
    {
        url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me',
        headers: {
            authorization: '4b4ac9ed-5313-4881-afac-1a610d770d12',
            'Content-Type': 'application/json'
        }
    }
)

const editAvatar = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me/avatar',
    headers: {
        authorization: '4b4ac9ed-5313-4881-afac-1a610d770d12',
        'Content-Type': 'application/json'
    }
}

)
const avatarIcon = document.querySelector('.profile__avatar');
const userInfo = new UserInfo({
    name: nameInput,
    job: jobInput,

})

userInfo1.addProfileInfo()
    .then(res => {
        nameInput.textContent = res.name,
            jobInput.textContent = res.about
        avatarIcon.src = res.avatar
        return userId = res._id
    })
//начальное заполнение формы редактирования профиля


const createCard = (item) => {
    const card = new Card(item, handleCardClick, ".template", api, userId, like, disLike, popupDeleteCard,{
                handleDeleteCardClick: () => {
                    templateCard = card;
                    popupDeleteCard.open(item);
                    console.log(item)
        } });
    
    const cardElement = card.generateCard();
    
    return cardElement;
}

//Функция сабмита редактирования профиля
function submitFormEditProfile(formObject) {
    renderLoading(true, loadingBtnSubmitProfile);
    userInfo1.editProfileInfo(formObject)
        .then(res => {
            userInfo.setUserInfo({
                newUser: res.name,
                newJob: res.about
            })
        })
        .finally(() => { renderLoading(false, loadingBtnSubmitProfile); });

    setTimeout(() => openPopupEditProfile.close(), 1500);

}
//функция сабмита добавления новой карточки
function submitFormAdd(item) {
    renderLoading(true, loadingBtnSubmitNewCard);
    api
        .addCard(item)
        .then(res => {
            cardsList.addItem(createCard(res))

        })
        .finally(() => { renderLoading(false, loadingBtnSubmitNewCard); });
    setTimeout(() => popupWithFormNewCard.close(), 1500);

}

function submitFormEditAvatar(data) {
    renderLoading(true, loadingBtnSubmitAvatar);
    editAvatar.editAvatarIcon(data)
        .then(res => {
            avatarIcon.src = res.avatar

        }).finally(() => { renderLoading(false, loadingBtnSubmitAvatar); })


    //avatarIcon.src = formInputAvatar.value;
    setTimeout(() => openPopupEditAvatar.close(), 1500);

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
//...редактирования аватара
const editAvatarBtn = document.querySelector('.profile__avatar-edit')
const openPopupEditAvatar = new PopupWithForm('.popup__avatar', submitFormEditAvatar);
editAvatarBtn.addEventListener('click', () => {
    formValidatorAvatar.clearSpanError();
    formValidatorAvatar.setButtonState();
    openPopupEditAvatar.open();
}
)

const popupDeleteCard = new PopupWithConfirmDelete('.popup_delete-confirm', (data) => {
    console.log(data)
      api.removeCard(data._id)
        .then((data) => {
            console.log(data)
            console.log(templateCard._id)
          templateCard.removeItem();
        })
        .then(() => {
          tempCard = null;
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  )
//...удаления карточки
/*function submitFormDeleteCard(item) {
    //templateCard.removeItem
    console.log(item)
    popupDeleteCard.close()
}*/






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




const loadingBtnSubmitProfile = document.querySelector('.popup__submit-btn_edit-profile');
const loadingBtnSubmitNewCard = document.querySelector('.popup__submit-btn_add-element')
const loadingBtnSubmitAvatar = document.querySelector('.popup__submit-btn_avatar')
function renderLoading(isLoading, btn) {
    if (isLoading) {
        btn.textContent = 'Сохранение'
    }
    else {
        btn.textContent = 'Сохранить'


    }
}
popupDeleteCard.setEventListeners();
openPopupEditAvatar.setEventListeners();
popupWithImage.setEventListeners();
openPopupEditProfile.setEventListeners();
popupWithFormNewCard.setEventListeners();






















