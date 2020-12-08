let formElement = document.querySelectorAll(".popup__form");

let nameInput = document.querySelector(".profile__name");

let jobInput = document.querySelector(".profile__about");

let formInput1 = document.querySelector(".popup__input_form_name");

let formInput2 = document.querySelector(".popup__input_form_about");
let formInput3 = document.querySelector(".popup__input_form_title");

let formInput4 = document.querySelector(".popup__input_form_link");
formInput1.value = nameInput.textContent;
formInput2.value = jobInput.textContent;

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.textContent = formInput1.value;
    jobInput.textContent = formInput2.value;
}

let profileEditBtn = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup__edit-profile");
let popupCloseBtn = document.querySelector(".popup__close-btn_edit-profile");
let formBtn = document.querySelector(".popup__submit-btn_edit-profile");

profileEditBtn.addEventListener("click", togglePopupVisibility);

popupCloseBtn.addEventListener("click", togglePopupVisibility);

formBtn.addEventListener("click", togglePopupVisibility);

function togglePopupVisibility() {
    popup.classList.toggle("popup_visible");
}

function formResetHandlerCloseBtn(evt) {
    evt.preventDefault();
    formInput1.value = nameInput.textContent;
    formInput2.value = jobInput.textContent;
}

popupCloseBtn.addEventListener("click", formResetHandlerCloseBtn);
formElement.forEach((formNode) => {
    formNode.addEventListener("submit", formSubmitHandler);
});

//функция открытия и закрытия попапа добавления новой карточки.
const addNewCardBtn = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup__add-element");
addNewCardBtn.addEventListener("click", togglePopupVisibility2);
const popupCloseBtnAddElement = document.querySelector(".popup__close-btn_add-new-element");
popupCloseBtnAddElement.addEventListener("click", togglePopupVisibility2);
popupCloseBtnAddElement.addEventListener("click", function () {
    formInput3.value = "Название";
    formInput4.value = "Ссылка на картинку";
});

function togglePopupVisibility2() {
    popupAddElement.classList.toggle("popup_visible");
}

//функция создания новой карточки с данными от пользователя.
function createNewItem() {
    const createButtonElement = document.querySelector(".popup__submit-btn_add-element");
    createButtonElement.addEventListener("click", togglePopupVisibility2);
    createButtonElement.addEventListener("click", addNewItem);
}

function addNewItem() {
    const titleElement = formInput3.value;
    const linkElement = formInput4.value;
    const newItem = composeItem({ name: titleElement, link: linkElement });
    listContainerElement.prepend(newItem);
}

//функция добавления стартовых картинок.
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
        alt: "Архыз",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
        alt: "Челябинская область",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
        alt: "Иваново",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        alt: "Камчатка",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
        alt: "Холмогорский район",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
        alt: "Байкал",
    },
];

const listContainerElement = document.querySelector(".elements");
const templateElement = document.querySelector(".template");

function renderList() {
    const listItems = initialCards.map(composeItem);
    listContainerElement.append(...listItems);
}
function composeItem({ name, link, alt }) {
    const newItem = templateElement.content.cloneNode(true);
    likeaddRemoveListenersToItem(newItem);
    zoom(newItem);
    const headerElement = newItem.querySelector(".element__title");
    headerElement.textContent = name;
    const linkElement = newItem.querySelector(".element__image");
    linkElement.src = link;
    linkElement.alt = headerElement.textContent;
    return newItem;
}

function likeaddRemoveListenersToItem(item) {
    const removeButton = item.querySelector(".element__remove");
    removeButton.addEventListener("click", removeItem);
    const likeButton = item.querySelector(".element__like");
    likeButton.addEventListener("click", likeItem);
}
function likeItem(event) {
    event.target.classList.toggle("element__like_active");
}
function removeItem(event) {
    const targetItem = event.target.closest(".element");
    targetItem.remove();
}
//функция открытия и закрытия попапа зум картинки.

function zoom(item) {
    const zoomImg = item.querySelector(".element__image");
    zoomImg.addEventListener("click", togglePopupVisibility3);
    zoomImg.addEventListener("click", zoomingImg);
    }
const closeBtnZoomImg = document.querySelector(".popup__close-btn_zoom-image");
closeBtnZoomImg.addEventListener("click", togglePopupVisibility3);
const popupZoomImage = document.querySelector(".popup__zoom");
function zoomingImg(e) {
    const zoomedImg = document.querySelector(".popup__image-zoom");
    zoomedImg.src = e.target.src;
    const zoomedTitle = document.querySelector(".popup__title-zoom");
    zoomedTitle.textContent = e.target.alt;
}
function togglePopupVisibility3() {
    popupZoomImage.classList.toggle("popup_visible");
}

createNewItem();
renderList();
