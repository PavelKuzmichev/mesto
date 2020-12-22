const forms = document.querySelectorAll(".popup__form");

const nameInput = document.querySelector(".profile__name");

const jobInput = document.querySelector(".profile__about");

const formInputName = document.querySelector(".popup__input_form_name");

const formInputAbout = document.querySelector(".popup__input_form_about");

const formInputTitle = document.querySelector(".popup__input_form_title");

const formInputLink = document.querySelector(".popup__input_form_link");



function formSubmitHandler(evt) {
    evt.preventDefault();


};


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
const formBtnEditProfile = document.querySelector(".popup__submit-btn_edit-profile");


profileEditBtn.addEventListener("click", function () {
    openPopup(popupEditProfile);
    formInputName.value = nameInput.textContent;
    formInputAbout.value = jobInput.textContent;
});

popupCloseBtnEditProfile.addEventListener("click", function () {
    closePopup(popupEditProfile);
});

forms.forEach((formNode) => {
    formNode.addEventListener("submit", formSubmitHandler)
})




//функция попапа добавления новой карточки. 

const addNewCardBtn = document.querySelector(".profile__add-button");
const popupAddElement = document.querySelector(".popup_add-element");
addNewCardBtn.addEventListener("click", function () {
    openPopup(popupAddElement);
    formInputTitle.value = '';
    formInputLink.value = '';
    enableValidation(ValidationConfig);


});
const popupCloseBtnAddElement = document.querySelector(".popup__close-btn_add-new-element");

popupCloseBtnAddElement.addEventListener("click", function () {
    closePopup(popupAddElement);
});




//функция создания новой карточки с данными от пользователя. 

const createButtonElement = document.querySelector(".popup__submit-btn_add-element");



function addNewItem() {

    const titleElement = formInputTitle.value;
    const linkElement = formInputLink.value;
    const newItem = composeItem({ name: titleElement, link: linkElement });
    listContainerElement.prepend(newItem);
}



const listContainerElement = document.querySelector(".elements");
const templateElement = document.querySelector(".template");

function renderList() {
    const listItems = initialCards.map(composeItem);
    listContainerElement.append(...listItems);
}
function composeItem({ name, link }) {
    const newItem = templateElement.content.cloneNode(true);
    setListenersToItem(newItem);
    const headerElement = newItem.querySelector(".element__title");
    headerElement.textContent = name;
    const linkElement = newItem.querySelector(".element__image");
    linkElement.src = link;
    linkElement.alt = headerElement.textContent;
    return newItem;
}


function setListenersToItem(item) {
    const removeButton = item.querySelector(".element__remove");
    removeButton.addEventListener("click", removeItem);
    const likeButton = item.querySelector(".element__like");
    likeButton.addEventListener("click", likeItem);
    const zoomImg = item.querySelector(".element__image");
    zoomImg.addEventListener("click", function () {
        openPopup(popupZoomImage);
    });
    zoomImg.addEventListener("click", zoomingImg);
}
function likeItem(event) {
    event.target.classList.toggle("element__like_active");
}
function removeItem(event) {
    const targetItem = event.target.closest(".element");
    targetItem.remove();
}
//функция попапа зум картинки. 


const closeBtnZoomImg = document.querySelector(".popup__close-btn_zoom-image");
closeBtnZoomImg.addEventListener("click", function () {
    closePopup(popupZoomImage);
});
const popupZoomImage = document.querySelector(".popup_zoom");
function zoomingImg(e) {
    const zoomedImg = document.querySelector(".popup__image-zoom");
    zoomedImg.src = e.target.src;
    zoomedImg.alt = e.target.alt;
    const zoomedTitle = document.querySelector(".popup__title-zoom");
    zoomedTitle.textContent = e.target.alt;
}
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

renderList(); 